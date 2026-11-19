import PageMeta from '../components/PageMeta';
import SectionHeading from '../components/SectionHeading';
import { CONTACT_EMAIL, SIGNUP_URL } from '../data/site';
import { Mail } from '../components/Icons';

export default function Contact() {
  return (
    <>
      <PageMeta title="Reach Us · PingMyBio" description="Contact PingMyBio for support, partnerships, or questions about your page." />
      <section className="px-6 pb-28 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Reach Us" title="We’d love to hear from you" body="Questions about your page, billing, or partnerships? Send us an email and we’ll reply from our inbox." />
          <div className="glass mt-14 flex flex-col items-start gap-6 rounded-3xl p-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                <Mail />
              </span>
              <div>
                <p className="text-sm text-muted">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-display text-2xl text-ink hover:opacity-70">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <a href={SIGNUP_URL} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]">
              Create My Page
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
