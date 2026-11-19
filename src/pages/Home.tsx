import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import PricingPlans from '../components/PricingPlans';
import FaqList from '../components/FaqList';
import CtaBanner from '../components/CtaBanner';
import PageMeta from '../components/PageMeta';
import { ArrowUpRight, Calendar, Chat, Inbox, Link as LinkIcon, Share, Spark } from '../components/Icons';
import { FAQS, FEATURES, HOW_IT_WORKS } from '../data/site';

const featureIcons = [Spark, Calendar, Chat, Inbox];
const stepIcons = [LinkIcon, Spark, Share];

export default function Home() {
  return (
    <>
      <PageMeta
        title="PingMyBio — Turn your bio into an AI-powered storefront"
        description="PingMyBio turns your link in bio into an AI-powered storefront. Answer fan questions, share offers and bookings, and let brands reach you. Free to start."
      />
      <Hero />

      {/* Trust facts (no invented reviews or ratings) */}
      <section className="border-y border-black/10 px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 text-center md:grid-cols-4">
          {[
            ['Free to start', 'Launch on the Free plan today'],
            ['No ads on your page', 'No Google Analytics or ad pixels'],
            ['Change plans anytime', 'Upgrade or cancel under Billing'],
            ['Your info, your answers', 'Replies come from what you add'],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-display text-2xl text-ink">{t}</p>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="How it works" title="Live in three simple steps" body="Set it up once, then share one link everywhere you post." />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <article key={step.step} className="glass rounded-3xl p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                      <Icon />
                    </span>
                    <span className="font-display text-2xl text-muted">{step.step}</span>
                  </div>
                  <h3 className="mt-8 font-display text-3xl text-ink">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-black/[0.02] px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Key features" title="Everything your link needs to do the work" body="Answer fans, sell your offers, and keep brand deals in one place." />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {FEATURES.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <article key={f.title} className="glass rounded-3xl p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 text-ink">
                    <Icon />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-ink">{f.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.body}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link to="/features" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:opacity-70">
              See all features <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Pricing" title="Simple plans that grow with you" body="Start free. Upgrade when your fan replies grow." />
          <div className="mt-14">
            <PricingPlans />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-14">
            <FaqList items={FAQS.slice(0, 5)} />
          </div>
          <div className="mt-10 text-center">
            <Link to="/faq" className="text-sm font-medium text-ink underline underline-offset-4 hover:opacity-70">
              Read all questions
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title="One link to answer questions, connect with fans, and grow your creator business."
        body="Claim your link, teach your assistant what fans ask most, and start sharing today."
      />
    </>
  );
}
