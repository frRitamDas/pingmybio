import PageMeta from '../components/PageMeta';
import PricingPlans from '../components/PricingPlans';
import SectionHeading from '../components/SectionHeading';
import FaqList from '../components/FaqList';
import CtaBanner from '../components/CtaBanner';
import { COMPARISON, FAQS } from '../data/site';

export default function Pricing() {
  return (
    <>
      <PageMeta title="Pricing · PingMyBio" description="Free, Starter at $12 a month, and Pro at $29 a month. Monthly or yearly billing. Free to start." />
      <section className="px-6 pb-16 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pricing"
            title="Plans that scale with your fans"
            body="AI assistant for fans and collab intake with brand research. Pay when your reply volume grows."
          />
          <div className="mt-14">
            <PricingPlans />
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-4xl tracking-tight md:text-5xl">Compare plans</h2>
          <div className="glass mt-12 overflow-x-auto rounded-3xl">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="px-6 py-5 font-medium text-muted">Feature</th>
                  <th className="px-6 py-5 font-medium text-ink">Free</th>
                  <th className="px-6 py-5 font-medium text-ink">Starter</th>
                  <th className="px-6 py-5 font-medium text-ink">Pro</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-black/5 last:border-0">
                    <td className="px-6 py-4 text-ink">{row.feature}</td>
                    <td className="px-6 py-4 text-muted">{row.free}</td>
                    <td className="px-6 py-4 text-muted">{row.starter}</td>
                    <td className="px-6 py-4 text-muted">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Billing questions" title="Pricing FAQ" />
          <div className="mt-14">
            <FaqList items={FAQS.filter((f) => ['What counts as an AI reply?', 'Is brand research part of the reply meter?', 'What happens when I hit the limit?', 'Can I switch plans later?', 'Do you put Google Analytics or ads on my page?'].includes(f.q))} />
          </div>
        </div>
      </section>

      <CtaBanner title="Start free. Upgrade when you're ready." body="Your Free plan includes 300 AI replies a month and up to 5 live offers." />
    </>
  );
}
