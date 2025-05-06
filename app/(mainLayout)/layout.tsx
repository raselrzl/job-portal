import Navbar from "@/components/general/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-w-7xl mx-auto md:px-6 lg:px-8">
      <div className="fixed top-0 left-0 right-0 z-50 pl-5 md:px-20 bg-background shadow-md">
        <Navbar />
      </div>

      <div className="mt-14"> {children}</div>
    </div>
  );
}
