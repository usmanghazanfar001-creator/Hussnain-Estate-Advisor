"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, wire this up to your monitoring provider of choice.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-sand-50 px-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-600">
        Something went wrong
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        We hit a snag loading this page
      </h1>
      <p className="max-w-md text-sm text-ink-700/80">
        Please try again, or reach us directly on WhatsApp or by phone if the
        problem continues.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-ink-900/15 px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-gold-500"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
