import { Metadata } from 'next';
import AdminMediaClient from './AdminMediaClient';

export const metadata: Metadata = {
    title: 'Media Library',
    description: 'Manage media assets',
};

export default function AdminMediaPage() {
    return <AdminMediaClient />;
}