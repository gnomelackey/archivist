import { FactionBoard } from "./_components/FactionBoard";

export default function FactionsPage() {
  return (
    <div className="pl-110 pr-10 w-full h-full">
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden h-full">
        <FactionBoard />
      </div>
    </div>
  );
}
