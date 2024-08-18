import { MongoClient, MongoClientOptions } from 'mongodb';

const url: string = 'mongodb+srv://seonghyunhong:Fursys123@weddingcluster.smhcv.mongodb.net/?retryWrites=true&w=majority&appName=WeddingCluster';
const options: MongoClientOptions = {};
let connectDB: Promise<MongoClient>;

declare global {
    // eslint-disable-next-line no-var
    var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url, options).connect();
}

export { connectDB };