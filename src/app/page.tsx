import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

      <header className="relative overflow-hidden px-6 pb-16 pt-8 text-center sm:pb-20 sm:pt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-br from-primary/40 via-accent/15 to-transparent blur-3xl"
        />
        <div className="flex justify-center">
          <Link
            href="/classic"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-accent shadow-sm transition-colors duration-200 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Full Directory
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <h1 className="mx-auto mt-8 flex max-w-4xl flex-col items-center tracking-tight text-accent sm:mt-10">
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
      </header>

      <main className="flex-1 px-4 pb-24 sm:px-6">
        <ul className="mx-auto grid max-w-5xl grid-cols-3 gap-x-2 gap-y-6 sm:gap-x-5 sm:gap-y-8">
          {plumbers.map((plumber, index) => (
            <PlumberCard key={plumber.id} plumber={plumber} index={index} />
          ))}
        </ul>
      </main>

      <footer className="px-6 py-10 text-center">
        <p className="text-sm font-medium text-muted">
          Claremore, Oklahoma · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
