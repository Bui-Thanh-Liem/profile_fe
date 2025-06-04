"use client";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { NotCompatibleLayout } from "@/layouts/NotCompatible";
import Footer from "@/layouts/public/footer/Footer";
import NavBar from "@/layouts/public/navbar/NavBar";
import { useEffect, useState } from "react";
import "./layout.css";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isMobileSmall, isMobileLarge, isDesktopSmall, isTablet } =
    useBreakpoints();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isMobileSmall || isMobileLarge || isTablet || isDesktopSmall)
    return <NotCompatibleLayout />;

  return (
    <main>
      <div className={`antialiased bg`}>
        <div className="fixed top-0 left-0 right-0 z-50 flex shadow-sm bg-background">
          <NavBar />
        </div>
        <div>{children}</div>
        <Footer />
      </div>
    </main>
  );
}
