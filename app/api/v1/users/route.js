import { client, connectDB } from "../../dbConn";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

connectDB();

if (!process.env.DB_NAME) {
    throw new Error('Invalid/missing environment variable: "DB_NAME"')
}

const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection('users');


// console.log(usersCollection);

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

// export async function POST(request) { }

// export async function PUT(request) { }

// export async function DELETE(request) { }

// export async function PATCH(request) { }

// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request) { }