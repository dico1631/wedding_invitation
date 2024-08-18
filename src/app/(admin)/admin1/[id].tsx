import {connectDB} from "@/lib/database"
import { useRouter } from 'next/router';

export default async function Admin() {
    const router = useRouter();  
    console.log(router.query);

    const db = (await connectDB).db("BloomingDay");
    let r = await db.collection('T_PEOPLE').find().toArray();
    console.log(r);

    return (
      <div className="m-1 p-4 bg-blue-500 text-white font-mono">
        <form action="/api/post/write" method="POST">
          <select name="type">
            <option value="groom">신랑</option>
            <option value="bride">신부</option>
          </select>
          <input type="text" name="name_ko" placeholder="이름 (한국어)"></input>
          <button type="submit">입력</button>
        </form>
      </div>
    );
  }
  