import { getValidSubdomain, query } from "lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { token } = await req.json();
		const hostname = req.headers.get('host');
		const subdomain = getValidSubdomain(hostname) === 'dev1' ? 'test' : getValidSubdomain(hostname);

		// check if token exists

		const tokenQueryString = "SELECT * FROM password_recovery WHERE id = ?";
		const tokenResult = (await query('ceodash_' + subdomain, tokenQueryString, [token])) as Array<{
			id: string;
			user_id: number;
			expiration_date: Date;
		}>;

		console.log(tokenResult)

		const tokenRow = tokenResult[0];
		if (!tokenRow) {
			console.log('invalid');
			return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		if (tokenRow.expiration_date < new Date()) {
			return new NextResponse(JSON.stringify({ message: "Token expired" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		return new NextResponse(JSON.stringify(tokenResult[0]), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.log(err);
		return new NextResponse(JSON.stringify({ message: "An error occured" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
