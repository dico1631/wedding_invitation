export const metadata = {
  title: 'Happily Ever After',
  description: 'Generated by Next.js',
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bloomingday.kro.kr/card/JinwooMinjae" />
        <meta property="og:title" content="11월 3일 이진우 ♥ 신민재 결혼합니다." />
        <meta property="og:description" content="여기를 눌러 링크를 확인하세요. " />
        <meta property="og:image" content="/images/main/main.png" />
        <link rel="stylesheet" href="https://use.typekit.net/ddw6cok.css"></link>
        <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
