import {connectDB} from "@/lib/database"
import { NextPage } from 'next';
import Error from 'next/error';

export default async function Admin(props) {
    const db = (await connectDB).db("BloomingDay");
    let admin = await db.collection('T_ADMIN').findOne({"adminCode" : props.params.adminCode});
    let groomInfo, brideInfo;
    const maxSize = 3;
    if(admin != null){
      groomInfo = await db.collection('T_PEOPLE').find({"adminNo": Number(admin.adminNo), "type": "groom"}).toArray();
      brideInfo = await db.collection('T_PEOPLE').find({"adminNo": Number(admin.adminNo), "type": "bride"}).toArray();

    }
    else{
      return "404";
    }
    const remainGroomInputSize = maxSize - groomInfo.length;
    const remainBrideInputSize = maxSize - brideInfo.length;

    console.log(props.params.adminCode);
    console.log(groomInfo);
    console.log(brideInfo);

    return (
      <div className="m-1 p-4 bg-blue-500 text-white font-mono">
        <form action="/api/post/write" method="POST">
          <h4>신부측 정보</h4>
          {
            brideInfo.map((a, i)=>
              <div key={i} style={{ margin: '20px'}}>
                <div><span>관계</span><input name="brideRelationship" defaultValue={brideInfo[i].relationship}/></div>
                <div><span>성함</span><input name="brideName" defaultValue={brideInfo[i].name}/></div>
                <div><span>전화번호</span><input name="bridePhone" defaultValue={brideInfo[i].phone}/></div>
                <div><span>은행명</span><input name="brideBankNm" defaultValue={brideInfo[i].bankNm}/></div>
                <div><span>계좌번호</span><input name="brideAccountNo" defaultValue={brideInfo[i].accountNo}/></div>
              </div>
            )
          }

          {
            [...Array(remainBrideInputSize)].map((a, i)=>
              <div key={i} style={{ margin: '20px'}}>
                <div><span>관계</span><input name="brideRelationship"/></div>
                <div><span>성함</span><input name="brideName"/></div>
                <div><span>전화번호</span><input name="bridePhone"/></div>
                <div><span>은행명</span><input name="brideBankNm"/></div>
                <div><span>계좌번호</span><input name="brideAccountNo"/></div>
              </div>
            )
          }
          
          <h4>신랑측 정보</h4>
          {
            groomInfo.map((a, i)=>
              <div key={i} style={{ margin: '20px'}}>
                <div><span>관계</span><input name="groomRelationship" defaultValue={groomInfo[i].relationship}/></div>
                <div><span>성함</span><input name="groomName" defaultValue={groomInfo[i].name}/></div>
                <div><span>전화번호</span><input name="groomPhone" defaultValue={groomInfo[i].phone}/></div>
                <div><span>은행명</span><input name="groomBankNm" defaultValue={groomInfo[i].bankNm}/></div>
                <div><span>계좌번호</span><input name="groomAccountNo" defaultValue={groomInfo[i].accountNo}/></div>
              </div>
            )
          }

          {
            [...Array(remainGroomInputSize)].map((a, i)=>
              <div key={i} style={{ margin: '20px'}}>
                <div><span>관계</span><input name="groomRelationship"/></div>
                <div><span>성함</span><input name="groomName"/></div>
                <div><span>전화번호</span><input name="groomPhone"/></div>
                <div><span>은행명</span><input name="groomBankNm"/></div>
                <div><span>계좌번호</span><input name="groomAccountNo"/></div>
              </div>
            )
          }
          
          <input name="adminNo" type="hidden" defaultValue={admin.adminNo}/>
          <input name="adminCode" type="hidden" defaultValue={admin.adminCode}/>
          <button type="submit">저장</button>
        </form>
      </div>
    );
  }
  