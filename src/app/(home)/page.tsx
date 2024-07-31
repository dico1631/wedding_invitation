"use client";
import { Icon } from "@iconify/react";

function Home() {
  return (
    <div>
      <h1>Welcome to My Home Page</h1>
      <p className="text-blue-500">
        This is the home page of my Next.js application.
      </p>
      <Icon icon="mdi-light:home" className="text-blue-500 w-12 h-12" />
      <Icon icon="mdi:account" className="text-red-500 w-12 h-12" />
    </div>
  );
}

export default Home;
