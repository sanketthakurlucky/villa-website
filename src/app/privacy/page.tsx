import { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | SEASALT Hospitality',
  description: 'Learn how SEASALT Hospitality collects, uses, and protects your personal information when you book villas and use our concierge services.',
};

export default function PrivacyPage() {
  return <LegalPageClient type="privacy" />;
}