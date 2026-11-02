import { Metadata } from 'next';
import AdminBlogsClient from './AdminBlogsClient';

export const metadata: Metadata = {
    title: 'Manage Blogs',
    description: 'Manage blog posts',
};

export default function AdminBlogsPage() {
    return <AdminBlogsClient />;
}