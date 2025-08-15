"use client";

import { apiClient } from "@repo/clients";
import { Button } from "@repo/components";
import Link from "next/link";
import { redirect, usePathname, useParams } from "next/navigation";

const navigationLinks = [
  { name: "Dashboard", href: "/app/dashboard" },
  { name: "Campaigns", href: "/app/campaigns" },
];

const subNavigationLinks = (path: string, id: string) => {
  if (path.startsWith("/app/campaigns")) {
    return [
      { name: "Factions", href: `/app/campaigns/${id}/factions` },
      { name: "Maps", href: `/app/campaigns/${id}/maps` },
    ];
  }

  return [];
};

export const AppBar = () => {
  const currentPath = usePathname();
  const { id } = useParams();

  const isSubPathSelected =
    currentPath &&
    id &&
    navigationLinks.some((link) =>
      currentPath.startsWith(`${link.href}/${id}`)
    );

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
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                currentPath === link.href
                  ? "text-palette-200 font-semibold"
                  : "text-palette-100"
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {isSubPathSelected ? (
          <nav className="flex space-x-4">
            {subNavigationLinks(currentPath, id as string)?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  currentPath === link.href
                    ? "text-palette-200 font-semibold"
                    : "text-palette-100"
                }
              >
                {link.name}
              </Link>
            ))}
          </nav>
        ) : null}
        <Button type="button" variant="text" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};
