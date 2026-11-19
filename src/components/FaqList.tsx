import { useState } from 'react';
import { Plus } from './Icons';

export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-black/10 border-y border-black/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="text-base font-medium text-ink md:text-lg">{item.q}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 transition-transform duration-300 ${
                  isOpen ? 'rotate-45 bg-ink text-white' : 'text-ink'
                }`}
              >
                <Plus />
              </span>
            </button>
            {isOpen && <p className="animate-fade-rise pb-6 pr-12 text-[15px] leading-relaxed text-muted">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
