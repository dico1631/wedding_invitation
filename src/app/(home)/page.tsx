"use client"; // iconfy는 client component에서만 사용 가능
import { Icon } from "@iconify/react";

function Home() {
  return (
    <div className="m-1 p-4 bg-blue-500 text-white font-mono">
      <h1>Welcome to My Home Page</h1>
      <p>This is the home page of my Next.js application.</p>
      <Icon icon="mdi-light:home" width="50" height="50" />
      <Icon icon="mdi:account" width="50" height="50" />
    </div>
  );
}

export default Home;
