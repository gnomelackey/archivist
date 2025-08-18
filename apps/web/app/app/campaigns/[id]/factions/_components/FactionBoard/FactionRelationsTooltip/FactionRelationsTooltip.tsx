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
    </Tooltip>
  );
};
