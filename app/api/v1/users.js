import { client, connectDB } from "../db";

connectDB();

const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection('users');

export const users = async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        console.log('users in server: ', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
