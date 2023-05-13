import { Inter } from 'next/font/google'
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokemon Sell Prices'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Head title={metadata.title}/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
