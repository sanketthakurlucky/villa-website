import { Metadata } from 'next';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Admin dashboard overview',
};

export default function AdminDashboardPage() {
    return <AdminDashboardClient />;
}