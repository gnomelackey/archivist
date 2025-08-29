import { forwardRef } from "react";

const FactionsLoadingComponent = (
  _: object,
  ref: React.Ref<HTMLCanvasElement>
) => (
  <div className="relative w-full h-full bg-gray-50">
    {ref ? (
      <canvas ref={ref} className="absolute inset-0 hidden w-full h-full" />
    ) : null}
    <div className="absolute inset-0 bg-gray-100 animate-pulse">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-primary-500 mb-2">
            Loading Faction Board
          </h2>
          <p className="text-gray-500">Setting up your campaign factions...</p>
        </div>
      </div>
    </div>
    <div
      className="fixed flex flex-col justify-between left-0 bg-bg shadow-lg border-r border-primary-border z-40 overflow-y-auto"
      style={{
        width: "400px",
        top: "var(--full-appbar-height, 88px)",
        height: "calc(100vh - var(--full-appbar-height, 88px))",
      }}
    >
      <div>
        <div className="sticky flex flex-col gap-2 top-0 bg-bg p-6 pt-6 border-b border-primary-border z-10 bg-bg-default">
          <div className="animate-pulse h-10.5 bg-gray-300 rounded"></div>
        </div>
        <div className="px-6 pt-16 pb-24 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-1 gap-2">
              <div className="animate-pulse h-10.5 w-full bg-gray-300 rounded"></div>
              <div className="animate-pulse h-10.5 w-30 bg-gray-300 rounded"></div>
            </div>
            <div className="animate-pulse h-16.5 w-full bg-gray-300 rounded"></div>
            <div className="animate-pulse h-10.5 w-full bg-gray-300 rounded"></div>
            <div className="animate-pulse h-16.5 w-full border border-gray-300 rounded"></div>
            <div className="animate-pulse h-10.5 w-full bg-gray-300 rounded"></div>
            <div className="animate-pulse h-16.5 w-full border border-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const FactionsLoading = forwardRef<HTMLCanvasElement, object>(
  FactionsLoadingComponent
);
