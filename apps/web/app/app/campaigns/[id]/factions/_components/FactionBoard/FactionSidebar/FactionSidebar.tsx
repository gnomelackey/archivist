import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import { CREATE_FACTION_MUTATION } from "@repo/clients";
import { useParams } from "next/navigation";

import { FactionForm } from "./FactionForm";
import type { FactionSideBarProps } from "./types";
import { FactionFormFields } from "./FactionForm/types";

export const FactionFormSideBar = ({
  factions,
  onRemove,
  onFactionChange,
}: FactionSideBarProps) => {
  const { id: campaignId } = useParams();

  const [createFaction] = useMutation(CREATE_FACTION_MUTATION);

  const handleCreate = (faction: FactionFormFields) => {
    createFaction({
      variables: {
        name: faction.name,
        race: faction.race,
        campaign: campaignId,
        description: faction.description,
        color: faction.color,
      },
    });
  };

  const handleCreateAll = () => {
    factions.forEach(handleCreate);
  };

  const formCTAs = factions?.length
    ? [
        <Button
          key="faction-create-all"
          className="w-full"
          variant="fill"
          onClick={handleCreateAll}
        >
          Create All
        </Button>,
        <Button
          key="faction-remove-all"
          className="w-full"
          mode="secondary"
          onClick={() => factions.forEach((faction) => onRemove(faction.id))}
        >
          Remove All
        </Button>,
      ]
    : null;

  return (
    <div
      className="fixed left-0 bg-palette-600 shadow-lg border-r border-palette-100 z-40 overflow-y-auto pb-10"
      style={{
        width: "400px",
        top: "var(--full-appbar-height, 88px)",
        height: "calc(100vh - var(--full-appbar-height, 88px))",
      }}
    >
      <div className="sticky flex flex-col gap-2 top-0 bg-palette-600 p-6 pb-6 mb-4 border-b border-palette-100 z-10">
        <h6 className="w-full text-lg font-semibold text-palette-100 uppercase text-center">
          Factions
        </h6>
        {formCTAs}
      </div>
      <div className="p-6 pt-3 flex flex-col gap-6">
        {factions.map((faction) => (
          <FactionForm
            key={faction.id}
            faction={faction}
            onRemove={onRemove}
            onSave={handleCreate}
            onFactionChange={onFactionChange}
          />
        ))}
      </div>
    </div>
  );
};
