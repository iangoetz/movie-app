"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/watchlist", label: "Watchlist", icon: "⊕" },
  { href: "/discover", label: "Discover", icon: "◇" },
  { href: "/profile", label: "Profile", icon: "○" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-[#121214] border-t border-white/10 z-50"
      role="navigation"
    >
      <div className="flex justify-around items-center h-16 min-h-[44px] safe-area-bottom">
        {navItems.map(({ href, label, icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-0 text-sm ${
                isActive ? "text-white font-medium" : "text-white/50"
              }`}
            >
              <span className="text-lg leading-none" aria-hidden>
                {icon}
              </span>
              <span className="mt-0.5 truncate max-w-full">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
