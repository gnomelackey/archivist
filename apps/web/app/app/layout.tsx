import { AppBar } from "./_components/AppBar/AppBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />
      <div className="flex justify-center w-full pt-5">
        <div className="max-w-7xl w-full">{children}</div>
      </div>
    </>
  );
}
