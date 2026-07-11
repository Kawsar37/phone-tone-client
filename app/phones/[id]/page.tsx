"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiChevronRight,
  FiStar,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiZap,
  FiCheck,
} from "react-icons/fi";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PhoneCard } from "@/components/shared/PhoneCard";
import { toast } from "sonner";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

// --- MOCK DATA (Will be replaced by API fetch later) ---
const mockPhone = {
  id: "1",
  name: "iPhone 15 Pro Max",
  brand: "Apple",
  price: 1199,
  rating: 4.9,
  shortDescription:
    "Titanium design. A17 Pro chip. The most powerful iPhone ever.",
  description:
    "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. The aerospace-grade titanium shell makes it the lightest Pro model ever, offering unmatched durability and premium feel.",
  images: [
    "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
  ],
  colors: [
    "Natural Titanium",
    "Blue Titanium",
    "White Titanium",
    "Black Titanium",
  ],
  specs: {
    Display: "6.7-inch Super Retina XDR OLED, 120Hz ProMotion",
    Processor: "Apple A17 Pro (3 nm)",
    RAM: "8 GB",
    Storage: "256GB / 512GB / 1TB",
    "Rear Camera": "48 MP (Main) + 12 MP (Ultrawide) + 12 MP (Telephoto 5x)",
    "Front Camera": "12 MP, TrueDepth",
    Battery: "4422 mAh, 65W wired, 15W MagSafe",
    OS: "iOS 17, upgradable to iOS 18",
    "5G": "Yes",
    "Water Resistance": "IP68 dust/water resistant (up to 6m for 30 min)",
  },
  reviews: [
    {
      user: "Alex M.",
      rating: 5,
      comment:
        "The titanium body makes it so much lighter than the 14 Pro Max. Camera zoom is incredible!",
    },
    {
      user: "Sarah K.",
      rating: 4,
      comment:
        "Amazing phone, but the price is definitely steep. Battery life is slightly better than last gen.",
    },
    {
      user: "David L.",
      rating: 5,
      comment: "Action button is surprisingly useful. Best iPhone I've owned.",
    },
  ],
};

const relatedPhones = [
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    brand: "Samsung",
    price: 1299,
    rating: 4.8,
    shortDesc: "Galaxy AI and S Pen experience.",
  },
  {
    id: "3",
    name: "Pixel 8 Pro",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Google",
    price: 999,
    rating: 4.7,
    shortDesc: "Best of Google AI in beautiful design.",
  },
  {
    id: "4",
    name: "OnePlus 12",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "OnePlus",
    price: 799,
    rating: 4.6,
    shortDesc: "Blazing fast with Hasselblad camera.",
  },
  {
    id: "5",
    name: "iPhone 15 Pro",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    brand: "Apple",
    price: 999,
    rating: 4.8,
    shortDesc: "Compact Pro with titanium design.",
  },
];

export default function PhoneDetailsPage() {
  const [mainImage, setMainImage] = useState(mockPhone.images[0]);
  const [selectedColor, setSelectedColor] = useState(mockPhone.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">(
    "overview",
  );

  const { data: session } = useSession();
  console.log("User session:", session); // For debugging purposes

  const handleAddToCart = () => {
    if (session?.user) {
      toast.success("Added to Cart!", {
        description: `${quantity}x ${mockPhone.name} (${selectedColor}) added to your cart.`,
      });
    } else {
      toast.error("Please log in to add items to your cart.", {
        description: "You need to be logged in to add items to your cart.",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-neutral/60 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <FiChevronRight size={14} />
            <Link
              href="/phones"
              className="hover:text-primary transition-colors"
            >
              Phones
            </Link>
            <FiChevronRight size={14} />
            <span className="text-neutral font-medium">{mockPhone.name}</span>
          </nav>

          {/* Top Section: Gallery + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-2 md:pb-0 md:pr-2">
                {mockPhone.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      mainImage === img
                        ? "border-primary shadow-md"
                        : "border-neutral/10 hover:border-neutral/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                      height={80}
                      width={80}
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-grow bg-white rounded-xl border border-neutral/5 p-6 flex items-center justify-center aspect-square md:aspect-auto md:max-h-[600px]">
                <Image
                  height={600}
                  width={600}
                  src={mainImage}
                  alt={mockPhone.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="inline-block w-fit rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-3">
                {mockPhone.brand}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral mb-3">
                {mockPhone.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={
                        i < Math.floor(mockPhone.rating)
                          ? "fill-current"
                          : "text-neutral/20"
                      }
                      size={18}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral">
                  {mockPhone.rating}
                </span>
                <span className="text-sm text-neutral/50">
                  ({mockPhone.reviews.length} Reviews)
                </span>
              </div>

              <p className="text-4xl font-extrabold text-primary mb-4">
                ${mockPhone.price}
              </p>

              <p className="text-neutral/70 leading-relaxed mb-8">
                {mockPhone.shortDescription}
              </p>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-neutral mb-3">
                  Color:{" "}
                  <span className="font-normal text-neutral/70">
                    {selectedColor}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mockPhone.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-neutral/20 text-neutral/70 hover:border-neutral/40"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-neutral mb-3">
                  Quantity
                </h3>
                <div className="inline-flex items-center border border-neutral/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-bg-light text-neutral transition-colors"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-6 py-2 text-sm font-semibold text-neutral border-x border-neutral/20 min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-bg-light text-neutral transition-colors"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  <FiShoppingCart size={20} /> Add to Cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-secondary text-white font-semibold shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all">
                  <FiZap size={20} /> Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-neutral/10">
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> Free Next-Day Shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> 2-Year Warranty
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> 14-Day Returns
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> 100% Authentic
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-xl border border-neutral/5 p-6 sm:p-8 mb-16">
            {/* Tab Headers */}
            <div className="flex border-b border-neutral/10 mb-8 overflow-x-auto">
              {(["overview", "specs", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all relative ${
                    activeTab === tab
                      ? "text-primary"
                      : "text-neutral/60 hover:text-neutral"
                  }`}
                >
                  {tab === "overview"
                    ? "Overview"
                    : tab === "specs"
                      ? "Specifications"
                      : `Reviews (${mockPhone.reviews.length})`}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "overview" && (
                <div className="prose max-w-none text-neutral/80 leading-relaxed">
                  <p>{mockPhone.description}</p>
                  <p className="mt-4">
                    Experience the perfect blend of performance and design. The
                    aerospace-grade titanium shell provides exceptional
                    durability while keeping the device incredibly light.
                    Capture stunning photos and videos with the advanced camera
                    system, and enjoy all-day battery life.
                  </p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(mockPhone.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 border-b border-neutral/5"
                    >
                      <span className="text-sm font-medium text-neutral/60">
                        {key}
                      </span>
                      <span className="text-sm font-semibold text-neutral text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {mockPhone.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="pb-6 border-b border-neutral/5 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-neutral">
                          {review.user}
                        </h4>
                        <div className="flex text-secondary">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <FiStar
                              key={j}
                              className="fill-current"
                              size={14}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-neutral/70">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Phones */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral mb-8">
              Related <span className="text-primary">Phones</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPhones.map((phone) => (
                <PhoneCard key={phone.id} {...phone} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
