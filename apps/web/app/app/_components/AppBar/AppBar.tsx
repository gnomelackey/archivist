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
        ? "text-primary-fg font-semibold underline!"
        : "text-primary-fg",
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
        sticky top-0 z-50 border-b border-primary-border
        color-bg-default backdrop-blur supports-[backdrop-filter]:backdrop-blur
      "
    >
      <div className="block w-full">
        <div className="flex items-center justify-between py-2 max-w-7xl m-auto">
          <h1 className="text-lg font-semibold text-primary-fg">Archivist</h1>
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

          <Button className="text-primary-fg!" type="button" variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {isSubPathSelected ? (
          <div className="w-full bg-primary-100">
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
