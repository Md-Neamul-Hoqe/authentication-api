import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { client, connectDB } from "../../dbConn";
import JWT from 'jsonwebtoken';
import { redirect } from "next/navigation";

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

        /* Encrypt password */
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRound)

        /* Save user info to database */
        // console.log(hashedPassword);
        // const isExist = await    usersCollection.findOne({ email })
        const user = { email, name, password: hashedPassword }

        const tokenData = {
            email,
            name
        }

        // console.log(isExist, Object.keys(isExist).length);
        tokenData.role = 'guest'
        // if (!isExist) {
        //     user.role = 'guest'
        //     tokenData.role = 'guest'
        //     try {
        //         const res = await usersCollection.insertOne(user)
        //         console.log(res);
        //     } catch (error) {
        //         return NextResponse.json({ error: error.message }, { status: 500 })
        //     }
        // } else {
        //     tokenData.role = isExist?.role
        // }

        /* Create token [Must be from client side (server side not worked)] */
        const token = JWT.sign(tokenData, 'secret', { expiresIn: '1h' })

        const response = NextResponse.json({ message: 'Sign in successful.', user }, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true
        })

        // response.redirected = true; response.url = '/';

        console.log(response);

        return response
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}