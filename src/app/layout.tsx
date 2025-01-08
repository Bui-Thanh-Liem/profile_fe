import type { Metadata } from "next";
import localFont from "next/font/local";

//
import Footer from "@/components/Footer";
import NavBar from "@/components/navbar/NavBar";
import "./globals.css";

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
        <div className="fixed top-0 left-0 right-0 z-50 flex bg-background shadow-sm">
          <NavBar />
        </div>
        <div className="m-auto overflow-x-hidden">
          <div
            className="w-[1200px] m-auto flex items-center"
            style={{
              marginTop: "var(--hight-navbar)",
              height: `calc(100vh - var(--hight-navbar))`,
            }}
          >
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
