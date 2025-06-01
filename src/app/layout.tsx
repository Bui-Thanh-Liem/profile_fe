import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";

//
import "./globals.css";

//
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"], // tuỳ chọn độ đậm
  display: "swap",
  variable: "--font-roboto-mono",
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

//
export const metadata: Metadata = {
  title: "LiemDev",
  description: "I'm a software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./logo.png" type="image/png" />
      </head>
      <body className={`${robotoMono.variable} font-light`}>{children}</body>
    </html>
  );
}
