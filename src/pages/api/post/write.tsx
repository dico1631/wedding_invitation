import {connectDB} from "@/lib/database"
import type { NextApiRequest, NextApiResponse } from 'next';

interface People {
    brideName: Array<string>;
    brideRelationship: Array<string>;
    bridePhone: Array<string>;
    brideBankNm: Array<string>;
    brideAccountNo: Array<string>;
    groomName: Array<string>;
    groomRelationship: Array<string>;
    groomPhone: Array<string>;
    groomBankNm: Array<string>;
    groomAccountNo: Array<string>;
    adminNo: bigint;
    adminCode: string;
}

const Write = async(request:NextApiRequest, response:NextApiResponse) =>{
    console.log("start.");
	const {brideName, brideRelationship, bridePhone, brideBankNm, brideAccountNo, 
            groomName, groomRelationship, groomPhone, groomBankNm, groomAccountNo, 
            adminNo, adminCode}:People = request.body;
    
	const db = (await connectDB).db("BloomingDay");

    const client = await connectDB;
    
    console.log("=== 입력값 ===", brideName, brideRelationship, bridePhone, brideBankNm, brideAccountNo, 
        groomName, groomRelationship, groomPhone, groomBankNm, groomAccountNo, 
        adminNo, adminCode);

    let result = await db.collection('T_PEOPLE').deleteMany({"adminNo" : Number(adminNo)});
    console.log("delete result --- ");
    console.log(result);

    for(let i=0; i<brideName.length; i++){
        console.log("brideName[" + i + "] : " + brideName[i]);
        if(brideName[i] == '') continue;
        let result = await db.collection('T_PEOPLE').insertOne({
            "peopleNo": 2,
            "name": brideName[i],
            "relationship": brideRelationship[i],
            "phone": bridePhone[i],
            "bankNm": brideBankNm[i],
            "accountNo": brideAccountNo[i],
            "adminNo": Number(adminNo),
            "seq": i+1,
            "type": "bride" 
        });
    }

    for(let j=0; j<groomName.length; j++){
        if(groomName[j] == '') continue;
        let result = await db.collection('T_PEOPLE').insertOne({
            "peopleNo": 2,
            "name": groomName[j],
            "relationship": groomRelationship[j],
            "phone": groomPhone[j],
            "bankNm": groomBankNm[j],
            "accountNo": groomAccountNo[j],
            "adminNo":  Number(adminNo),
            "seq": j+1,
            "type": "groom" 
        });
    }

    //let result = await db.collection('info').insertOne({});
    return response.status(200).redirect('/admin/' + request.body.adminCode);
}

export default Write;