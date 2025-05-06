import Navbar from "@/components/general/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    

      <div className="mt-14"> {children}</div>
  
  );
}
