import type { Metadata } from "next"
import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Escape The Scam - Trò Chơi Giáo Dục An Toàn Mạng",
  description:
    "Một trò chơi phiêu lưu giáo dục về nhận diện và tránh các loại lừa đảo trực tuyến",
  verification: {
    google: "FrjRz-wLD29kQQRfpKxj93Q1o02JGcJyYbLWZxZ2Rc8",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="vi"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-mono antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
