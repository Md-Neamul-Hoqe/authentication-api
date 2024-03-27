import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { client, connectDB } from "../../dbConn";
import JWT from 'jsonwebtoken';
import { redirect } from "next/navigation";
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
        const { email, name, password } = data;

        // console.log(hashedPassword);
        const isExist = await usersCollection.findOne({ email })

        /* Encrypt password */
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRound)

        /* Set guest as a default role */
        const user = { email, name, password: hashedPassword, role: 'guest' }

        /* Check user exists or not */
        if (!isExist) {
            /* Save user info to database */
            try {
                const res = await usersCollection.insertOne(user)
                console.log(res);
            } catch (error) {
                return NextResponse.json({ error: error.message }, { status: 500 })
            }
        } else {
            /* TODO: Update status code as duplicate indication */
            NextResponse.json({ message: `User email: '${user?.email}' already exists. Try to sign in.` }, { status: 200 });

            /* Return to sign in page to login the user */
            return NextResponse.redirect(new URL('/signin', req.nextUrl))
        }

        const tokenData = {
            email,
            name,
            role: 'guest'
        }

        /* Create token [Must be from client side (server side not worked)] */
        const token = JWT.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

        const response = NextResponse.json({ message: 'New Account Created Successfully.' }, { status: 200 });

        response.cookies.set(tokenName, token, {
            httpOnly: true
        })

        return response
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}