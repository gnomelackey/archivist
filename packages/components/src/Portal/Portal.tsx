"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./types";

export function Portal({ children }: PortalProps) {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => setHost(document.body), []);

  if (!host) return null;
  return createPortal(children, host);
}
