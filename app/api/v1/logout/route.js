import { NextResponse } from "next/server";
import { client, connectDB } from "../../dbConn";
import { redirect } from "next/navigation";

connectDB();

if (!process.env.DB_NAME) {
    throw new Error('Invalid/missing environment variable: "DB_NAME"')
}

const db = client.db(process.env.DB_NAME);

export async function POST(req) {
    try {
        const response = NextResponse.json({ message: 'Log Out Successfully.' })

        /* Logout */
        return response.cookies.delete('token')
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}