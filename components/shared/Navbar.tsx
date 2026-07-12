"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/providers/AuthProvider";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/phones", label: "Explore" },
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
              className="text-sm font-medium text-neutral/70 hover:text-primary transition-colors"
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
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={user.role === "admin" ? "/admin" : "/user"}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                <FiUser size={16} /> Dashboard
              </Link>
              <button
                onClick={logout}
                className="p-2 text-neutral/60 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </div>
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
          className="md:hidden p-2 text-neutral hover:bg-neutral/5 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-neutral/10 bg-white px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-neutral/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-neutral/10 flex flex-col gap-3">
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-bg-light text-neutral hover:bg-neutral/10 transition-colors"
            >
              <FiShoppingCart size={20} />
              <span className="font-medium">My Cart</span>
            </Link>

            {user ? (
              <>
                <Link
                  href={user.role === "admin" ? "/admin" : "/user"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <FiUser size={20} />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <FiLogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                <FiUser size={20} /> Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
