import { FiSmartphone } from "react-icons/fi";

const brands = [
  { name: "Apple", icon: "🍎" },
  { name: "Samsung", icon: "📱" },
  { name: "Google", icon: "🔍" },
  { name: "OnePlus", icon: "⚡" },
  { name: "Xiaomi", icon: "🚀" },
  { name: "Realme", icon: "💎" },
];

export function PopularBrands() {
  return (
    <section className="py-16 bg-white border-y border-neutral/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-neutral/50 mb-8">
          Trusted Brands We Carry
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-bg-light border border-neutral/5 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {brand.icon}
              </span>
              <span className="text-sm font-bold text-neutral/80 group-hover:text-primary transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
