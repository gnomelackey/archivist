import { Button, Tooltip } from "@repo/components";

import type { FactionRelationsTooltipProp } from "./types";

import styles from "./styles.module.css";

export const FactionRelationsTooltip = ({
  x,
  y,
  id,
  onClick,
}: FactionRelationsTooltipProp) => {
  const handleConflictClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id, "conflict");
  };

  const handleAllianceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id, "alliance");
  };

  return (
    <Tooltip x={x} y={y} className={styles["faction-relations-tooltip"]}>
      <Button
        mode="error"
        type="button"
        variant="outline"
        onClick={handleConflictClick}
        fullWidth
      >
        Conflict
      </Button>
      <Button
        mode="info"
        type="button"
        variant="fill"
        onClick={handleAllianceClick}
        fullWidth
      >
        Alliance
      </Button>
    </Tooltip>
  );
};
