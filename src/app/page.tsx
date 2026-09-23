import { plumbers } from "@/data/plumbers";
import { PlumberCard } from "@/components/PlumberCard";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": plumbers.map((plumber) => ({
      "@type": "Plumber",
      name: plumber.name,
      telephone: plumber.phoneE164,
      address: {
        "@type": "PostalAddress",
        ...(plumber.mapsQuery ? {} : { streetAddress: plumber.address }),
        addressLocality: "Claremore, OK",
        addressRegion: "OK",
        addressCountry: "US",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pb-20 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-br from-primary/40 via-accent/15 to-transparent blur-3xl"
        />
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent sm:text-base">
          Claremore, Oklahoma
        </p>
        <h1 className="mx-auto mt-4 flex max-w-4xl flex-col items-center tracking-tight text-accent">
          <span className="text-[clamp(2.75rem,9vw,5.5rem)] font-bold leading-[0.95]">
            Plumbers
          </span>
          <span className="text-[clamp(1.1rem,3vw,1.75rem)] font-bold uppercase leading-none text-black">
            in
          </span>
          <span className="text-[clamp(2.75rem,9vw,5.5rem)] font-bold leading-[0.95]">
            Claremore
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base font-medium text-muted sm:text-lg">
          Trusted local plumbers — tap to call.
        </p>
      </header>

      <main className="flex-1 px-6 pb-24">
        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {plumbers.map((plumber, index) => (
            <PlumberCard key={plumber.id} plumber={plumber} index={index} />
          ))}
        </ul>
      </main>

      <footer className="px-6 py-10 text-center">
        <p className="text-sm font-medium text-muted">
          Claremore, Oklahoma · {new Date().getFullYear()}
        </p>
        <p className="mt-1 text-xs text-muted/60">
          Hours are sourced from public listings and may vary — please call to confirm.
        </p>
      </footer>
    </>
  );
}
