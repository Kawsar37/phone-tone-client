// components/shared/PhoneFilters.tsx

interface PhoneFiltersProps {
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRam: string[];
  setSelectedRam: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  uniqueBrands: string[];
  uniqueRams: string[];
}

export function PhoneFilters({
  selectedBrands,
  setSelectedBrands,
  selectedRam,
  setSelectedRam,
  priceRange,
  setPriceRange,
  uniqueBrands,
  uniqueRams,
}: PhoneFiltersProps) {
  // Helper to toggle array filters
  const toggleArrayFilter = (
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
  ) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  return (
    <div className="space-y-8">
      {/* Brands */}
      <div>
        <h3 className="text-sm font-bold text-neutral uppercase tracking-wide mb-3">
          Brand
        </h3>
        <div className="space-y-2">
          {uniqueBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleArrayFilter(selectedBrands, setSelectedBrands, brand)
                }
                className="rounded border-neutral/30 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral/70 group-hover:text-neutral">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* RAM */}
      <div>
        <h3 className="text-sm font-bold text-neutral uppercase tracking-wide mb-3">
          RAM
        </h3>
        <div className="space-y-2">
          {uniqueRams.map((ram) => (
            <label
              key={ram}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedRam.includes(ram)}
                onChange={() =>
                  toggleArrayFilter(selectedRam, setSelectedRam, ram)
                }
                className="rounded border-neutral/30 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral/70 group-hover:text-neutral">
                {ram}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-neutral uppercase tracking-wide mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full px-3 py-2 rounded-lg border border-neutral/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Min"
          />
          <span className="text-neutral/40">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full px-3 py-2 rounded-lg border border-neutral/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
}
