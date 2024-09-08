export const metadata = {
  title: 'Happily Ever After',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ddw6cok.css"></link>
      </head>
      <body>{children}</body>
    </html>
  )
}
