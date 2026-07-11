"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed!", {
      description: "You'll receive our latest deals soon.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Get Exclusive Deals & Tech News
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about flash
          sales, new arrivals, and expert buying guides.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-grow px-5 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary backdrop-blur-sm"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/30"
          >
            <FiSend size={18} /> Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
