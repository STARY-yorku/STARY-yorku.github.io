import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { OrbitRings, Starfield } from "@/components/visuals/Backdrops";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <Starfield count={80} seed={404} />
      <OrbitRings className="left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <Container className="relative text-center">
        <p className="eyebrow">Error 404 · Signal lost</p>
        <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-7xl">Off-nominal trajectory.</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
