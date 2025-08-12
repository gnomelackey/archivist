import type { ErrorMessageProps } from "./types";

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="text-sm font-semibold text-red-400">{children}</p>;
};
