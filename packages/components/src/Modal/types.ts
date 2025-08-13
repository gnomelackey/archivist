import type { ReactNode } from "react";

export type ModalProps = {
  children: ReactNode;
  footer?: ReactNode;
  title: string;
  open: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};
