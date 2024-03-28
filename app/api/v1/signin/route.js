import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { client, connectDB } from "../../dbConn";
import JWT from 'jsonwebtoken';
import { tokenName } from "@/app/utils/constants";

connectDB();

if (!process.env.DB_NAME) {
    throw new Error('Invalid/missing environment variable: "DB_NAME"')
}

const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection('users');

export async function POST(req) {
    try {
        const data = await req.json();
        const { email, password } = data;

        /* Find user info from database */
        const isExist = await usersCollection.findOne({ email })
        const user = { ...isExist }
        console.log(user);
        /* Check the email exist or not */
        if (!isExist) {
            NextResponse.json({ message: 'No such account found. Please sign up first.' }, { status: 401 })
            return NextResponse.redirect(new URL('/signup', req.nextUrl))
        }

        /* Check the password is coincide with the database */
        const isPassSame = await bcrypt.compare(password, user?.password)

        /* Check the passwords are coincide or not */
        if (!isPassSame) {
            return NextResponse.json({ message: 'User email or password is wrong. Give a correct one.' }, { status: 401 })
        }

        /* Set encrypted data to the token */
        const tokenData = {
            email,
            name: user?.name,
            role: user?.role
        }

        /* Create token [The request must be from client side (server side not worked)] */
        const token = JWT.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

        const response = NextResponse.json({ message: `Welcome back ${user?.name}` }, { status: 200 });

        response.cookies.set(tokenName, token, {
            httpOnly: true
        })

        return response
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    } finally {
        await client.close()
    }
}