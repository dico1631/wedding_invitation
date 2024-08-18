import {connectDB} from "@/lib/database"
import type { NextApiRequest, NextApiResponse } from 'next';

interface User {
    type: string;
    name_ko: string;
}

const Write = async(request:NextApiRequest, response:NextApiResponse) =>{
	const {name_ko, type}:User = request.body;

	const db = (await connectDB).db("BloomingDay");
    let r = await db.collection('T_ADMIN').find().toArray();
    console.log(r);
    
    const client = await connectDB;

    /*let result = await db.collection('info').insertOne({name_ko, type});
    return response.status(200).redirect('/wedding');*/
}

export default Write;