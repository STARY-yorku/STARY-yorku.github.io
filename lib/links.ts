import { emails, siteConfig } from "@/content/site";

/** Where "Become a member" buttons go: the form if configured, otherwise the Join page's registration section. */
export const membershipHref = siteConfig.links.membershipFormUrl ?? "/join#register";

export function contactHref(type?: "general" | "membership" | "sponsorship" | "collaboration") {
  return type ? `/contact?type=${type}#contact-form` : "/contact#contact-form";
}

export function mailto(address: string | null, subject?: string) {
  if (!address) return null;
  return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
}

export { emails };
