import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About SEASALT Hospitality | Our Story & Mission',
  description: 'Discover the story behind SEASALT Hospitality—curating India\'s finest luxury villas with personalized service, authentic experiences, and unforgettable memories.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}