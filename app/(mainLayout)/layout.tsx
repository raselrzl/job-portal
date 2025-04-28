import Navbar from "@/components/general/Navbar";

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <div className="mx-w-7xl mx-auto md:px-6 lg:px-8">
        <Navbar />
        {children}
     </div>
    );
  }
  