import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-sand-50 px-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-600">404</p>
      <h1 className="font-display text-3xl font-semibold text-ink-900 md:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="max-w-md text-sm text-ink-700/80">
        The page you&apos;re looking for may have moved. Try heading back to the
        homepage, or jump straight to our listings.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-700"
        >
          Back to home
        </Link>
        <Link
          href="/#properties"
          className="rounded-full border border-ink-900/15 px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-gold-500"
        >
          View properties
        </Link>
      </div>
    </div>
  );
}

