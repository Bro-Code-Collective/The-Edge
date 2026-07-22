"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/store/cart";

type IconVariant = { black: string; white: string };

export const BottomNav = () => {
  const count = useCart((s) => s.count());
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks: {
    href: string;
    label: string;
    badge?: boolean;
    active: IconVariant;
    inactive: IconVariant;
  }[] = [
    {
      href: "/",
      label: "Home",
      active: { black: "/icons/home-filled-black.svg", white: "/icons/home-filled-white.svg" },
      inactive: { black: "/icons/home-line-black.svg", white: "/icons/home-line-white.svg" },
    },
    {
      href: "/browse",
      label: "Browse",
      active: { black: "/icons/search-filled-black.svg", white: "/icons/search-filled-white.svg" },
      inactive: { black: "/icons/search-line-black.svg", white: "/icons/search-line-white.svg" },
    },
    {
      href: "/cart",
      label: "Cart",
      badge: true,
      active: { black: "/icons/cart-solid-black.svg", white: "/icons/cart-solid-white.svg" },
      inactive: { black: "/icons/cart-new-black.svg", white: "/icons/cart-new-white.svg" },
    },
    {
      href: "/profile",
      label: "Profile",
      active: { black: "/images/profile-black.svg", white: "/images/profile-white.svg" },
      inactive: { black: "/icons/profile-line-black.svg", white: "/icons/profile-line-white.svg" },
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
    >
      <div className="flex items-center justify-evenly h-16 w-full px-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const icon = isActive ? link.active : link.inactive;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className="relative flex items-center justify-center w-full h-full transition-smooth active:scale-95"
            >
              <div className="relative">
                <div className="relative w-7 h-7 transition-all">
                  <img src={icon.black} alt={link.label} className="w-full h-full dark:hidden object-contain" loading="eager" decoding="sync" />
                  <img src={icon.white} alt={link.label} className="hidden w-full h-full dark:block object-contain" loading="eager" decoding="sync" />
                </div>
                {link.badge && mounted && count > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground animate-scale-in">
                    {count}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
