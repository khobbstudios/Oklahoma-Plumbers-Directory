/** Google Maps search link — resolves via live place search rather than a raw geocode, so it still works for approximate addresses. */
export function buildMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
