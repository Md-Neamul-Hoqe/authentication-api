import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

// console.log('URI: ', uri);

/* check env is found or not */
if (!uri) {
    throw new Error('Invalid/missing environment variable: "MONGODB_URI"')
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// console.log('MDB Client: ', client);

async function connectDB() {
    try {
        // console.log('connect called');
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export { connectDB, client };
