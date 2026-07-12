"use client";

import { useState, useEffect } from "react";
import { PhoneCard } from "./PhoneCard";
import { PhoneCardSkeleton } from "./PhoneCardSkeleton";
import { phoneAPI } from "@/utils/api";
import { IPhone } from "@/types";
import { toast } from "sonner";

export function FeaturedPhones() {
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPhones = async () => {
      try {
        const { data } = await phoneAPI.getPhones({ limit: 4, sort: "rating" });
        setPhones(data.phones);
      } catch {
        toast.error("Failed to load featured phones");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPhones();
  }, []);

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
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <PhoneCardSkeleton key={i} />
            ))
          ) : phones.length > 0 ? (
            phones.map((phone) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-neutral/60">
              No featured phones available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
