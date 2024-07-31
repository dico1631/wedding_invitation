export default function AdminOne() {
  return (
    <div className="m-1 p-4 bg-blue-500 text-white font-mono">
      <form action="/api/post/write" method="POST">
        <select name="type">
          <option value="groom">신랑</option>
          <option value="bride">신부</option>
        </select>
        <input name="name_ko" placeholder="이름 (한국어)"></input>
        <button type="submit">입력</button>
      </form>
    </div>
  );
}
