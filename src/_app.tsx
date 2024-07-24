// pages/_app.tsx
import type { AppProps } from "next/app";
import "uno.css"; // unocss 스타일 가져오기

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
