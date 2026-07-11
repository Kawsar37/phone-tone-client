"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/phones", label: "Explore Phones" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral/5 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-extrabold tracking-tight"
        >
          <span className="text-primary">Phone</span>
          <span className="text-neutral">Tone</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral/70 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/cart"
            className="relative p-2 text-neutral hover:text-primary transition-colors"
          >
            <FiShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
              0
            </span>
          </Link>

          {session?.user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <FiUser size={16} /> Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Sign In
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-neutral"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-neutral/10 bg-white">
          <div className="flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-neutral/80 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-neutral/10" />
            <Link
              href="/login"
              className="w-full text-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
