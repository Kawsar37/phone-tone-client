import Link from "next/link";
import { FiStar } from "react-icons/fi";

interface PhoneCardProps {
  id: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  rating: number;
  shortDesc: string;
}

export function PhoneCard({
  id,
  name,
  image,
  brand,
  price,
  rating,
  shortDesc,
}: PhoneCardProps) {
  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-neutral/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-bg-light p-6">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
          {brand}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-bold text-neutral line-clamp-1 mb-1">
          {name}
        </h3>
        <p className="text-sm text-neutral/60 line-clamp-2 mb-4 flex-grow">
          {shortDesc}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-extrabold text-primary">${price}</span>
          <div className="flex items-center gap-1 text-sm text-neutral/70">
            <FiStar className="fill-secondary text-secondary" size={16} />
            <span className="font-semibold">{rating}</span>
          </div>
        </div>

        <Link
          href={`/phones/${id}`}
          className="w-full text-center rounded-lg bg-neutral/5 border border-neutral/10 px-4 py-2.5 text-sm font-semibold text-neutral hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
