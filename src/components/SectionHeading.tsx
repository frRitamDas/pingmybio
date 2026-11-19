export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{eyebrow}</p>}
      <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-6xl">{title}</h2>
      {body && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{body}</p>}
    </div>
  );
}
