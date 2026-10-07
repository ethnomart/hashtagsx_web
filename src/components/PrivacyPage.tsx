import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { sound } from '../utils/sound';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="font-heading text-xl font-black mb-3">{title}</h2>
    <div className="space-y-3 text-sm sm:text-base leading-relaxed text-black/75 dark:text-cream/75">{children}</div>
  </section>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-1.5">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

export const PrivacyPage: React.FC = () => {
  const { setActiveProductModal } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
    document.title = 'Privacy Policy | HASHTAGSX';
    return () => {
      document.title = 'HASHTAGSX® Store — Signature Apparel Collection';
    };
  }, []);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-14">
      <button
        onClick={() => {
          sound.playClick();
          setActiveProductModal(null);
        }}
        className="flex items-center gap-1.5 text-xs font-mono opacity-70 hover:text-[#eb3324] hover:opacity-100 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to shop</span>
      </button>

      <h1 className="font-heading text-3xl sm:text-5xl font-black mb-2">Privacy Policy</h1>
      <p className="text-xs font-mono opacity-60 mb-10">Last updated: 7 October 2026</p>

      <Section title="Who we are">
        <p>
          HASHTAGSX is an online clothing and fragrance store that delivers across Pakistan. This policy explains what
          personal information we collect when you use this website, how we use it, and the choices you have.
        </p>
      </Section>

      <Section title="Information we collect">
        <p>When you place an order, we collect:</p>
        <List
          items={[
            'Your name and phone number',
            'Your email address (optional)',
            'Your delivery address and city',
            'Any notes you add to your order',
            'The items, sizes, colours and quantities you ordered',
          ]}
        />
        <p>
          When you write a review, we collect your order number, the phone number used for that order (only to check the
          order is yours), your star rating and your comment.
        </p>
        <p>
          We do not collect card or bank details. Orders are paid in cash on delivery, so no payment information is
          entered on this website.
        </p>
      </Section>

      <Section title="How we use your information">
        <List
          items={[
            'To process, confirm and deliver your order, and to contact you about it',
            'To confirm that a review comes from a real customer',
            'To keep records of our sales and to meet legal obligations',
            'To improve our products and this website',
          ]}
        />
      </Section>

      <Section title="Reviews">
        <p>
          Reviews are checked and approved by us before they appear. A published review shows your first name, the
          initial of your last name, your city, your rating and your comment. Your order number and phone number are never
          shown publicly.
        </p>
      </Section>

      <Section title="Who we share it with">
        <p>We do not sell your personal information. We share it only where needed to run the store:</p>
        <List
          items={[
            'Delivery partners receive your name, phone number and address so they can deliver your order',
            'Our website hosting and database providers store and process the information on our behalf',
            'Authorities, where we are legally required to share it',
          ]}
        />
      </Section>

      <Section title="Cookies and local storage">
        <p>
          We do not use advertising or tracking cookies. Your browser stores a small amount of data on your own device
          so the website can remember your bag and your light or dark mode choice. You can clear this at any time in
          your browser settings.
        </p>
        <p>
          Our hosting providers may keep standard server logs, such as your IP address and browser type, for security and
          reliability.
        </p>
      </Section>

      <Section title="How we protect and keep your information">
        <p>
          Order information is stored in a protected database, and only we can access it with a password. No online
          system is completely secure, but we take reasonable steps to protect your information. We keep order records
          for as long as we need them for the business and for legal reasons, and then delete them.
        </p>
      </Section>

      <Section title="Your choices">
        <p>You can ask us to:</p>
        <List
          items={[
            'Show you the personal information we hold about you',
            'Correct information that is wrong',
            'Delete your information or remove a review you wrote, unless we must keep it by law',
          ]}
        />
        <p>
          To make a request, email us at <a href="mailto:haseeburrehman5124@gmail.com" className="underline text-[#eb3324]">haseeburrehman5124@gmail.com</a> or use the phone number or message channel we used to confirm your order, and we will help you.
        </p>
      </Section>

      <Section title="Children">
        <p>This website is not meant for children under 18, and we do not knowingly collect their information.</p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this policy from time to time. The date at the top shows when it was last changed. Please check
          it now and then.
        </p>
      </Section>
    </article>
  );
};
