import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/legal-shell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The rules of the road for sellers, buyers, and visitors on PingMyBio — convos, fees, IP, and liability.",
  alternates: { canonical: "/terms" },
  openGraph: { url: `${SITE.url}/terms` },
};

export default function TermsPage() {
  return (
    <LegalShell
      crumb="Terms"
      title="Terms of Service"
      updated="October 13, 2026"
      lede="The rules of the road for sellers, buyers, and visitors on PingMyBio."
    >
      <p>
        These Terms of Service (“Terms”) govern access to and use of PingMyBio,
        including pingmybio.com, seller dashboards, Classic and AI storefronts,
        checkout, bookings, courses, and related features (the “Service”). By
        creating an account, signing in (including with Google), subscribing as
        a seller, listing products, or using the Service as a buyer, you agree
        to these Terms and our <Link href="/privacy">Privacy Policy</Link>.
        They are not legal advice.
      </p>

      <h2>1. The Service</h2>
      <p>
        PingMyBio is an AI link-in-bio / creator storefront platform. Sellers
        get one bio URL with a Classic storefront (tap-to-buy) and/or an AI
        storefront (chat-style guidance toward products, services, or
        bookings), and tools to sell digital products, goods, coaching,
        courses, and related offers. We may change, suspend, or discontinue
        features; we try to give reasonable notice for material changes.
        Early-access or promotional offers are described at signup and may
        change.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 (or the age of majority where you live) to use
        PingMyBio as a seller. Buyers must be old enough to form a binding
        contract where they live.
      </p>

      <h2>3. Accounts and sign-in</h2>
      <ul>
        <li>
          Provide accurate registration information and keep credentials and
          linked sign-in methods secure.
        </li>
        <li>
          You’re responsible for activity under your account. Notify us
          promptly of suspected unauthorized access at{" "}
          <a href={`mailto:${SITE.securityEmail}`}>{SITE.securityEmail}</a>.
        </li>
        <li>
          We may suspend or terminate accounts that violate these Terms or
          create risk for the platform or other users.
        </li>
      </ul>

      <h2>4. Seller responsibilities</h2>
      <ul>
        <li>
          You own your listings; you’re responsible for their accuracy,
          pricing, legality, fulfillment, and customer support.
        </li>
        <li>
          You must have the rights to everything you upload — images, copy,
          testimonials, client logos.
        </li>
        <li>Honor refunds, bookings, and delivery promises you publish on your storefront.</li>
        <li>Don’t use the Service for prohibited goods, deception, spam, or infringement.</li>
      </ul>

      <h2>5. Buyer terms</h2>
      <p>
        Purchases and bookings are made with the seller. PingMyBio provides
        the tooling and, where applicable, payment processing — but the seller
        is the merchant of record for their offers. Disputes about what was
        sold, delivered, or promised are between buyer and seller; we assist
        with platform-level facts (timestamps, receipts, logs) where lawful.
      </p>

      <h2>6. Fees, convos, and billing</h2>
      <ul>
        <li>
          Convos are metered as described on the pricing page; brand research
          is metered separately. Limits, tiers, and overage behavior are shown
          at signup and on <Link href="/pricing">/pricing</Link>.
        </li>
        <li>
          Paid plans renew until cancelled. You can upgrade, downgrade, or
          cancel anytime; prorated adjustments apply per the checkout flow.
        </li>
        <li>
          PingMyBio takes no percentage of your sales on current tiers.
          Third-party processor fees (e.g., card networks) may apply and are
          disclosed at checkout.
        </li>
      </ul>

      <h2>7. AI assistant</h2>
      <p>
        The assistant generates responses from seller-provided knowledge. It
        can be wrong. Sellers control what it says by curating Knowledge and
        FAQs, and remain responsible for their storefront’s claims. Don’t rely
        on the assistant for medical, legal, or financial advice — ours or
        theirs.
      </p>

      <h2>8. Acceptable use</h2>
      <p>
        No unlawful, infringing, deceptive, or abusive use; no scraping or
        overloading the platform; no attempting to extract model weights,
        bypass limits, or impersonate others. We may investigate and act on
        reports, including removal of content and suspension of accounts.
      </p>

      <h2>9. Intellectual property</h2>
      <p>
        PingMyBio owns the platform, brand, and software. Sellers keep their
        content; they grant us a license to host, display, and process it to
        operate the Service. Feedback you give us may be used to improve the
        product.
      </p>

      <h2>10. Disclaimers and liability</h2>
      <p>
        The Service is provided “as is” and “as available”, without warranties
        of merchantability, fitness, or non-infringement, to the fullest
        extent permitted by law. To the maximum extent lawful, PingMyBio’s
        aggregate liability for claims relating to the Service is limited to
        the amounts you paid us in the 12 months before the claim. We’re not
        liable for seller conduct, lost profits, or indirect damages.
      </p>

      <h2>11. Termination</h2>
      <p>
        You can stop using the Service anytime and delete your account. We may
        suspend or terminate access for violation of these Terms, risk, or
        legal requirement, with notice where practical. Sections that by
        nature survive (payment obligations, IP, disclaimers, liability
        limits) survive termination.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction where
        PingMyBio is established, without regard to conflict-of-law rules.
        Disputes will be resolved in its courts unless consumer law where you
        live requires otherwise.
      </p>

      <h2>13. Changes and contact</h2>
      <p>
        We may update these Terms; material changes will be notified in-app or
        by email. Questions:{" "}
        <a href={`mailto:${SITE.legalEmail}`}>{SITE.legalEmail}</a>.
      </p>
      <p className="text-sm text-muted-foreground">
        See also our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalShell>
  );
}
