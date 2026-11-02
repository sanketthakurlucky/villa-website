import { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Terms of Service | SEASALT Hospitality',
  description: 'Read our terms and conditions for booking, staying, and using SEASALT Hospitality\'s villa curation and concierge services.',
};

export default function TermsPage() {
  return <LegalPageClient type="terms" />;
}