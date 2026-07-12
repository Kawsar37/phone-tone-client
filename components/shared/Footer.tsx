"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-bg-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              <span className="text-primary">Phone</span>Tone
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Your ultimate destination for finding the perfect smartphone.
              Compare specs, read reviews, and get the best deals on the latest
              mobile technology.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/phones"
                  className="hover:text-secondary transition-colors"
                >
                  All Phones
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-secondary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMail className="text-secondary flex-shrink-0" />{" "}
                support@phonetone.com
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-secondary flex-shrink-0" /> +1 (555)
                123-4567
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-secondary flex-shrink-0" /> Tech City,
                TC 90210
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} PhoneTone. All rights reserved.
            Built with Next.js & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
