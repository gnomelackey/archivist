import { AppBar } from "./_components/AppBar/AppBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
