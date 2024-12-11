import type { Metadata } from "next";
import "./globals.scss";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
// import Head from "next/head";
import { IBM_Plex_Sans_KR } from "next/font/google";

const notoSansKr = IBM_Plex_Sans_KR({
  // weight: ["100", "200", "300", "400", "500", "600", "700"],
  weight: ["500"],
  subsets: ["latin"],
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "북곽택배",
  description: "북곽인들의 슬기로운 택배 주문을 위한 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      {/* <Head>
        <link rel="icon" href="/vercel.svg" />
      </Head> */}
      <body className={notoSansKr.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
