import { Metadata } from 'next';
import AdminDestinationsClient from './AdminDestinationsClient';

export const metadata: Metadata = {
    title: 'Manage Destinations',
    description: 'Manage destinations',
};

export default function AdminDestinationsPage() {
    return <AdminDestinationsClient />;
}