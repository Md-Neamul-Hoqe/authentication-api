import { tokenName } from "@/app/utils/constansts";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const response = NextResponse.json({ message: 'Log Out Successfully.' }, { status: 200 })

        /* Logout [direct NextResponse doesn't work] */
        response.cookies.delete(tokenName)

        /* Redirect to sign-in page after logout [response doesn't work] */
        NextResponse.redirect(new URL(`/signin`, req.nextUrl))

        return response
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}