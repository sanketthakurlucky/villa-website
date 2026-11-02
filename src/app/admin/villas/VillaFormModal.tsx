'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Image as ImageIcon, MapPin, Building2, DollarSign, Tag, Star, Eye, Trash2, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

const villaSchema = z.object({
    name: z.string().min(1, 'Villa name is required'),
    code_name: z.string().min(1, 'Code name is required'),
    slug: z.string().optional(),
    description: z.string().optional(),
    destination_id: z.string().min(1, 'Destination is required'),
    bedrooms: z.coerce.number().min(1, 'At least 1 bedroom required'),
    bathrooms: z.coerce.number().min(1, 'At least 1 bathroom required'),
    max_guests: z.coerce.number().min(1, 'At least 1 guest required'),
    base_price: z.coerce.number().min(0, 'Price must be positive'),
    b2b_price: z.coerce.number().min(0).optional().nullable(),
    cover_image: z.string().url().optional().or(z.literal('')),
    gallery_images: z.array(z.string().url()).optional(),
    video_url: z.string().url().optional().or(z.literal('')),
    maps_url: z.string().url().optional().or(z.literal('')),
    check_in: z.string().optional(),
    check_out: z.string().optional(),
    house_rules: z.string().optional(),
    cancellation_policy: z.string().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
    featured: z.boolean(),
    tags: z.array(z.string()).optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    amenity_ids: z.array(z.string()).optional(),
});

type VillaFormData = z.infer<typeof villaSchema>;

interface VillaFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    villa: any | null;
    destinations: { id: string; name: string }[];
    onSuccess: () => void;
}

