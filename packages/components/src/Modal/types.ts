import type { ReactNode } from "react";

export type ModalProps = {
  children: ReactNode;
  title: string;
  open: boolean;
};
