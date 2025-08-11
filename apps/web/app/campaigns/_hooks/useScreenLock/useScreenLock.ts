"use client";
import { useEffect } from "react";

export const useScreenLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      const { overflow } = document.body.style;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflow;
      };
    }
  }, [lock]);
};
