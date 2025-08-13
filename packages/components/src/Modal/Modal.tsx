import { useScreenLock } from "@repo/hooks";
import { AnimatePresence, motion } from "framer-motion";

import { Portal } from "../Portal";
import type { ModalProps } from "./types";

const modalMaskAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

const modalAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.2 },
};

export const Modal = ({
  children,
  title,
  open,
  footer,
  size = "md",
}: ModalProps) => {
  useScreenLock(open);

  const maskKey = `modal-mask-${title}`;
  const modalKey = `modal-${title}`;

  const sizeClass = {
    sm: "w-80",
    md: "w-96",
    lg: "w-128",
    xl: "w-160",
  }[size];

  const footerContent = footer ? (
    <div className="bg-palette-100 px-6 py-4 mt-10 rounded-b-2xl flex align-middle">
      {footer}
    </div>
  ) : null;

  const content = open ? (
    <motion.div key={maskKey} {...modalMaskAnimation}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <motion.div key={modalKey} {...modalAnimation}>
          <div className={`bg-palette-500 rounded-2xl shadow-lg border border-palette-100 ${sizeClass}`}>
            <h2 className="text-xl text-palette-100 pt-6 px-6 pb-0 font-bold mb-4 uppercase">
              {title}
            </h2>
            <div className="p-6">{children}</div>
            {footerContent}
          </div>
        </motion.div>
      </div>
    </motion.div>
  ) : null;

  return (
    <Portal>
      <AnimatePresence mode="wait">{content}</AnimatePresence>
    </Portal>
  );
};
