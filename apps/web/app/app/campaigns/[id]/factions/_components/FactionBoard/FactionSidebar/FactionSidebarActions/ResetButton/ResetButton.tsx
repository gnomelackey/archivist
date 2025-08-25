import { Button } from "@repo/components";

import type { ResetButtonProps } from "./types";

export const ResetButton = ({ onReset, show }: ResetButtonProps) => {
  if (!show) return null;

  return (
    <Button
      key="faction-remove-temporary"
      className="w-full"
      mode="error"
      onClick={onReset}
    >
      Reset Board
    </Button>
  );
};
