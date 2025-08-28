import { Button, Switch, TextArea, Tooltip, Typeahead } from "@repo/components";

import type { FactionRelationsTooltipProp } from "./types";

import styles from "./styles.module.css";
import { useState } from "react";

export const FactionRelationsTooltip = ({
  x,
  y,
  factionA: idA,
  factionB: idB,
  onClick,
}: FactionRelationsTooltipProp) => {
  const [, setChecked] = useState(false);
  const [type, setType] = useState<"conflict" | "alliance" | null>(null);

  const handleConflictClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(idA, idB, "conflict");
    setType("conflict");
  };

  const handleAllianceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(idA, idB, "alliance");
    setType("alliance");
  };

  return (
    <Tooltip x={x} y={y} className={styles["faction-relations-tooltip"]}>
      {type !== null ? (
        <form className="flex flex-col gap-2 items-center w-full">
          <TextArea placeholder="Reason..." rows={3} fullWidth />
          {type === "conflict" ? (
            <Typeahead placeholder="Resource" options={[]} />
          ) : null}
          {type === "conflict" ? (
            <Switch
              className="my-2"
              leftLabel="Aggressor"
              rightLabel="Defender"
              onChange={setChecked}
            />
          ) : null}
        </form>
      ) : null}
      <div className="flex gap-2 w-full">
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
      </div>
    </Tooltip>
  );
};
