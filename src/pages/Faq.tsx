import PageMeta from '../components/PageMeta';
import SectionHeading from '../components/SectionHeading';
import FaqList from '../components/FaqList';
import CtaBanner from '../components/CtaBanner';
import { FAQS } from '../data/site';

export default function Faq() {
  return (
    <>
      <PageMeta title="FAQ · PingMyBio" description="Answers to common questions about PingMyBio, the AI assistant, AI replies, offers, bookings and brand collaborations." />
      <section className="px-6 pb-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" body="Short answers about signing up, the assistant, pricing and brands." />
          <div className="mt-14">
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>
      <CtaBanner title="Still have a question?" body="Email us at info@pingmybio.com, or create your page and see how it works." />
    </>
  );
}
