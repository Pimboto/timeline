import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Timeline for Coleman project',
  description: 'Created with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Poppins, sans-serif' }}>{children}</body>
    </html>
  )
}
