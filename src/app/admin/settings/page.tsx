import { Metadata } from 'next';
import AdminSettingsClient from './AdminSettingsClient';

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Admin settings',
};

export default function AdminSettingsPage() {
    return <AdminSettingsClient />;
}