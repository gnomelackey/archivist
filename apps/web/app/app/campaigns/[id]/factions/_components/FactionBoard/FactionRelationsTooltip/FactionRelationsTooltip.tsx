import { Button, Switch, TextArea, Tooltip, Typeahead } from "@repo/components";

import type { FactionRelationsTooltipProps } from "./types";

import styles from "./styles.module.css";
import { useState } from "react";

export const FactionRelationsTooltip = ({
  x,
  y,
  onCancel,
}: FactionRelationsTooltipProps) => {
  const [, setChecked] = useState(false);
  const [type, setType] = useState<"conflict" | "alliance" | null>(null);

  const handleConflictClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setType("conflict");
  };

  const handleAllianceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setType("alliance");
  };

  const handleSwitchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setType((prev) => (prev === "alliance" ? "conflict" : "alliance"));
  };

  return (
    <Tooltip x={x} y={y} className={styles["faction-relations-tooltip"]}>
      {type !== null ? (
        <form className="flex flex-col gap-2 items-center w-full">
          <TextArea
            className="resize-none"
            placeholder="Reason..."
            rows={4}
            fullWidth
          />
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
      {type === null ? (
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
      ) : (
        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-2 w-full">
            <Button
              mode="error"
              type="button"
              variant="outline"
              onClick={onCancel}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              mode="success"
              type="button"
              variant="fill"
              onClick={handleAllianceClick}
              fullWidth
            >
              Save
            </Button>
          </div>
          <Button
            mode="info"
            type="button"
            variant="text"
            onClick={handleSwitchClick}
            fullWidth
          >
            {`Switch to ${type === "conflict" ? "Alliance" : "Conflict"}`}
          </Button>
        </div>
      )}
    </Tooltip>
  );
};
