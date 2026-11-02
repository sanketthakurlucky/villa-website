import { Metadata } from 'next';
import HelpPageClient from './HelpPageClient';

export const metadata: Metadata = {
  title: 'Help Center | SEASALT Hospitality',
  description: 'Find answers to common questions about booking, stays, cancellations, payments, and more. Search our knowledge base or contact our concierge team.',
};

export default function HelpPage() {
  return <HelpPageClient />;
}