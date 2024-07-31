import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://sungwoncho94:Lalaland94!!@zzo.3p4qvfa.mongodb.net/?retryWrites=true&w=majority&appName=zzo'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
	if (!global._mongo) {
		global._mongo = new MongoClient(url, options).connect()
	}
	connectDB = global._mongo
} else {
	connectDB = new MongoClient(url, options).connect()
}
export { connectDB }