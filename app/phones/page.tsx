"use client";

import { useState, useEffect, useMemo } from "react";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PhoneCard } from "@/components/shared/PhoneCard";
import { PhoneCardSkeleton } from "@/components/shared/PhoneCardSkeleton";
import { Pagination } from "@/components/shared/Pagination";
import { PhoneFilters } from "@/components/shared/PhoneFilters";

// --- MOCK DATA (Replace with real API fetch later) ---
const MOCK_PHONES = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    image:
      "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=800&auto=format&fit=crop",
    brand: "Apple",
    price: 1199,
    rating: 4.9,
    shortDesc: "Titanium design with A17 Pro chip.",
    ram: "8GB",
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    brand: "Samsung",
    price: 1299,
    rating: 4.8,
    shortDesc: "Galaxy AI and S Pen experience.",
    ram: "12GB",
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
    ram: "12GB",
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
    ram: "16GB",
  },
  {
    id: "5",
    name: "iPhone 15",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    brand: "Apple",
    price: 799,
    rating: 4.5,
    shortDesc: "Dynamic Island and 48MP camera.",
    ram: "6GB",
  },
  {
    id: "6",
    name: "Galaxy S24",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    brand: "Samsung",
    price: 899,
    rating: 4.6,
    shortDesc: "Compact flagship with Galaxy AI.",
    ram: "8GB",
  },
  {
    id: "7",
    name: "Pixel 8",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Google",
    price: 699,
    rating: 4.5,
    shortDesc: "Pure Android experience with AI magic.",
    ram: "8GB",
  },
  {
    id: "8",
    name: "Nothing Phone (2)",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Nothing",
    price: 599,
    rating: 4.4,
    shortDesc: "Unique Glyph interface and design.",
    ram: "12GB",
  },
  {
    id: "9",
    name: "Xiaomi 14 Pro",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Xiaomi",
    price: 899,
    rating: 4.5,
    shortDesc: "Leica optics and Snapdragon 8 Gen 3.",
    ram: "16GB",
  },
  {
    id: "10",
    name: "Realme GT 5 Pro",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Realme",
    price: 599,
    rating: 4.3,
    shortDesc: "Flagship killer with 144Hz display.",
    ram: "16GB",
  },
  {
    id: "11",
    name: "Asus ROG Phone 8",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Asus",
    price: 1199,
    rating: 4.7,
    shortDesc: "Ultimate gaming phone with cooling.",
    ram: "16GB",
  },
  {
    id: "12",
    name: "Motorola Edge 50",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    brand: "Motorola",
    price: 499,
    rating: 4.2,
    shortDesc: "Vegan leather and pOLED curved display.",
    ram: "8GB",
  },
];

const ITEMS_PER_PAGE = 8;

export default function PhonesPage() {
  const [phones, setPhones] = useState<typeof MOCK_PHONES>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search State
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortBy, setSortBy] = useState("latest");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Drawer
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Simulate API Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhones(MOCK_PHONES);
      setLoading(false);
    }, 800); // Simulated network delay
    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters change (only if not already on first page)
  useEffect(() => {
    setCurrentPage((prev) => (prev !== 1 ? 1 : prev));
  }, [search, selectedBrands, selectedRam, priceRange, sortBy]);

  // Filter, Sort, and Paginate Logic
  const processedPhones = useMemo(() => {
    let filtered = [...phones];

    // Search
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    // Brand Filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }
    // RAM Filter
    if (selectedRam.length > 0) {
      filtered = filtered.filter((p) => selectedRam.includes(p.ram));
    }
    // Price Filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sorting
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // 'latest' keeps original mock order
    }

    return filtered;
  }, [phones, search, selectedBrands, selectedRam, priceRange, sortBy]);

  const totalPages = Math.ceil(processedPhones.length / ITEMS_PER_PAGE);
  const paginatedPhones = processedPhones.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Helper to toggle array filters
  const toggleArrayFilter = (
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
  ) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const uniqueBrands = Array.from(new Set(phones.map((p) => p.brand)));
  const uniqueRams = Array.from(new Set(phones.map((p) => p.ram)));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header: Search & Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-neutral">
                Explore <span className="text-primary">Phones</span>
              </h1>
              <p className="text-neutral/60 mt-1">
                Showing {processedPhones.length} results
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-grow md:w-72">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/40"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search phones..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-neutral/20 bg-white text-sm font-medium text-neutral focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="latest">Latest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden p-2.5 rounded-lg border border-neutral/20 bg-white text-neutral"
              >
                <FiSliders size={20} />
              </button>
            </div>
          </div>

          {/* Main Grid: Sidebar + Cards */}
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white p-6 rounded-xl border border-neutral/5 shadow-sm">
                <h2 className="text-lg font-bold text-neutral mb-6">Filters</h2>
                <PhoneFilters
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  selectedRam={selectedRam}
                  setSelectedRam={setSelectedRam}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  uniqueBrands={uniqueBrands}
                  uniqueRams={uniqueRams}
                />
              </div>
            </aside>

            {/* Cards Grid */}
            <div className="flex-grow">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <PhoneCardSkeleton key={i} />
                  ))}
                </div>
              ) : paginatedPhones.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedPhones.map((phone) => (
                      <PhoneCard key={phone.id} {...phone} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-neutral/5">
                  <p className="text-xl font-bold text-neutral mb-2">
                    No phones found
                  </p>
                  <p className="text-neutral/60">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-6 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-neutral">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 text-neutral hover:bg-bg-light rounded-lg"
                >
                  <FiX size={20} />
                </button>
              </div>
              <PhoneFilters
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedRam={selectedRam}
                setSelectedRam={setSelectedRam}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                uniqueBrands={uniqueBrands}
                uniqueRams={uniqueRams}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
