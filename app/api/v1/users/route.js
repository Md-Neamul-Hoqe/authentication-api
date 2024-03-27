import { client, connectDB } from "../../dbConn";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { tokenName } from "@/app/utils/constants";
import { verify } from "jsonwebtoken";

connectDB();

if (!process.env.DB_NAME) {
    throw new Error('Invalid/missing environment variable: "DB_NAME"')
}

const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection('users');

/* Get all users */
export async function GET(req) {
    try {
        const users = await usersCollection.find({}).toArray()

        return NextResponse.json({ data: users }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(req) {
    try {
        const updateRequestedUser = await req.json();
        const { name, phone, email, _id: id } = updateRequestedUser

        const newUser = {
            $set: {
                name,
                phone,
                email,
            }
        }

        /* Authorization: get the current user's token as object {name, value} */
        const token = req.cookies.get(tokenName)

        if (token[ 'name' ] !== tokenName) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, { status: 401 })
        }

        const { role } = verify(token[ 'value' ], process.env.ACCESS_TOKEN_SECRET)

        if (role === 'admin') {
            const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, newUser, { upsert: true })

            if (result?.acknowledged && result?.modifiedCount > 0)
                return NextResponse.json({ data: result }, { status: 200 })
            return NextResponse.json({ data: 'User modification unsuccessful.' }, { status: 200 });
        } else {
            return NextResponse.json({
                message: 'Forbidden Access'
            }, { status: 403 })
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const id = req.url.split('?')[ 1 ]

        const token = req.cookies.get(tokenName)

        if (token[ 'name' ] !== tokenName) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, { status: 401 })
        }

        const { role } = verify(token[ 'value' ], process.env.ACCESS_TOKEN_SECRET)

        if (role === 'admin') {
            const result = await usersCollection.deleteOne({ _id: new ObjectId(id) })

            if (result?.acknowledged && result?.deletedCount > 0)
                return NextResponse.json({ data: 'User deleted successfully.' }, { status: 200 });
            return NextResponse.json({ data: 'User deletion unsuccessful.' }, { status: 200 });
        } else {
            return NextResponse.json({
                message: 'Forbidden Access'
            }, { status: 403 })
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
