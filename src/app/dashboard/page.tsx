import { Metadata } from 'next';
import DashboardPageClient from './DashboardPageClient';

export const metadata: Metadata = {
  title: 'My Dashboard | SEASALT Hospitality',
  description: 'Manage your bookings, view upcoming stays, access concierge, and track your SEASALT Gold rewards.',
};

export default function DashboardPage() {
  return <DashboardPageClient />;
}