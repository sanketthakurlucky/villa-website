import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact SEASALT Hospitality | Book Your Villa',
  description: 'Contact our concierge team for personalized villa recommendations, booking assistance, and special requests. We\'re here 24/7 to help plan your perfect escape.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}