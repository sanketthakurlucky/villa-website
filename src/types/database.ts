export interface Database {
  public: {
    Tables: {
      villas: {
        Row: Villa;
        Insert: VillaInsert;
        Update: VillaUpdate;
      };
      destinations: {
        Row: Destination;
        Insert: DestinationInsert;
        Update: DestinationUpdate;
      };
      amenities: {
        Row: Amenity;
        Insert: AmenityInsert;
        Update: AmenityUpdate;
      };
      villa_amenities: {
        Row: VillaAmenity;
        Insert: VillaAmenityInsert;
        Update: VillaAmenityUpdate;
      };
      blogs: {
        Row: Blog;
        Insert: BlogInsert;
        Update: BlogUpdate;
      };
      enquiries: {
        Row: Enquiry;
        Insert: EnquiryInsert;
        Update: EnquiryUpdate;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      villa_status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
      enquiry_status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'BOOKED' | 'LOST';
      user_role: 'ADMIN' | 'EDITOR' | 'VIEWER';
    };
  };
}

export type Villa = {
  id: string;
  slug: string;
  name: string;
  code_name: string;
  description: string | null;
  destination_id: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  b2b_price: number | null;
  cover_image: string | null;
  gallery_images: string[] | null;
  video_url: string | null;
  maps_url: string | null;
  check_in: string | null;
  check_out: string | null;
  house_rules: string | null;
  cancellation_policy: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  tags: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type VillaInsert = Omit<Villa, 'id' | 'created_at' | 'updated_at'>;
export type VillaUpdate = Partial<VillaInsert>;

export type Destination = {
  id: string;
  slug: string;
  name: string;
  region: string | null;
  country: string | null;
  image: string | null;
  description: string | null;
  villa_count: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type DestinationInsert = Omit<Destination, 'id' | 'created_at' | 'updated_at'>;
export type DestinationUpdate = Partial<DestinationInsert>;

export type Amenity = {
  id: string;
  name: string;
  icon: string | null;
  category: string | null;
  created_at: string;
};

export type AmenityInsert = Omit<Amenity, 'id' | 'created_at'>;
export type AmenityUpdate = Partial<AmenityInsert>;

export type VillaAmenity = {
  villa_id: string;
  amenity_id: string;
};

export type VillaAmenityInsert = VillaAmenity;
export type VillaAmenityUpdate = Partial<VillaAmenity>;

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author_id: string | null;
  destination_id: string | null;
  tags: string[] | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogInsert = Omit<Blog, 'id' | 'created_at' | 'updated_at'>;
export type BlogUpdate = Partial<BlogInsert>;

export type Enquiry = {
  id: string;
  villa_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  check_in: string | null;
  check_out: string | null;
  guests: number | null;
  message: string | null;
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'BOOKED' | 'LOST';
  source: string | null;
  created_at: string;
  updated_at: string;
};

export type EnquiryInsert = Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>;
export type EnquiryUpdate = Partial<EnquiryInsert>;