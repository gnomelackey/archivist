import type { Metadata } from "next";
import localFont from "next/font/local";

import { GlobalProviders } from "./_providers/GlobalProviders";
import styles from "./layout.module.css";

import "@repo/components/styles.css";
import "./globals.css";

const geistSans = localFont({
  src: "./_fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./_fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Archivist App",
  description: `Build, manage, and share campaign settings for your favorite table-top RPGs`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalProviders>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}></footer>
        </GlobalProviders>
      </body>
    </html>
  );
}