export default function VillaFormModal({ isOpen, onClose, mode, villa, destinations, onSuccess }: VillaFormModalProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<VillaFormData>({
        resolver: zodResolver(villaSchema),
        defaultValues: {
            name: '',
            code_name: '',
            slug: '',
            description: '',
            destination_id: '',
            bedrooms: 3,
            bathrooms: 3,
            max_guests: 6,
            base_price: 0,
            b2b_price: 0,
            cover_image: '',
            gallery_images: [],
            video_url: '',
            maps_url: '',
            check_in: '14:00',
            check_out: '11:00',
            house_rules: '',
            cancellation_policy: '',
            status: 'DRAFT',
            featured: false,
            tags: [],
            seo_title: '',
            seo_description: '',
            amenity_ids: [],
        },
    });

    useEffect(() => {
        if (isOpen && villa) {
            reset({
                name: villa.name,
                code_name: villa.code_name,
                slug: villa.slug,
                description: villa.description,
                destination_id: villa.destination_id,
                bedrooms: villa.bedrooms,
                bathrooms: villa.bathrooms,
                max_guests: villa.max_guests,
                base_price: villa.base_price,
                b2b_price: villa.b2b_price || 0,
                cover_image: villa.cover_image || '',
                gallery_images: villa.gallery_images || [],
                video_url: villa.video_url || '',
                maps_url: villa.maps_url || '',
                check_in: villa.check_in || '14:00',
                check_out: villa.check_out || '11:00',
                house_rules: villa.house_rules || '',
                cancellation_policy: villa.cancellation_policy || '',
                status: villa.status,
                featured: villa.featured,
                tags: villa.tags || [],
                seo_title: villa.seo_title || '',
                seo_description: villa.seo_description || '',
                amenity_ids: villa.amenities?.map((a: any) => a.id) || [],
            });
            setCoverImage(villa.cover_image || null);
            setGalleryImages(villa.gallery_images || []);
        } else if (isOpen && !villa) {
            reset({
                name: '',
                code_name: '',
                slug: '',
                description: '',
                destination_id: '',
                bedrooms: 3,
                bathrooms: 3,
                max_guests: 6,
                base_price: 0,
                b2b_price: 0,
                cover_image: '',
                gallery_images: [],
                video_url: '',
                maps_url: '',
                check_in: '14:00',
                check_out: '11:00',
                house_rules: '',
                cancellation_policy: '',
                status: 'DRAFT',
                featured: false,
                tags: [],
                seo_title: '',
                seo_description: '',
                amenity_ids: [],
            });
            setCoverImage(null);
            setGalleryImages([]);
        }
    }, [isOpen, villa, reset]);

    const tabs = [
        { id: 0, label: 'Basic Info', icon: Building2 },
        { id: 1, label: 'Pricing', icon: DollarSign },
        { id: 2, label: 'Media', icon: ImageIcon },
        { id: 3, label: 'Amenities & Policies', icon: Tag },
        { id: 4, label: 'SEO', icon: Star },
    ];

    const onSubmit = async (data: VillaFormData) => {
        setSubmitting(true);
        try {
            const payload = {
                ...data,
                cover_image: coverImage,
                gallery_images: galleryImages,
                amenity_ids: data.amenity_ids || [],
            };

            const url = mode === 'edit' && villa ? `/api/admin/villas` : `/api/admin/villas`;
            const method = mode === 'edit' && villa ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Failed to save villa');

            onSuccess();
        } catch (err) {
            console.error('Failed to save villa:', err);
            alert(err instanceof Error ? err.message : 'Failed to save villa');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'Add New Villa' : `Edit ${villa?.name}`}
            size="full"
            showCloseButton
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex gap-1 px-2" role="tablist">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                                    activeTab === tab.id
                                        ? 'border-luxPink text-luxPink'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                                )}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Panels */}
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    {/* Basic Info Tab */}
                    {activeTab === 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6" role="tabpanel">
                            <Input
                                label="Villa Name *"
                                error={errors.name?.message}
                                {...register('name')}
                                placeholder="e.g., Seasalt Villa 01 — Assagao"
                            />
                            <Input
                                label="Code Name *"
                                error={errors.code_name?.message}
                                {...register('code_name')}
                                placeholder="e.g., SS031 4BHK Assagao"
                            />
                            <Input
                                label="Slug"
                                {...register('slug')}
                                placeholder="auto-generated from name"
                                helperText="Leave empty to auto-generate"
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination *</label>
                                <select
                                    {...register('destination_id')}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                >
                                    <option value="">Select destination</option>
                                    {destinations.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.destination_id && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.destination_id.message}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Input
                                    label="Bedrooms (BHK) *"
                                    type="number"
                                    error={errors.bedrooms?.message}
                                    {...register('bedrooms')}
                                />
                                <Input
                                    label="Bathrooms *"
                                    type="number"
                                    error={errors.bathrooms?.message}
                                    {...register('bathrooms')}
                                />
                                <Input
                                    label="Max Guests *"
                                    type="number"
                                    error={errors.max_guests?.message}
                                    {...register('max_guests')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                    placeholder="Enter villa features, pool details, and caretaker information..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Pricing Tab */}
                    {activeTab === 1 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6" role="tabpanel">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Public Nightly Rate (₹) *</label>
                                <Input
                                    type="number"
                                    error={errors.base_price?.message}
                                    {...register('base_price')}
                                    placeholder="34500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Secret B2B Rate (₹)</label>
                                <Input
                                    type="number"
                                    error={errors.b2b_price?.message}
                                    {...register('b2b_price')}
                                    placeholder="28000"
                                    helperText="Never shown publicly. Used for agent bookings."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Check-in Time"
                                    type="time"
                                    {...register('check_in')}
                                />
                                <Input
                                    label="Check-out Time"
                                    type="time"
                                    {...register('check_out')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                                <select
                                    {...register('status')}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="PUBLISHED">Published</option>
                                    <option value="ARCHIVED">Archived</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" {...register('featured')} className="w-4 h-4 text-luxPink border-gray-300 rounded focus:ring-luxPink" />
                                    <span className="text-sm font-medium text-gray-700">Featured Villa</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Media Tab */}
                    {activeTab === 2 && (
                        <div className="p-6 space-y-6" role="tabpanel">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Cover Image</label>
                                <ImageUpload
                                    value={coverImage}
                                    onChange={setCoverImage}
                                    label="Cover Image"
                                />
                                {coverImage && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                        <ImageIcon className="w-4 h-4" />
                                        <span>Cover image set</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Gallery Images</label>
                                <ImageUpload
                                    value={galleryImages}
                                    onChange={setGalleryImages}
                                    multiple
                                    label="Gallery Images"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Video URL (YouTube/Vimeo)"
                                    type="url"
                                    {...register('video_url')}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                                <Input
                                    label="Google Maps URL"
                                    type="url"
                                    {...register('maps_url')}
                                    placeholder="https://maps.google.com/..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Amenities & Policies Tab */}
                    {activeTab === 3 && (
                        <div className="p-6 space-y-6" role="tabpanel">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                                <AmenitySelector
                                    selectedIds={watch('amenity_ids') || []}
                                    onChange={(ids) => setValue('amenity_ids', ids)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
                                <TagInput
                                    value={watch('tags') || []}
                                    onChange={(tags) => setValue('tags', tags)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">House Rules</label>
                                <textarea
                                    {...register('house_rules')}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                    placeholder="No smoking, no parties, quiet hours 10PM-8AM..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cancellation Policy</label>
                                <textarea
                                    {...register('cancellation_policy')}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                    placeholder="Free cancellation 7 days before check-in. 50% refund 3-7 days before. No refund within 3 days..."
                                />
                            </div>
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === 4 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6" role="tabpanel">
                            <Input
                                label="SEO Title"
                                {...register('seo_title')}
                                placeholder="Auto-generated from villa name"
                                helperText="Leave empty to auto-generate"
                            />
                            <Input
                                label="SEO Description"
                                {...register('seo_description')}
                                placeholder="Auto-generated from description"
                                helperText="Leave empty to auto-generate"
                            />
                        </div>
                    )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={submitting} className="min-w-[160px]">
                        {submitting ? 'Saving...' : mode === 'create' ? 'Create Villa' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

// Amenity Selector Component
function AmenitySelector({ selectedIds, onChange }: { selectedIds: string[]; onChange: (ids: string[]) => void }) {
    const [search, setSearch] = useState('');
    const amenities = [
        { id: '1', name: 'Private Pool', category: 'Outdoor', icon: 'waves' },
        { id: '2', name: 'Jacuzzi', category: 'Outdoor', icon: 'droplet' },
        { id: '3', name: 'In-house Chef', category: 'Services', icon: 'utensils' },
        { id: '4', name: 'Butler Service', category: 'Services', icon: 'users' },
        { id: '5', name: 'Caretaker Onsite', category: 'Services', icon: 'shield' },
        { id: '6', name: 'Housekeeping', category: 'Services', icon: 'sparkles' },
        { id: '7', name: 'Free WiFi', category: 'Amenities', icon: 'wifi' },
        { id: '8', name: 'Air Conditioning', category: 'Amenities', icon: 'wind' },
        { id: '9', name: 'Breakfast Included', category: 'Food', icon: 'coffee' },
        { id: '10', name: 'Meals Available', category: 'Food', icon: 'utensils-crossed' },
        { id: '11', name: 'Parking', category: 'Amenities', icon: 'car' },
        { id: '12', name: 'Garden/Lawn', category: 'Outdoor', icon: 'tree-pine' },
        { id: '13', name: 'Rooftop Terrace', category: 'Outdoor', icon: 'sunrise' },
        { id: '14', name: 'Games Room', category: 'Entertainment', icon: 'gamepad-2' },
        { id: '15', name: 'Gym', category: 'Wellness', icon: 'dumbbell' },
        { id: '16', name: 'Spa/Sauna', category: 'Wellness', icon: 'flame' },
        { id: '17', name: 'Yoga Deck', category: 'Wellness', icon: 'leaf' },
        { id: '18', name: 'Beach Access', category: 'Location', icon: 'waves' },
        { id: '19', name: 'Mountain View', category: 'Location', icon: 'mountain' },
        { id: '20', name: 'Lake View', category: 'Location', icon: 'droplet' },
        { id: '21', name: 'Pet Friendly', category: 'Policy', icon: 'dog' },
        { id: '22', name: 'Senior Citizen Friendly', category: 'Policy', icon: 'accessibility' },
        { id: '23', name: 'Wheelchair Accessible', category: 'Policy', icon: 'wheelchair' },
        { id: '24', name: 'Event Space', category: 'Events', icon: 'calendar' },
        { id: '25', name: 'BBQ Area', category: 'Outdoor', icon: 'flame' },
        { id: '26', name: 'Fire Pit', category: 'Outdoor', icon: 'flame' },
        { id: '27', name: 'Library', category: 'Entertainment', icon: 'book' },
        { id: '28', name: 'Wine Cellar', category: 'Food', icon: 'wine' },
        { id: '29', name: 'Helipad', category: 'Premium', icon: 'helicopter' },
    ];

    const categories = [...new Set(amenities.map(a => a.category))];

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search amenities..."
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {categories.map(category => (
                    <div key={category} className="border border-gray-200 rounded-xl p-3">
                        <h4 className="font-medium text-gray-900 mb-2 capitalize">{category}</h4>
                        <div className="space-y-1">
                            {amenities.filter(a => a.category === category && a.name.toLowerCase().includes(search.toLowerCase())).map(amenity => (
                                <label key={amenity.id} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(amenity.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                onChange([...selectedIds, amenity.id]);
                                            } else {
                                                onChange(selectedIds.filter(id => id !== amenity.id));
                                            }
                                        }}
                                        className="w-4 h-4 text-luxPink border-gray-300 rounded focus:ring-luxPink"
                                    />
                                    <span className="text-sm text-gray-700">{amenity.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Tag Input Component
function TagInput({ value, onChange }: { value: string[]; onChange: (tags: string[]) => void }) {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim() && !value.includes(inputValue.trim())) {
            onChange([...value, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tag (press Enter)"
                className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
            />
            <div className="flex flex-wrap gap-2">
                {value.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-luxPink/10 text-luxPink rounded-full text-sm font-medium">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => onChange(value.filter(t => t !== tag))}
                                            className="w-4 h-4 flex items-center justify-center hover:bg-luxPink/20 rounded-full"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                ))}
            </div>
        </div>
    );
}

// Image Upload Component
function ImageUpload({ value, onChange, multiple, label }: { value: string | string[]; onChange: (value: string | string[]) => void; multiple?: boolean; label: string }) {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList) => {
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(f => f.type.startsWith('image/'));
        
        if (multiple) {
            const current = Array.isArray(value) ? value : [];
            const newUrls = validFiles.map(f => URL.createObjectURL(f));
            onChange([...current, ...newUrls]);
        } else {
            if (validFiles[0]) {
                onChange(URL.createObjectURL(validFiles[0]));
            }
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFiles(e.target.files);
    };

    const removeImage = (index: number) => {
        if (multiple && Array.isArray(value)) {
            const newValue = [...value];
            URL.revokeObjectURL(newValue[index]);
            newValue.splice(index, 1);
            onChange(newValue);
        } else {
            if (typeof value === 'string') URL.revokeObjectURL(value);
            onChange('');
        }
    };

    const images = multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : []);

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            className={cn(
                'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors',
                dragActive ? 'border-luxPink bg-luxPink/5' : 'border-gray-200 hover:border-luxPink'
            )}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-1">{label}</p>
            <p className="text-sm text-gray-400">Click or drag & drop images here</p>
            
            {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                                            <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                </div>
            )}
        </div>
    );
}