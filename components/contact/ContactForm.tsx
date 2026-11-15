"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck, LoaderCircle, Mail, Send, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const inquiryTypes = [
  { value: "general", label: "General inquiry" },
  { value: "membership", label: "Membership question" },
  { value: "sponsorship", label: "Sponsorship or partnership" },
  { value: "collaboration", label: "Collaboration or research" },
] as const;

type InquiryType = (typeof inquiryTypes)[number]["value"];
type Status = "idle" | "submitting" | "success" | "error";

interface Values {
  name: string;
  email: string;
  type: InquiryType;
  message: string;
}
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!inquiryTypes.some((t) => t.value === v.type)) e.type = "Please choose an inquiry type.";
  if (v.message.trim().length < 10) e.message = "Please write a message of at least 10 characters.";
  if (v.message.length > 5000) e.message = "Please keep your message under 5,000 characters.";
  return e;
}

/**
 * Contact form. Submits JSON to a configurable endpoint (e.g. Formspree).
 * If no endpoint is configured it says so plainly and offers email; it never
 * pretends to have sent anything.
 */
export function ContactForm({ endpoint, fallbackEmail }: { endpoint: string | null; fallbackEmail: string | null }) {
  const id = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", type: "general", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  // Preselect the inquiry type from ?type=… (e.g. links from the Sponsors page).
  const typeParam = useSearchParams().get("type");
  const [appliedParam, setAppliedParam] = useState<string | null>(null);
  if (typeParam !== appliedParam) {
    setAppliedParam(typeParam);
    if (typeParam && inquiryTypes.some((x) => x.value === typeParam)) {
      setValues((v) => ({ ...v, type: typeParam as InquiryType }));
    }
  }

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const mailtoHref = fallbackEmail
    ? `mailto:${fallbackEmail}?subject=${encodeURIComponent(
        `[STARY website] ${inquiryTypes.find((t) => t.value === values.type)?.label ?? "Inquiry"}`,
      )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)}`
    : null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, type: true, message: true });
    if (Object.keys(errs).length > 0) {
      const first = (Object.keys(errs) as (keyof Values)[])[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    if (!endpoint) return;
    if (honeypot.current?.value) {
      // Bot filled the hidden field: quietly drop.
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          inquiryType: inquiryTypes.find((t) => t.value === values.type)?.label,
          message: values.message.trim(),
          _subject: `[STARY website] ${values.type} inquiry from ${values.name.trim()}`,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      setValues({ name: "", email: "", type: values.type, message: "" });
      setTouched({});
    } catch {
      setStatus("error");
      setServerError("Your message could not be sent. Please try again in a moment, or email us directly.");
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const field =
    "mt-2 w-full rounded-xl border bg-space-950/70 px-4 py-3 text-ink placeholder:text-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-cyan/40";
  const fieldState = (k: keyof Values) =>
    touched[k] && errors[k] ? "border-red-400/70" : "border-white/10 focus:border-cyan/60";

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="panel flex flex-col items-start p-8 sm:p-10">
        <CircleCheck aria-hidden="true" className="size-10 text-success" strokeWidth={1.5} />
        <h3 className="mt-5 font-display text-2xl font-semibold">Message sent.</h3>
        <p className="mt-2 text-muted">Thanks for reaching out. A member of the STARY team will reply by email.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-white/15 px-5 py-2.5 text-sm text-ink hover:border-cyan/60"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="panel p-6 sm:p-10" aria-describedby={!endpoint ? `${id}-notice` : undefined}>
      {!endpoint && (
        <div
          id={`${id}-notice`}
          className="mb-8 flex gap-3 rounded-xl border border-warning/35 bg-warning/[0.06] p-4 text-sm text-ink"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-warning" />
          <p>
            Online form submission is not connected yet.{" "}
            {fallbackEmail
              ? "You can still fill in the form and send it with your email app."
              : "Please check back soon, or reach out on the channels listed on this page."}
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink">
            Name <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? `${id}-name-err` : undefined}
            className={cn(field, fieldState("name"))}
          />
          {touched.name && errors.name && (
            <p id={`${id}-name-err`} className="mt-2 text-sm text-red-300">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink">
            Email <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? `${id}-email-err` : undefined}
            className={cn(field, fieldState("email"))}
          />
          {touched.email && errors.email && (
            <p id={`${id}-email-err`} className="mt-2 text-sm text-red-300">
              {errors.email}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-type`} className="text-sm font-medium text-ink">
            Inquiry type <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <select
            id={`${id}-type`}
            name="type"
            required
            value={values.type}
            onChange={(e) => update("type", e.target.value as InquiryType)}
            onBlur={() => blur("type")}
            className={cn(field, fieldState("type"), "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A4B2C6' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value} className="bg-space-900">
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink">
            Message <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={6}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={touched.message && errors.message ? `${id}-message-err` : undefined}
            className={cn(field, fieldState("message"), "resize-y")}
          />
          {touched.message && errors.message && (
            <p id={`${id}-message-err`} className="mt-2 text-sm text-red-300">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input ref={honeypot} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && serverError && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-xl border border-red-400/40 bg-red-400/[0.07] p-4 text-sm text-red-200"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {serverError}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {endpoint ? (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-b from-accent-strong to-accent-deep px-7 font-medium text-white shadow-[0_0_0_1px_rgb(59_130_246/0.5)] transition-all hover:from-accent hover:to-accent-strong disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send aria-hidden="true" className="size-4" /> Send message
              </>
            )}
          </button>
        ) : mailtoHref ? (
          <button
            type="button"
            onClick={() => {
              const errs = validate(values);
              setErrors(errs);
              setTouched({ name: true, email: true, type: true, message: true });
              if (Object.keys(errs).length === 0) window.location.href = mailtoHref;
            }}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-gradient-to-b from-accent-strong to-accent-deep px-7 font-medium text-white"
          >
            <Mail aria-hidden="true" className="size-4" /> Open in my email app
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-12 cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-white/20 px-7 text-subtle"
          >
            Form not yet connected
          </button>
        )}
        {fallbackEmail && endpoint && (
          <p className="text-sm text-subtle">
            Or email{" "}
            <a href={`mailto:${fallbackEmail}`} className="text-muted underline-offset-4 hover:text-ink hover:underline">
              {fallbackEmail}
            </a>
          </p>
        )}
      </div>
      <p className="mt-6 text-xs text-subtle">
        We only use your details to reply to your message.
      </p>
    </form>
  );
}
