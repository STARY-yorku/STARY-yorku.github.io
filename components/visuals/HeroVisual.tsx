"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { SatelliteSchematic } from "./SatelliteSchematic";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function canUse3D() {
  if (typeof window === "undefined") return false;
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (!wide || reduce || saveData) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero artwork. Everyone gets the lightweight SVG schematic first; capable
 * desktop browsers without a reduced-motion preference upgrade to the 3D scene.
 */
export function HeroVisual({ className }: { className?: string }) {
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    // Decided after mount so server and client markup always match.
    const id = requestAnimationFrame(() => setUse3D(canUse3D()));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
          use3D && ready ? "opacity-0" : "opacity-100",
        )}
      >
        <SatelliteSchematic id="hero-sch" titleBlock={false} className="max-h-full" />
      </div>
      {use3D && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          role="img"
          aria-label="Rotating 3D concept of a servicing spacecraft using a robotic arm to approach a client satellite"
        >
          <HeroScene onReady={handleReady} />
        </div>
      )}
      <p className="absolute bottom-0 right-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-subtle">
        Concept visualization · not flight hardware
      </p>
    </div>
  );
}
