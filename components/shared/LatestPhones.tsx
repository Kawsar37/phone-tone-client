"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PhoneCard } from "./PhoneCard";
import { PhoneCardSkeleton } from "./PhoneCardSkeleton";
import { phoneAPI } from "@/utils/api";
import { IPhone } from "@/types";
import { toast } from "sonner";

export function LatestPhones() {
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPhones = async () => {
      try {
        const { data } = await phoneAPI.getPhones({ limit: 4 });
        setPhones(data.phones);
      } catch {
        toast.error("Failed to load latest phones");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPhones();
  }, []);

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
          <Link
            href="/phones"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            View All Latest →
          </Link>
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
              No new phones available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
