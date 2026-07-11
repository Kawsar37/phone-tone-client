import { PhoneCard } from "./PhoneCard";

// Mock data (Will be replaced by API fetch later)
const featuredPhones = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    image:
      "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800&auto=format&fit=crop",
    brand: "Apple",
    price: 1199,
    rating: 4.9,
    shortDesc: "Titanium design with the powerful A17 Pro chip.",
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    brand: "Samsung",
    price: 1299,
    rating: 4.8,
    shortDesc: "Galaxy AI and the ultimate S Pen experience.",
  },
  {
    id: "3",
    name: "Pixel 8 Pro",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Google",
    price: 999,
    rating: 4.7,
    shortDesc: "The best of Google AI in a beautiful design.",
  },
  {
    id: "4",
    name: "OnePlus 12",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "OnePlus",
    price: 799,
    rating: 4.6,
    shortDesc: "Blazing fast performance with Hasselblad camera.",
  },
];

export function FeaturedPhones() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral">
            Featured <span className="text-primary">Smartphones</span>
          </h2>
          <p className="mt-3 text-lg text-neutral/60">
            Handpicked top-tier devices for the ultimate mobile experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPhones.map((phone) => (
            <PhoneCard key={phone.id} {...phone} />
          ))}
        </div>
      </div>
    </section>
  );
}
