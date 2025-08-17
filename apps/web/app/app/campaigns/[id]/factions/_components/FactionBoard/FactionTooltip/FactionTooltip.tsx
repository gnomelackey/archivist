import { Button } from "@repo/components";

import Styles from "./styles.module.css";
import type { FactionToolTipProps } from "./types";

export const FactionTooltip = ({ x, y, id, onClick }: FactionToolTipProps) => {
  const handleConflictClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id, "conflict");
  };

  const handleAllianceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id, "alliance");
  };

  return (
    <div
      className={`absolute bg-gray-200 p-2 rounded shadow text-palette-300 ${Styles.tooltip} flex flex-col gap-2 z-50`}
      style={{
        left: x - 100,
        top: y - 100,
        width: 200,
        height: 100,
        transform: "translate(0, 0)",
      }}
    >
      <Button
        mode="secondary"
        type="button"
        variant="fill"
        onClick={handleConflictClick}
      >
        Conflict
      </Button>
      <Button
        mode="secondary"
        type="button"
        variant="outline"
        onClick={handleAllianceClick}
      >
        Alliance
      </Button>
    </div>
  );
};
