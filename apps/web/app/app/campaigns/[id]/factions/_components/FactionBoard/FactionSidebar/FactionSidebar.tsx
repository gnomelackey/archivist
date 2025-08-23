import { useCallback, useEffect, useState } from "react";

import { FactionForm } from "./FactionForm";
import type { FactionSideBarProps } from "./types";
import { FactionFormSideBarActions } from "./FactionSidebarActions";
import { Input } from "@repo/components";
import { FactionCard } from "../types";

export const FactionFormSideBar = ({
  factions,
  onRemove,
  onSave,
  onReset,
  onChange,
}: FactionSideBarProps) => {
  const showActions = factions.length > 0;

  const [query, setQuery] = useState("");
  const [filteredFactions, setFilteredFactions] = useState(factions);

  const shouldFilter = useCallback(
    (faction: FactionCard) => {
      return (
        faction.data.name.toLowerCase().includes(query) ||
        faction.data.race.toLowerCase().includes(query) ||
        faction.data.description?.toLowerCase().includes(query)
      );
    },
    [query]
  );

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerQuery = e.target.value.toLowerCase();

    setQuery(lowerQuery);
    setFilteredFactions((prev) => prev.filter(shouldFilter));
  };

  useEffect(() => {
    setFilteredFactions(factions.filter(shouldFilter));
  }, [factions, shouldFilter]);

  return (
    <div
      className="fixed flex flex-col justify-between left-0 bg-bg shadow-lg border-r border-primary-border z-40 overflow-y-auto"
      style={{
        width: "400px",
        top: "var(--full-appbar-height, 88px)",
        height: "calc(100vh - var(--full-appbar-height, 88px))",
      }}
    >
      <div>
        <div className="sticky flex flex-col gap-2 top-0 bg-bg p-6 pt-6 border-b border-primary-border z-10">
          <Input placeholder="Filter factions..." icon={{ name: "search" }} onChange={handleFilter} value={query} />
        </div>
        <div className="px-6 pt-16 pb-24 flex flex-col gap-6">
          {filteredFactions.map((faction) => (
            <FactionForm
              key={faction.id}
              faction={faction}
              onRemove={onRemove}
              onSave={onSave}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
      <FactionFormSideBarActions
        factions={filteredFactions}
        onSave={onSave}
        onReset={onReset}
        onRemove={onRemove}
        show={showActions}
      />
    </div>
  );
};
