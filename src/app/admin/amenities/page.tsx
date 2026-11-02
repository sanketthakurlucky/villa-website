import { Metadata } from 'next';
import AdminAmenitiesClient from './AdminAmenitiesClient';

export const metadata: Metadata = {
    title: 'Manage Amenities',
    description: 'Manage villa amenities',
};

export default function AdminAmenitiesPage() {
    return <AdminAmenitiesClient />;
}