import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
// console.log(process.env);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export { connectDB, client };
