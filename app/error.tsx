"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/ui/Section";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center pt-24">
      <Container className="text-center">
        <p className="eyebrow">Anomaly detected</p>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Something went wrong.</h1>
        <p className="mx-auto mt-5 max-w-md text-muted">An unexpected error occurred while loading this page.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="h-12 rounded-full bg-gradient-to-b from-accent-strong to-accent-deep px-7 font-medium text-white"
          >
            Try again
          </button>
          <Link href="/" className="flex h-12 items-center rounded-full border border-white/15 px-7 text-ink hover:border-cyan/60">
            Return home
          </Link>
        </div>
      </Container>
    </section>
  );
}
