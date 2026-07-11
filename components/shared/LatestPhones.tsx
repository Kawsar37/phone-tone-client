import { PhoneCard } from "./PhoneCard";

const latestPhones = [
  {
    id: "5",
    name: "Nothing Phone (2a)",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Nothing",
    price: 399,
    rating: 4.5,
    shortDesc: "Unique transparent design with Glyph interface.",
  },
  {
    id: "6",
    name: "Sony Xperia 1 V",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Sony",
    price: 1399,
    rating: 4.4,
    shortDesc: "Pro-grade camera and 4K OLED display for creators.",
  },
  {
    id: "7",
    name: "Asus ROG Phone 8",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Asus",
    price: 1199,
    rating: 4.7,
    shortDesc: "The ultimate gaming phone with AeroActive cooler.",
  },
  {
    id: "8",
    name: "Motorola Edge 50",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Motorola",
    price: 599,
    rating: 4.3,
    shortDesc: "Sleek vegan leather back with pOLED curved display.",
  },
];

export function LatestPhones() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral">
              Just <span className="text-secondary">Arrived</span>
            </h2>
            <p className="mt-3 text-lg text-neutral/60">
              Be the first to explore the newest additions to our catalog.
            </p>
          </div>
          <a
            href="/phones"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            View All Latest →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPhones.map((phone) => (
            <PhoneCard key={phone.id} {...phone} />
          ))}
        </div>
      </div>
    </section>
  );
}
