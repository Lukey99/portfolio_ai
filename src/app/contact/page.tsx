import { ContactSection } from '@/components/organisms';
import { portfolioData } from '@/lib/mock-data';

export const metadata = {
  title: 'Contact — Kévin Nguyen',
  description: 'Contactez Kévin Nguyen, développeur front-end React / Vue / TypeScript.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '4rem' }}>
      <ContactSection info={portfolioData.personalInfo} />
    </div>
  );
}
