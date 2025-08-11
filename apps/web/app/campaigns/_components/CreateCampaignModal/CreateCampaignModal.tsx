import { Button, Input, TextArea } from "@repo/components";
import { AnimatePresence, motion } from "framer-motion";

import { Portal } from "../Portal";
import { useScreenLock } from "../../_hooks/useScreenLock/useScreenLock";

export const CreateCampaignModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  useScreenLock(open);

  const content = open ? (
    <motion.div
      key="modal-mask"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gray-600 p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
            <form className="flex flex-col space-y-4">
              <Input id="name" label="Campaign Name" />
              <TextArea id="description" label="Description" />
              <div className="flex justify-end space-x-2">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
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
