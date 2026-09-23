import { Phone } from "lucide-react";
import { formatPhoneNumber } from "@/lib/phone";
import type { Plumber } from "@/data/plumbers";

type PlumberCardProps = {
  plumber: Plumber;
  index: number;
};

export function PlumberCard({ plumber, index }: PlumberCardProps) {
  const display = formatPhoneNumber(plumber.phoneE164);

  return (
    <li
      className="reveal flex h-full flex-col items-center justify-center gap-3 px-1 py-5 text-center sm:gap-5 sm:px-4 sm:py-8"
      style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
    >
      <span className="text-base font-bold leading-tight text-accent sm:text-xl md:text-2xl">
        {plumber.name}
      </span>
      <a
        href={`tel:${plumber.phoneE164}`}
        aria-label={`Call ${plumber.name} at ${display}`}
        className="call-pill inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-xs font-bold text-white transition-colors duration-200 hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
      >
        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        Call
      </a>
    </li>
  );
}
