import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import {
  CREATE_FACTION_MUTATION,
  CREATE_FACTIONS_MUTATION,
  GET_FACTIONS_WITH_COORDINATES,
  REMOVE_FACTION_MUTATION,
  REMOVE_FACTIONS_MUTATION,
} from "@repo/clients";
import { CoordinateLocationEnum } from "@repo/enums";
import { useParams } from "next/navigation";

import { FactionForm } from "./FactionForm";
import type { FactionSideBarProps } from "./types";
import type { FactionCard } from "../types";

export const FactionFormSideBar = ({
  factions,
  onRemove,
  onFactionChange,
}: FactionSideBarProps) => {
  const { id: campaignId } = useParams();

  const [createFaction] = useMutation(CREATE_FACTION_MUTATION, {
    refetchQueries: [GET_FACTIONS_WITH_COORDINATES],
  });

  const [createFactions] = useMutation(CREATE_FACTIONS_MUTATION, {
    refetchQueries: [GET_FACTIONS_WITH_COORDINATES],
  });

  const [removeFaction] = useMutation(REMOVE_FACTION_MUTATION, {
    refetchQueries: [GET_FACTIONS_WITH_COORDINATES],
  });

  const [removeFactions] = useMutation(REMOVE_FACTIONS_MUTATION, {
    refetchQueries: [GET_FACTIONS_WITH_COORDINATES],
  });

  const handleFactionMapping = (faction: FactionCard) => ({
    name: faction.data.name,
    race: faction.data.race,
    description: faction.data.description,
    color: faction.data.color,
    coordinates: {
      x: faction.x,
      y: faction.y,
      width: faction.width,
      height: faction.height,
      location: CoordinateLocationEnum.FACTION_BOARD,
    },
  });

  const handleRemoveTemporaryCard = (faction: FactionCard) => {
    if (faction.isTemporary) {
      onRemove(faction.id);
    }
  };

  const handleRemoveCard = (faction: FactionCard) => {
    if (!faction.isTemporary) {
      removeFaction({
        variables: { campaign: campaignId, faction: faction.id },
      });
    } else {
      handleRemoveTemporaryCard(faction);
    }
  };

  const handleRemoveCards = () => {
    const [permanentCards, temporaryCards] = factions.reduce(
      (acc: [Array<FactionCard>, Array<FactionCard>], f) =>
        !f.isTemporary ? [[...acc[0], f], acc[1]] : [acc[0], [...acc[1], f]],
      [[], []]
    );

    if (permanentCards.length) {
      removeFactions({
        onCompleted: () => {
          temporaryCards.forEach(handleRemoveTemporaryCard);
        },
        variables: {
          campaign: campaignId,
          factions: permanentCards.map(({ id }) => id),
        },
      });
    } else {
      temporaryCards.forEach(handleRemoveTemporaryCard);
    }
  };

  const handleCreate = (faction: FactionCard) => {
    createFaction({
      onCompleted: () => {
        handleRemoveTemporaryCard(faction);
      },
      variables: {
        campaign: campaignId,
        faction: handleFactionMapping(faction),
      },
    });
  };

  const handleCreateAll = () => {
    const temporaryCards = factions.filter((f) => f.isTemporary);

    if (!temporaryCards.length) return;

    createFactions({
      onCompleted: () => {
        temporaryCards.forEach(handleRemoveTemporaryCard);
      },
      variables: {
        campaign: campaignId,
        factions: temporaryCards.map(handleFactionMapping),
      },
    });
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
          key="faction-remove-temporary"
          className="w-full"
          mode="secondary"
          onClick={() => factions.forEach(handleRemoveTemporaryCard)}
        >
          Clear Temporary
        </Button>,
        <Button
          key="faction-remove-all"
          className="w-full"
          mode="secondary"
          onClick={handleRemoveCards}
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
            onRemove={handleRemoveCard}
            onSave={handleCreate}
            onFactionChange={onFactionChange}
          />
        ))}
      </div>
    </div>
  );
};
