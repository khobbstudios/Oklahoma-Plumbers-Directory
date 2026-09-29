import { Phone } from "lucide-react";
import { formatPhoneNumber } from "@/lib/phone";
import { formatHoursSummary } from "@/lib/hours";
import { OpenStatusBadge } from "@/components/OpenStatusBadge";
import { AddressMapsLink } from "@/components/AddressMapsLink";
import type { Plumber } from "@/data/plumbers";

type PlumberCardClassicProps = {
  plumber: Plumber;
  index: number;
};

export function PlumberCardClassic({ plumber, index }: PlumberCardClassicProps) {
  const display = formatPhoneNumber(plumber.phoneE164);
  const mapsQuery = plumber.mapsQuery ?? `${plumber.name}, ${plumber.address}`;

  return (
    <li
      className="reveal h-full"
      style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
    >
      <div className="plumber-card-box flex h-full min-h-[64px] flex-col gap-3 rounded-2xl border border-border bg-surface p-3 sm:gap-6 sm:p-7">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
          <AddressMapsLink name={plumber.name} address={plumber.address} mapsQuery={mapsQuery} />
          <OpenStatusBadge hours={plumber.hours} />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-serif text-base font-bold text-accent sm:text-xl">
            {plumber.name}
          </span>
          <span className="text-sm font-medium text-muted sm:text-lg">
            {display}
          </span>
          <span className="mt-1 text-xs font-medium text-muted/70 sm:text-sm">
            {formatHoursSummary(plumber.hours)}
          </span>
        </div>
        <a
          href={`tel:${plumber.phoneE164}`}
          aria-label={`Call ${plumber.name} at ${display}`}
          className="call-pill inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-2.5 text-xs font-bold text-white transition-colors duration-200 hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
        >
          <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          Call
        </a>
      </div>
    </li>
  );
}
