import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import HaveLoginCustomer from "@/layouts/public/haveLoginCustomer/HaveLoginCustomer";
import NavBar from "@/components/navbar/NavBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={`antialiased bg-gray-second-app`}>
        <div className="fixed top-0 left-0 right-0 z-50 flex shadow-sm bg-background">
          <NavBar />
        </div>
        <HaveLoginCustomer />
        {children}
        <ContactMe />
        <Footer />
      </div>
    </div>
  );
}
