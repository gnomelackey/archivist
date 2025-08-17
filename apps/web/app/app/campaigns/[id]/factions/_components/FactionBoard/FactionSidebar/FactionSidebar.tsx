import { Button, Input, TextArea, IconButton } from "@repo/components";

/* TODO: Figure out if we want these
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Primary Race
    </label>
    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="">Select a race...</option>
        {RACES.map((race) => (
        <option key={race} value={race}>
            {race}
        </option>
        ))}
    </select>
    </div>

    <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Faction Color
    </label>
    <input
        type="color"
        className="w-full h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue="#3498db"
    />
    </div>
*/

export const FactionFormSideBar = ({
  factions,
  onRemove,
  onCreate,
  onColorChange,
}: {
  onColorChange: (id: string, color: string) => void;
  onRemove: (id: string) => void;
  onCreate: (name: string, description: string) => void;
  factions: Array<{ id: string; name?: string; color: string }>;
}) => {
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
        {factions?.length
          ? [
              <Button
                key="faction-create-all"
                className="w-full"
                variant="fill"
              >
                Create All
              </Button>,
              <Button
                key="faction-remove-all"
                className="w-full"
                mode="secondary"
                onClick={() =>
                  factions.forEach((faction) => onRemove(faction.id))
                }
              >
                Remove All
              </Button>,
            ]
          : null}
      </div>
      <div className="p-6 pt-3 flex flex-col gap-6">
        {factions.map((faction) => (
          <div key={faction.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 w-full">
              <button
                className={`w-10 rounded h-10 flex-shrink-0 hover:cursor-pointer`}
                style={{ backgroundColor: faction.color }}
                onClick={() =>
                  window.document
                    .getElementById(`${faction.id}-color-input`)
                    ?.click()
                }
              />
              <input
                id={`${faction.id}-color-input`}
                type="color"
                hidden
                value={faction.color}
                onChange={(ev) => onColorChange(faction.id, ev.target.value)}
              />
              <Input placeholder="Faction Name" defaultValue={faction.name} />
            </div>
            <TextArea placeholder="Description" rows={1} />
            <div className="flex gap-2">
              <IconButton
                onClick={() => onRemove(faction.id)}
                icon="delete"
                size={2}
                color={300}
                className="hover:opacity-80"
              />
              <Button
                type="button"
                variant="fill"
                className="w-full"
                onClick={() => {
                  if (faction.name) {
                    onCreate(faction.name, "");
                  }
                }}
              >
                Create
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
