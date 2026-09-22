import { MapPin, Phone } from "lucide-react";
import { formatPhoneNumber } from "@/lib/phone";
import { formatHoursSummary } from "@/lib/hours";
import { buildMapsUrl } from "@/lib/maps";
import { OpenStatusBadge } from "@/components/OpenStatusBadge";
import type { Plumber } from "@/data/plumbers";

type PlumberCardProps = {
  plumber: Plumber;
  index: number;
};

export function PlumberCard({ plumber, index }: PlumberCardProps) {
  const display = formatPhoneNumber(plumber.phoneE164);
  const mapsUrl = buildMapsUrl(plumber.mapsQuery ?? `${plumber.name}, ${plumber.address}`);

  return (
    <li
      className="reveal h-full"
      style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
    >
      <div className="plumber-card flex h-full min-h-[64px] flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${plumber.name}'s location in Google Maps`}
            className="address-link inline-flex items-start gap-1.5 rounded-md text-sm font-medium text-muted transition-colors duration-200 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{plumber.address}</span>
          </a>
          <OpenStatusBadge hours={plumber.hours} />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-lg font-bold text-accent sm:text-xl">
            {plumber.name}
          </span>
          <span className="text-base font-medium text-muted sm:text-lg">
            {display}
          </span>
          <span className="mt-1 text-sm font-medium text-muted/70">
            {formatHoursSummary(plumber.hours)}
          </span>
        </div>
        <a
          href={`tel:${plumber.phoneE164}`}
          aria-label={`Call ${plumber.name} at ${display}`}
          className="call-pill inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
      </div>
    </li>
  );
}
