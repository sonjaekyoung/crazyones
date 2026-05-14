import { BrotherCard } from "./brother-card";
import { brothers } from "@/data/brothers";

export function BrothersGrid() {
  return (
    <div className="grid grid-cols-1 gap-px bg-seam/40 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {brothers.map((b, i) => (
        <BrotherCard key={b.id} brother={b} index={i} />
      ))}
    </div>
  );
}
