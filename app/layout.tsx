import type React from "react"
import Head from "next/head"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <Head>
        <title>Escape The Scam - Trò Chơi Giáo Dục An Toàn Mạng</title>
        <meta
          name="description"
          content="Một trò chơi phiêu lưu giáo dục về nhận diện và tránh các loại lừa đảo trực tuyến"
        />
        <meta
          name="google-site-verification"
          content="FrjRz-wLD29kQQRfpKxj93Q1o02JGcJyYbLWZxZ2Rc8"
        />
      </Head>

      <body className={`font-mono ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
