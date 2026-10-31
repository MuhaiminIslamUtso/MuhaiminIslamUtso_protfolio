import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  /** When true, footer is not rendered (e.g. arcade page full-screen) */
  noFooter?: boolean;
}

export default function MainLayout({ children, noFooter = false }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090D]">
      <Navbar />
      <main className="flex-1 pt-16" id="main-content">
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
}

