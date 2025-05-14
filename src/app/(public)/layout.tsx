import Footer from "@/layouts/public/footer/Footer";
import NavBar from "@/layouts/public/navbar/NavBar";
import "./layout.css";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
