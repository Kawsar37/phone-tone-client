"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  links: SidebarLink[];
  title: string;
}

export function Sidebar({ links, title }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm sticky top-24">
        <h2 className="text-lg font-bold text-neutral mb-4">{title}</h2>
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-neutral/70 hover:bg-bg-light hover:text-neutral"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
