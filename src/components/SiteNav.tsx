"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/classic", label: "More Info" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-surface px-6 py-5">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-10">
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-serif text-base font-bold tracking-tight text-accent sm:text-lg"
        >
          Claremore Plumbers
        </Link>
        <div className="flex items-center gap-5 sm:gap-6">
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap text-base font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg ${
                  isActive ? "text-accent" : "text-muted hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
