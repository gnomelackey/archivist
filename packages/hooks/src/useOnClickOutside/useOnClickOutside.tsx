import { useEffect, useRef } from "react";

export const useOnClickOutside = <T extends HTMLElement>({ callback }: { callback: () => void }) => {
  const inputRef = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { current } = inputRef;
      const isClickOutside = current && !current.contains(event.target as Node);
      if (isClickOutside) callback();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return { inputRef };
};
