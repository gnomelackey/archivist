"use client";

import { apiClient } from "@repo/clients";
import { Button } from "@repo/components";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import styles from "./AppBar.module.css";

const navigationLinks = [
  { name: "Dashboard", href: "/app/dashboard" },
  { name: "Campaigns", href: "/app/campaigns" },
  { name: "Settings", href: "/app/settings" },
];

export const AppBar = () => {
  const currentPath = usePathname();

  const handleLogout = async () => {
    try {
      await apiClient("/api/auth/logout", { method: "POST" });
      redirect("/login");
    } catch (error) {
      console.error("Logout error:", error);
      redirect("/login");
    }
  };

  return (
    <header
      className="
        sticky top-0 z-50 border-b border-black/5 dark:border-white/10
        bg-white/70 dark:bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur
      "
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-lg font-semibold text-palette-100">Archivist</h1>
        <nav className="flex space-x-4">
          {navigationLinks.map((link) => {
            const activeClassName =
              currentPath === link.href ? styles.active : "text-palette-100";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={activeClassName}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <Button type="button" variant="text" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};
