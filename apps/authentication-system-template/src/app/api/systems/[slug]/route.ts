import { query } from "lib";
import { NextRequest, NextResponse } from "next/server";
import { SystemType } from "types";

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } }
) {
	try {
		const queryString = `SELECT * FROM systems WHERE slug = ?`;

		const result = (await query("ceo_control_panel", queryString, [
			params.slug,
		])) as Array<SystemType>;

		return new NextResponse(JSON.stringify(result[0]), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error: any) {
		console.log(error.message);
		return new NextResponse(JSON.stringify({ message: error.message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
