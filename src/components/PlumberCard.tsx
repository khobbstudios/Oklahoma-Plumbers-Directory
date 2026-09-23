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
      className="reveal flex h-full flex-col items-center justify-center gap-5 px-4 py-8 text-center"
      style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
    >
      <span className="text-xl font-bold text-accent sm:text-2xl">
        {plumber.name}
      </span>
      <a
        href={`tel:${plumber.phoneE164}`}
        aria-label={`Call ${plumber.name} at ${display}`}
        className="call-pill inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call
      </a>
    </li>
  );
}
