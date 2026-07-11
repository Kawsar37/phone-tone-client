"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    title: "Experience the Future",
    subtitle: "iPhone 15 Pro Max",
    desc: "Titanium design. A17 Pro chip. The most powerful iPhone ever.",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2000&auto=format&fit=crop", // Placeholder high-quality phone image
  },
  {
    title: "Unleash Your Creativity",
    subtitle: "Samsung Galaxy S24 Ultra",
    desc: "Galaxy AI is here. Capture the night like never before.",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Pure. Simple. Awesome.",
    subtitle: "Google Pixel 8 Pro",
    desc: "The best of Google AI, in a beautifully crafted design.",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2000&auto=format&fit=crop",
  },
];

export function Hero() {
  return (
    <section className="relative h-[65vh] min-h-[500px] w-full overflow-hidden bg-neutral">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[4000ms]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Dark Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral/90 via-neutral/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3 animate-fade-in-up">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-white/80 mb-8 max-w-md">
                      {slide.desc}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/phones"
                        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105"
                      >
                        Shop Now
                      </Link>
                      <Link
                        href="/phones"
                        className="rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                      >
                        Explore Specs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
