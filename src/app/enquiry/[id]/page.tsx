import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EnquiryDetailClient from './EnquiryDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Enquiry ${id} | SEASALT Hospitality`,
    description: `View and manage your villa enquiry ${id}.`,
  };
}

const enquiryData: Record<string, any> = {
  'ENQ-2024-001': {
    id: 'ENQ-2024-001',
    status: 'quoted',
    createdAt: '2024-11-15',
    updatedAt: '2024-11-18',
    guest: { name: 'Priya Joshi', email: 'priya.joshi@email.com', phone: '+91 98765 43210' },
    requirements: {
      destination: 'Goa (North or South)',
      checkIn: '2024-12-20',
      checkOut: '2024-12-27',
      guests: 6,
      bedrooms: 4,
      budget: '50000-75000',
      specialRequests: 'Private pool essential. Beachfront preferred. In-house chef for Goan cuisine. Airport transfer needed.',
    },
    quotes: [
      { villaId: '1', villaName: 'Villa Serenity', location: 'North Goa', price: 45000, status: 'sent', sentAt: '2024-11-16' },
      { villaId: '7', villaName: 'Coastal Paradise', location: 'South Goa', price: 48000, status: 'sent', sentAt: '2024-11-16' },
      { villaId: '2', villaName: 'Palace by the Lake', location: 'Udaipur', price: 75000, status: 'sent', sentAt: '2024-11-17' },
    ],
    messages: [
      { from: 'concierge', text: 'Hi Priya! I\'ve found 3 villas matching your criteria. Sending details now.', time: '2024-11-16 10:30' },
      { from: 'guest', text: 'Thanks! Villa Serenity looks perfect. Can you confirm the pool is heated?', time: '2024-11-16 14:22' },
      { from: 'concierge', text: 'Yes, Villa Serenity has a heated infinity pool (28-30°C). I\'ve also confirmed the chef specializes in Goan cuisine. Sending full details now.', time: '2024-11-16 15:45' },
      { from: 'guest', text: 'Perfect! Please proceed with Villa Serenity. What\'s the next step?', time: '2024-11-18 09:10' },
      { from: 'concierge', text: 'Great choice! I\'ve sent the booking link to your email. 25% deposit (₹78,750) secures the villa. Balance due by Nov 20.', time: '2024-11-18 09:30' },
    ],
  },
  'ENQ-2024-002': {
    id: 'ENQ-2024-002',
    status: 'new',
    createdAt: '2024-11-20',
    updatedAt: '2024-11-20',
    guest: { name: 'Rajesh Kumar', email: 'rajesh.k@company.com', phone: '+91 99887 76655' },
    requirements: {
      destination: 'Kerala Backwaters',
      checkIn: '2025-02-10',
      checkOut: '2025-02-17',
      guests: 4,
      bedrooms: 3,
      budget: '50000-60000',
      specialRequests: 'Backwater villa with houseboat day trip. Ayurvedic spa treatments. Vegetarian meals only.',
    },
    quotes: [],
    messages: [
      { from: 'guest', text: 'Looking for a Kerala backwater villa for Feb 10-17. 4 guests, 3 bedrooms. Budget 50-60k/night. Need houseboat day and Ayurvedic spa. Veg meals only.', time: '2024-11-20 11:15' },
    ],
  },
};

export default async function EnquiryDetailPage({ params }: Props) {
  const { id } = await params;
  const enquiry = enquiryData[id];

  if (!enquiry) {
    notFound();
  }

  return <EnquiryDetailClient enquiry={enquiry} />;
}