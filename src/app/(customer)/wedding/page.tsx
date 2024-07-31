import { connectDB } from '@/util/database'

export default async function wedding() {
  const client = await connectDB;
    const db = client.db("wedding_invitation");
    let result = await db.collection('info').find().toArray();

    console.log(result)

  return (
    <>
      <div className="m-1 p-4 bg-blue-500 text-white font-mono">
        wedding page
      </div>
    </>
  );
}
