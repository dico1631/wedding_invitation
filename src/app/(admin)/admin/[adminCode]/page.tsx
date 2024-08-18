import {connectDB} from "@/lib/database"

export default async function Admin(props) {
    const db = (await connectDB).db("BloomingDay");
    let groomInfo = await db.collection('T_PEOPLE').find({"adminNo": Number(props.params.adminCode), "type": "groom"}).toArray();
    let brideInfo = await db.collection('T_PEOPLE').find({"adminNo": Number(props.params.adminCode), "type": "bride"}).toArray();
    console.log(props.params.adminCode);
    console.log(groomInfo);
    console.log(brideInfo);

    return (
      <div className="m-1 p-4 bg-blue-500 text-white font-mono">
        <h4>신부측 정보</h4>
        {
          brideInfo.map((a, i)=>
            <div key={i} style={{ margin: '20px'}}>
              <div><span>관계</span><input value={brideInfo[i].relationship}/></div>
              <div><span>성함</span><input value={brideInfo[i].name}/></div>
              <div><span>전화번호</span><input value={brideInfo[i].phone}/></div>
              <div><span>은행명</span><input value={brideInfo[i].bankNm}/></div>
              <div><span>계좌번호</span><input value={brideInfo[i].accountNo}/></div>
            </div>
          )
        }
        
        <h4>신랑측 정보</h4>
        {
          groomInfo.map((a, i)=>
            <div key={i} style={{ margin: '20px'}}>
              <div><span>관계</span><input value={groomInfo[i].relationship}/></div>
              <div><span>성함</span><input value={groomInfo[i].name}/></div>
              <div><span>전화번호</span><input value={groomInfo[i].phone}/></div>
              <div><span>은행명</span><input value={groomInfo[i].bankNm}/></div>
              <div><span>계좌번호</span><input value={groomInfo[i].accountNo}/></div>
            </div>
          )
        }
        
      </div>
    );
  }
  