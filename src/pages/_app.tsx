import "@unocss/reset/normalize.css";
import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/sanitize/assets.css";
import "../styles/uno.css";
import Head from "next/head";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>UnoCSS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Example of Next.js with UnoCSS" />
        <meta
          name="keywords"
          content="next.js, unocss, css, scss, sass, less, stylus, javascript, typescript"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;