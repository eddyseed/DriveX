import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://randomboiii069:AxB2E6uqnBAZyjbp@devkit.7aiwpbd.mongodb.net/?retryWrites=true&w=majority&appName=DevKit";



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default client;