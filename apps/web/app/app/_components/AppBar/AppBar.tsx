"use client";

import { apiClient } from "@repo/clients";
import { Button } from "@repo/components";
import Link from "next/link";
import { redirect, usePathname, useParams } from "next/navigation";
import { useCallback, useMemo } from "react";

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

const useSubPathSelected = () => {
  const currentPath = usePathname();
  const { id } = useParams();

  return useMemo(
    () =>
      currentPath &&
      id &&
      navigationLinks.some((link) =>
        currentPath.startsWith(`${link.href}/${id}`)
      ),
    [currentPath, id]
  );
};

export const AppBar = () => {
  const currentPath = usePathname();
  const { id } = useParams();

  const isSubPathSelected = useSubPathSelected();

  const getActiveLinkClass = useCallback(
    (href: string) =>
      currentPath.startsWith(href)
        ? "text-palette-200 font-semibold"
        : "text-palette-100",
    [currentPath]
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
        sticky top-0 z-50 border-b border-palette-100
        bg-white/70 dark:bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur
      "
    >
      <div className="block w-full">
        <div className="flex items-center justify-between py-2 max-w-7xl m-auto">
          <h1 className="text-lg font-semibold text-palette-100">Archivist</h1>
          <nav className="flex space-x-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getActiveLinkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Button type="button" variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {isSubPathSelected ? (
          <div className="w-full bg-palette-600">
            <div className="flex items-center justify-center py-2 max-w-7xl m-auto">
              <nav className="flex space-x-4">
                {subNavigationLinks(currentPath, id as string)?.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={getActiveLinkClass(link.href)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
