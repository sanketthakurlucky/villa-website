import { Metadata } from 'next';
import AdminEnquiriesClient from './AdminEnquiriesClient';

export const metadata: Metadata = {
    title: 'Manage Enquiries',
    description: 'Manage customer enquiries',
};

export default function AdminEnquiriesPage() {
    return <AdminEnquiriesClient />;
}