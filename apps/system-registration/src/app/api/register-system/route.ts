import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { firstname, lastname, email, password, repeat_password } =
			await req.json();
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ message: error.message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
