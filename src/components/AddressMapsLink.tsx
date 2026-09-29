"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { buildAppleMapsUrl, buildGoogleMapsUrl } from "@/lib/maps";
import { isApplePlatform } from "@/lib/platform";

type AddressMapsLinkProps = {
  name: string;
  address: string;
  mapsQuery: string;
};

export function AddressMapsLink({ name, address, mapsQuery }: AddressMapsLinkProps) {
  // Defaults to Google Maps for the initial (server-rendered) markup, then
  // swaps to Apple Maps after mount if the visitor is on an Apple device —
  // there's no way to know the visitor's platform at static-build time.
  const [href, setHref] = useState(() => buildGoogleMapsUrl(mapsQuery));

  useEffect(() => {
    const update = () => {
      setHref(isApplePlatform() ? buildAppleMapsUrl(mapsQuery) : buildGoogleMapsUrl(mapsQuery));
    };
    update();
  }, [mapsQuery]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name}'s location in Maps`}
      className="inline-flex items-start gap-1 rounded-md text-xs font-medium text-muted transition-colors duration-200 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-1.5 sm:text-sm"
    >
      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
      <span>{address}</span>
    </a>
  );
}
