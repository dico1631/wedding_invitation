import {connectDB} from "@/util/database"

const Write = async(request,response) =>{
	console.log('==Write== request.body')
	console.log(request.body);

	const db = (await connectDB).db("wedding_invitation");
    const client = await connectDB;

    let result = await db.collection('info').insertOne(
		{name_ko: request.body.name_ko, type: request.body.type}
	);
    return response.status(200).redirect('/wedding');
}

export default Write;