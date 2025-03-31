import Footer from "@/components/Footer";
import NavBar from "@/components/navbar/NavBar";
import { ContactMe } from "@/layouts/public/ContactMe";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className={`antialiased bg-[#d2f8fd]`}>
        <div className="fixed top-0 left-0 right-0 z-50 flex shadow-sm bg-background">
          <NavBar />
        </div>
        {children}
        <ContactMe />
        <Footer />
      </div>
    </main>
  );
}
