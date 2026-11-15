import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="text-subtle">{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-cyan/60" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center [&_.eyebrow]:justify-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl"
      >
        {title}
      </Tag>
      {description && (
        <div className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">{description}</div>
      )}
    </Reveal>
  );
}
