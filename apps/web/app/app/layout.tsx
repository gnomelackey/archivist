import { AppBar } from "./_components/AppBar/AppBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      <AppBar />
      <div className="flex justify-center w-full h-full pt-5">{children}</div>
    </div>
  );
}
