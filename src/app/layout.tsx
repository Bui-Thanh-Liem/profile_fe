import type { Metadata } from "next";
import localFont from "next/font/local";

//
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";

//
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//
export const metadata: Metadata = {
  title: "LiemDev",
  description: "I am a software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-second-app`}
      >
        <p className="text-primary">TEST TAILWIND</p>
        <div className="flex bg-background">
          <NavBar />
        </div>
        <div className="w-[1200px] m-auto overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
