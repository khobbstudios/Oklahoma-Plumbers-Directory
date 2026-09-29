/** Google Maps search link — resolves via live place search rather than a raw geocode, so it still works for approximate addresses. */
export function buildGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Apple Maps search link — opens the Maps app on iOS/macOS, falls back to a web preview elsewhere. */
export function buildAppleMapsUrl(query: string): string {
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
}
