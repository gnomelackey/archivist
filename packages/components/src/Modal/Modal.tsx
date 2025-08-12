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

export const Modal = ({ children, title, open }: ModalProps) => {
  const maskKey = `modal-mask-${title}`;
  const modalKey = `modal-${title}`;

  useScreenLock(open);

  const content = open ? (
    <motion.div key={maskKey} {...modalMaskAnimation}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div key={modalKey} {...modalAnimation}>
          <div className="bg-gray-600 p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {children}
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
