import { client, connectDB } from "../../dbConn";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

connectDB();

if (!process.env.DB_NAME) {
    throw new Error('Invalid/missing environment variable: "DB_NAME"')
}

const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection('users');


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
        const oldUser = await req.json();
        const id = oldUser._id

        const newUser = {
            $set: {
                name: oldUser?.name,
                phone: oldUser?.phone,
                email: oldUser?.email,
            }
        }

        const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, newUser, { upsert: true })

        return NextResponse.json({ data: result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const id = req.url.split('?')[ 1 ]

        console.log(req.cookies);

        const result = await usersCollection.findOne({ _id: new ObjectId(id) })
        // const result = await usersCollection.deleteOne({ _id: new ObjectId(id) })

        return NextResponse.json({ data: result }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
