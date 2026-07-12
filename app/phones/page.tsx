"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PhoneCard } from "@/components/shared/PhoneCard";
import { PhoneCardSkeleton } from "@/components/shared/PhoneCardSkeleton";
import { Pagination } from "@/components/shared/Pagination";
import { PhoneFilters } from "@/components/shared/PhoneFilters";
import { phoneAPI } from "@/utils/api";
import { IPhone } from "@/types";
import { toast } from "sonner";

export default function PhonesPage() {
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedBrands, selectedRam, priceRange, sortBy]);

  useEffect(() => {
    const fetchPhones = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await phoneAPI.getPhones({
          page: currentPage,
          limit: 8,
          search: search || undefined,
          brand: selectedBrands.length ? selectedBrands.join(",") : undefined,
          ram: selectedRam.length ? selectedRam.join(",") : undefined,
          minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
          maxPrice: priceRange[1] < 1500 ? priceRange[1] : undefined,
          sort: sortBy !== "latest" ? sortBy : undefined,
        });
        setPhones(data.phones);
        setTotalPages(data.pagination.pages);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load phones";
        setError(message);
        toast.error("Error", { description: message });
      } finally {
        setLoading(false);
      }
    };
    fetchPhones();
  }, [currentPage, search, selectedBrands, selectedRam, priceRange, sortBy]);

  const uniqueBrands = Array.from(new Set(phones.map((p) => p.brand)));
  const uniqueRams = Array.from(new Set(phones.map((p) => p.ram)));

  if (error && !loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-bg-light">
          <div className="text-center">
            <p className="text-xl font-bold text-neutral mb-2">
              Something went wrong
            </p>
            <p className="text-neutral/60 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-primary px-6 py-2 text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-neutral">
                Explore <span className="text-primary">Phones</span>
              </h1>
              <p className="text-neutral/60 mt-1">
                Showing {loading ? "..." : phones.length} results
              </p>
            </div>
            <div className="flex items-center gap-3">
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
              <button
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden p-2.5 rounded-lg border border-neutral/20 bg-white text-neutral"
              >
                <FiSliders size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-8">
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

            <div className="flex-grow">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <PhoneCardSkeleton key={i} />
                  ))}
                </div>
              ) : phones.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {phones.map((phone) => (
                      <PhoneCard
                        key={phone._id}
                        id={phone._id}
                        name={phone.name}
                        image={phone.images[0]}
                        brand={phone.brand}
                        price={phone.price}
                        rating={phone.rating}
                        shortDesc={phone.shortDescription}
                      />
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
