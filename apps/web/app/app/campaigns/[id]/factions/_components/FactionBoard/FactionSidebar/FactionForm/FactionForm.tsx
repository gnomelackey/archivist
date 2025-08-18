import { useEffect, useState } from "react";

import { Button, Input, TextArea } from "@repo/components";
import type { FactionFormProps } from "./types";

export const FactionForm = ({
  faction,
  onRemove,
  onCreate,
  onColorChange,
}: FactionFormProps) => {
  const [factionName, setFactionName] = useState<string>("");
  const [factionRace, setFactionRace] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setFactionName(faction.name || "");
    setFactionRace(faction.race || "");
    setDescription(faction.description || "");
  }, [faction]);

  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-1 gap-2">
        <Input
          placeholder="Faction Name"
          value={factionName || ""}
          onChange={(e) => setFactionName(e.target.value)}
        />
        <Input
          fullWidth={false}
          className="w-30"
          placeholder="Race"
          value={factionRace || ""}
          onChange={(e) => setFactionRace(e.target.value)}
        />
      </div>
      <TextArea
        placeholder="Description"
        rows={1}
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <button
          className={`w-10 rounded h-10 flex-shrink-0 hover:cursor-pointer`}
          style={{ backgroundColor: faction.color }}
          onClick={() =>
            window.document.getElementById(`${faction.id}-color-input`)?.click()
          }
        />
        <input
          id={`${faction.id}-color-input`}
          type="color"
          hidden
          value={faction.color}
          onChange={(ev) => onColorChange(faction.id, ev.target.value)}
        />
        <div className="flex gap-2 flex-1">
          <Button
            type="button"
            variant="outline"
            mode="secondary"
            onClick={() => onRemove(faction.id)}
          >
            Remove
          </Button>
          <Button
            type="button"
            variant="fill"
            className="flex-1"
            onClick={() => {
              const name = factionName;
              if (name) onCreate(name, "");
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
