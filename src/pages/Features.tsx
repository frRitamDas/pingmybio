import PageMeta from '../components/PageMeta';
import SectionHeading from '../components/SectionHeading';
import CtaBanner from '../components/CtaBanner';
import { Calendar, Chat, Inbox, Spark } from '../components/Icons';
import { FEATURES } from '../data/site';

const icons = [Spark, Calendar, Chat, Inbox];

export default function Features() {
  return (
    <>
      <PageMeta title="Features · PingMyBio" description="AI assistant, offers and bookings, messages and collaborations, and an inbox with analytics, in one bio link." />
      <section className="px-6 pb-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Features"
            title="One link that answers, sells, and handles collabs"
            body="PingMyBio gives your bio page an assistant, your offers, and an inbox, so fans get answers and brands get a clear way to reach you."
          />
        </div>
      </section>
      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {FEATURES.map((f, i) => {
            const Icon = icons[i];
            return (
              <article key={f.title} className="glass rounded-3xl p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                  <Icon />
                </span>
                <h2 className="mt-8 font-display text-4xl text-ink">{f.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{f.body}</p>
                <ul className="mt-8 space-y-3 text-sm text-ink">
                  {f.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBanner title="Start your storefront today." body="Create your page, add what fans ask most, and share one link." />
    </>
  );
}
