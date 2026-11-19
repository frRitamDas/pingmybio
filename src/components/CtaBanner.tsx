import { SIGNUP_URL } from '../data/site';

export default function CtaBanner({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="px-6 py-24">
      <div className="glass mx-auto max-w-5xl rounded-[2rem] px-8 py-20 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{body}</p>
        <a
          href={SIGNUP_URL}
          className="mt-10 inline-block rounded-full bg-ink px-10 py-4 text-base font-medium text-white transition-transform hover:scale-[1.03]"
        >
          Create My Page
        </a>
        <p className="mt-4 text-sm text-muted">Free to start</p>
      </div>
    </section>
  );
}
