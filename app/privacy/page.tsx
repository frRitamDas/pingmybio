import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/legal-shell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PingMyBio collects, uses, and protects information — for sellers, buyers, and visitors. Transparency, not legalese.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: `${SITE.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      crumb="Privacy"
      title="Privacy Policy"
      updated="October 28, 2026"
      lede="How PingMyBio collects, uses, and protects information — for sellers, buyers, and visitors."
    >
      <p>
        PingMyBio (“PingMyBio,” “we,” “us,” or “our”) operates pingmybio.com and
        related applications that provide an AI link-in-bio / creator
        storefront — product listings, bookings, courses, checkout, and seller
        tools (the “Service”). It is for transparency, including for
        third-party sign-in providers such as Google, and is not legal advice.
      </p>

      <h2>1. Who this policy covers</h2>
      <ul>
        <li>
          <strong>Sellers</strong> — creators and businesses who create
          accounts, configure storefronts, and list products or services.
        </li>
        <li>
          <strong>Buyers</strong> — people who browse public storefronts,
          purchase, book, or chat with a store’s assistant.
        </li>
        <li>
          <strong>Visitors</strong> — people who view our marketing site or
          public storefronts without signing in.
        </li>
      </ul>

      <h2>2. Information we collect</h2>
      <h3>2.1 Account and profile</h3>
      <p>
        Email address, authentication data (including Google Sign-In), store
        name, handle/username, bio, avatar, social links, and branding you
        choose to provide. Authentication is provided through our
        infrastructure partner, Supabase; Google shares basic profile
        information per your Google account permissions and Google’s privacy
        policy.
      </p>
      <h3>2.2 Store, product, and commerce data</h3>
      <p>
        Sellers may upload product titles, descriptions, prices, images, FAQs,
        and booking settings. Buyers may provide name, email, and order notes
        needed to complete a purchase, delivery, or booking.
      </p>
      <h3>2.3 AI chat data</h3>
      <p>
        On AI storefronts, buyers may message an assistant grounded in
        seller-provided listings and FAQs. We store chat messages and session
        identifiers to deliver the conversation, maintain reliability and
        security, and — where available — help sellers understand buyer
        questions. Don’t submit sensitive personal data you don’t want
        processed for these purposes.
      </p>
      <h3>2.4 Usage and technical data</h3>
      <p>
        Pages and storefronts viewed, product interactions (opening a product,
        starting checkout), device and browser type, and a one-way hash of IP
        mixed with browser details — not the raw IP.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>Provide and secure the Service — auth, pages, checkout, bookings, chat.</li>
        <li>Operate seller tools — analytics, inbox, collab briefs, assistant training.</li>
        <li>
          Communicate — receipts, Inbox alerts, security notices, and (with
          consent) product updates.
        </li>
        <li>Comply with law and enforce our Terms.</li>
      </ul>
      <p>
        We do not sell personal information, and we do not place third-party
        advertising trackers on public storefronts.
      </p>

      <h2>4. How we share</h2>
      <ul>
        <li>
          <strong>Infrastructure</strong> — hosting, auth, email, and payment
          processors under contract (for example, Supabase and Stripe-class
          providers).
        </li>
        <li>
          <strong>Sellers</strong> — buyers interact with a seller’s
          storefront; sellers receive the details needed to fulfill orders and
          answer requests.
        </li>
        <li>
          <strong>Legal</strong> — when required by law, or to protect rights,
          safety, and integrity of the Service.
        </li>
        <li>
          <strong>In connection with a business transfer</strong> — merger,
          acquisition, or asset sale, with notice where required.
        </li>
      </ul>

      <h2>5. Retention and security</h2>
      <p>
        We keep information as long as your account is active or as needed to
        provide the Service, resolve disputes, and meet legal obligations. We
        use encryption in transit, access controls, and least-privilege
        practices. No system is perfectly secure; report concerns to{" "}
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>.
      </p>

      <h2>6. Your choices and rights</h2>
      <ul>
        <li>
          Access, correct, export, or delete your account data from settings,
          or by writing to us.
        </li>
        <li>
          Object to or restrict certain processing where the law (GDPR/UK
          DPA/CCPA-style rights) applies.
        </li>
        <li>Unsubscribe from marketing email via the footer link in any message.</li>
        <li>Buyers: contact the seller for order data; contact us for platform data.</li>
      </ul>

      <h2>7. Cookies</h2>
      <p>
        We use a minimal set of strictly necessary cookies for session and
        security. No cross-site ad cookies. If we add optional analytics
        cookies, we’ll ask first.
      </p>

      <h2>8. Children</h2>
      <p>
        The Service is not directed at children under 13 (or the higher age of
        digital consent where you live). We don’t knowingly collect their
        data; contact us and we’ll delete it.
      </p>

      <h2>9. International transfers</h2>
      <p>
        We process data in the regions where our infrastructure providers
        operate. Where data leaves your region, we rely on appropriate
        safeguards (for example, standard contractual clauses).
      </p>

      <h2>10. Changes</h2>
      <p>
        We’ll post updates here and, for material changes, notify sellers by
        email or in-app notice before they take effect.
      </p>

      <h2>11. Contact</h2>
      <p>
        PingMyBio — <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>.
        For security reports:{" "}
        <a href={`mailto:${SITE.securityEmail}`}>{SITE.securityEmail}</a>.
      </p>
      <p className="text-sm text-muted-foreground">
        See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalShell>
  );
}
