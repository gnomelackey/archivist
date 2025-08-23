import type { ErrorMessageProps } from "./types";

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="text-sm font-semibold text-error-600">{children}</p>;
};
