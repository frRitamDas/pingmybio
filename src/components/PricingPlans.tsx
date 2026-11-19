import { useState } from 'react';
import { CHECKOUT_URL, PLANS, SIGNUP_URL, type Plan } from '../data/site';
import { Check } from './Icons';

export default function PricingPlans({ compact = false }: { compact?: boolean }) {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-black/10 bg-white p-1" role="group" aria-label="Billing period">
          {(['Monthly', 'Yearly'] as const).map((label) => {
            const active = (label === 'Yearly') === yearly;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => setYearly(label === 'Yearly')}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
                {label === 'Yearly' && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${active ? 'bg-white/20 text-white' : 'bg-black/5 text-ink'}`}>
                    Save 17%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`mt-12 grid gap-6 md:grid-cols-3 ${compact ? '' : ''}`}>
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} yearly={yearly} />
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
        One AI reply is one reply your assistant gives a visitor on your page. Brand research for collaborations doesn’t use
        your AI replies. Prices are in USD.
      </p>
    </div>
  );
}

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const href =
    plan.id === 'free' ? SIGNUP_URL : CHECKOUT_URL(plan.id, yearly ? 'year' : 'month');
  const priceText = price === 0 ? '$0' : `$${Number.isInteger(price) ? price : price.toFixed(2)}`;

  return (
    <article
      className={`glass relative flex flex-col rounded-3xl p-8 ${plan.recommended ? 'ring-2 ring-ink' : ''}`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-xs font-medium text-white">
          Recommended
        </span>
      )}
      <h3 className="font-display text-3xl text-ink">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted">{plan.tagline}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-6xl leading-none tracking-tight text-ink">{priceText}</span>
        <span className="text-sm text-muted">{plan.id === 'free' ? 'forever' : '/ month'}</span>
      </div>
      <p className="mt-2 h-5 text-xs text-muted">
        {yearly && plan.yearlyTotal ? `Billed yearly at $${plan.yearlyTotal}/yr` : plan.id === 'free' ? '' : 'Billed monthly'}
      </p>

      <a
        href={href}
        className={`mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.02] ${
          plan.recommended ? 'bg-ink text-white' : 'border border-black/15 text-ink hover:border-black'
        }`}
      >
        Get Started
      </a>

      <ul className="mt-8 space-y-3 text-sm text-ink">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3">
            <Check className="mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
