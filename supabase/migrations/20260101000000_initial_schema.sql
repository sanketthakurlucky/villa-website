-- ============================================================
-- SAFE MIGRATION: Reconcile existing schema → new design
-- Run in Supabase SQL Editor (transaction-safe)
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- 1. HANDLE EXISTING user_role ENUM (reconcile values)
-- ============================================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'CONTENT_MANAGER', 'VILLA_MANAGER', 'BLOG_EDITOR', 'READ_ONLY');
    ELSE
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'SUPER_ADMIN' AND enumtypid = 'user_role'::regtype) THEN
            ALTER TYPE user_role ADD VALUE 'SUPER_ADMIN';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'CONTENT_MANAGER' AND enumtypid = 'user_role'::regtype) THEN
            ALTER TYPE user_role ADD VALUE 'CONTENT_MANAGER';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'VILLA_MANAGER' AND enumtypid = 'user_role'::regtype) THEN
            ALTER TYPE user_role ADD VALUE 'VILLA_MANAGER';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'BLOG_EDITOR' AND enumtypid = 'user_role'::regtype) THEN
            ALTER TYPE user_role ADD VALUE 'BLOG_EDITOR';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'READ_ONLY' AND enumtypid = 'user_role'::regtype) THEN
            ALTER TYPE user_role ADD VALUE 'READ_ONLY';
        END IF;
    END IF;
END $$;

-- New enum types (only if not exist)
DO $$ BEGIN
    CREATE TYPE villa_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'BOOKED', 'LOST');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE publish_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- 2. CREATE DESTINATIONS TABLE (referenced by villas, blogs)
-- ============================================================
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    region TEXT,
    country TEXT DEFAULT 'India',
    image TEXT,
    description TEXT,
    villa_count INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. CREATE AMENITIES TABLE (referenced by villa_amenities)
-- ============================================================
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    icon TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. RECONCILE EXISTING VILLAS TABLE
-- ============================================================

-- Create villas table if it doesn't exist with ALL required columns
CREATE TABLE IF NOT EXISTS villas (
    id SERIAL PRIMARY KEY,
    id_uuid UUID NOT NULL DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    code_name TEXT,
    description TEXT,
    destination_id UUID,
    bedrooms INTEGER NOT NULL DEFAULT 3,
    bathrooms INTEGER NOT NULL DEFAULT 3,
    max_guests INTEGER NOT NULL DEFAULT 6,
    base_price INTEGER NOT NULL DEFAULT 0,
    b2b_price INTEGER,
    cover_image TEXT,
    gallery_images TEXT[] DEFAULT '{}',
    video_url TEXT,
    maps_url TEXT,
    check_in TEXT DEFAULT '14:00',
    check_out TEXT DEFAULT '11:00',
    house_rules TEXT,
    cancellation_policy TEXT,
    status villa_status DEFAULT 'DRAFT',
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    seo_title TEXT,
    seo_description TEXT,
    publish_status publish_status DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If table already existed, add missing columns
ALTER TABLE villas 
    ADD COLUMN IF NOT EXISTS id_uuid UUID DEFAULT uuid_generate_v4(),
    ADD COLUMN IF NOT EXISTS destination_id UUID,
    ADD COLUMN IF NOT EXISTS code_name TEXT,
    ADD COLUMN IF NOT EXISTS base_price INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS b2b_price INTEGER,
    ADD COLUMN IF NOT EXISTS cover_image TEXT,
    ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS video_url TEXT,
    ADD COLUMN IF NOT EXISTS maps_url TEXT,
    ADD COLUMN IF NOT EXISTS check_in TEXT DEFAULT '14:00',
    ADD COLUMN IF NOT EXISTS check_out TEXT DEFAULT '11:00',
    ADD COLUMN IF NOT EXISTS house_rules TEXT,
    ADD COLUMN IF NOT EXISTS cancellation_policy TEXT,
    ADD COLUMN IF NOT EXISTS status villa_status DEFAULT 'DRAFT',
    ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS seo_title TEXT,
    ADD COLUMN IF NOT EXISTS seo_description TEXT,
    ADD COLUMN IF NOT EXISTS publish_status publish_status DEFAULT 'DRAFT';

-- Backfill uuid for existing rows
UPDATE villas SET id_uuid = uuid_generate_v4() WHERE id_uuid IS NULL;
ALTER TABLE villas ALTER COLUMN id_uuid SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS villas_id_uuid_key ON villas(id_uuid);

-- Add FK to destinations (idempotent)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'villas_destination_id_fkey' 
        AND conrelid = 'villas'::regclass
    ) THEN
        ALTER TABLE villas 
            ADD CONSTRAINT villas_destination_id_fkey 
            FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Map existing public_rate to base_price if column exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'villas' AND column_name = 'public_rate'
    ) THEN
        UPDATE villas SET base_price = COALESCE(public_rate, 0) WHERE base_price = 0;
    END IF;
END $$;

-- Map existing destination text to destination_id if possible
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'villas' AND column_name = 'destination'
    ) THEN
        UPDATE villas v
        SET destination_id = d.id
        FROM destinations d
        WHERE v.destination ILIKE d.name
        AND v.destination_id IS NULL;
    END IF;
END $$;

-- ============================================================
-- 5. CREATE VILLA_AMENITIES TABLE (junction table) - AFTER villas exists
-- ============================================================
CREATE TABLE IF NOT EXISTS villa_amenities (
    villa_id UUID NOT NULL REFERENCES villas(id_uuid) ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (villa_id, amenity_id)
);

-- ============================================================
-- 6. CREATE ENQUIRIES TABLE - AFTER villas exists
-- ============================================================
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    villa_id UUID REFERENCES villas(id_uuid) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    check_in DATE,
    check_out DATE,
    guests INTEGER,
    message TEXT,
    status enquiry_status DEFAULT 'NEW',
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. CREATE ADMIN_USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'READ_ONLY',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. RECONCILE EXISTING BLOGS TABLE
-- ============================================================

-- Create blogs table if not exists with all columns
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    id_uuid UUID NOT NULL DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    author_id UUID,
    destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMPTZ,
    seo_title TEXT,
    seo_description TEXT,
    publish_status publish_status DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns if table existed
ALTER TABLE IF EXISTS blogs 
    ADD COLUMN IF NOT EXISTS id_uuid UUID DEFAULT uuid_generate_v4(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS author_id UUID,
    ADD COLUMN IF NOT EXISTS excerpt TEXT,
    ADD COLUMN IF NOT EXISTS content TEXT,
    ADD COLUMN IF NOT EXISTS cover_image TEXT,
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS seo_title TEXT,
    ADD COLUMN IF NOT EXISTS seo_description TEXT,
    ADD COLUMN IF NOT EXISTS publish_status publish_status DEFAULT 'DRAFT';

UPDATE blogs SET id_uuid = uuid_generate_v4() WHERE id_uuid IS NULL;
ALTER TABLE blogs ALTER COLUMN id_uuid SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS blogs_id_uuid_key ON blogs(id_uuid);

UPDATE blogs SET updated_at = NOW() WHERE updated_at IS NULL;

-- ============================================================
-- 9. BACKFILL villa_amenities FOR EXISTING VILLAS
-- ============================================================
-- INSERT INTO villa_amenities (villa_id, amenity_id)
-- SELECT v.id_uuid, a.id FROM villas v
-- CROSS JOIN amenities a WHERE a.name IN ('Private Pool', 'Free WiFi', 'Air Conditioning')
-- ON CONFLICT DO NOTHING;

-- ============================================================
-- 10. UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_destinations_updated_at ON destinations;
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_villas_updated_at ON villas;
CREATE TRIGGER update_villas_updated_at BEFORE UPDATE ON villas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_enquiries_updated_at ON enquiries;
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Villa count trigger (fixed NULL handling)
CREATE OR REPLACE FUNCTION update_villa_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE destinations SET villa_count = villa_count + 1 WHERE id = NEW.destination_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE destinations SET villa_count = villa_count - 1 WHERE id = OLD.destination_id;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.destination_id IS DISTINCT FROM NEW.destination_id THEN
            UPDATE destinations SET villa_count = villa_count - 1 WHERE id = OLD.destination_id;
            UPDATE destinations SET villa_count = villa_count + 1 WHERE id = NEW.destination_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_villa_count ON villas;
CREATE TRIGGER trigger_update_villa_count
    AFTER INSERT OR UPDATE OR DELETE ON villas
    FOR EACH ROW EXECUTE FUNCTION update_villa_count();

-- ============================================================
-- 11. INDEXES (only necessary ones)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_villas_destination ON villas(destination_id);
CREATE INDEX IF NOT EXISTS idx_villas_status ON villas(status);
CREATE INDEX IF NOT EXISTS idx_villas_featured ON villas(featured) WHERE status = 'PUBLISHED';
CREATE INDEX IF NOT EXISTS idx_villas_price ON villas(base_price) WHERE status = 'PUBLISHED';

CREATE INDEX IF NOT EXISTS idx_blogs_destination ON blogs(destination_id);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published_at) WHERE published_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_enquiries_villa ON enquiries(villa_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_villa_amenities_amenity ON villa_amenities(amenity_id);

-- Full-text search (only if queries use to_tsvector)
CREATE INDEX IF NOT EXISTS idx_villas_search ON villas USING GIN(
    to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, '') || ' ' || COALESCE(code_name, ''))
);

-- ============================================================
-- 12. RLS POLICIES (secure, role-specific)
-- ============================================================

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE villas ENABLE ROW LEVEL SECURITY;
ALTER TABLE villa_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies cleanly
DROP POLICY IF EXISTS "Public read destinations" ON destinations;
DROP POLICY IF EXISTS "Public read amenities" ON amenities;
DROP POLICY IF EXISTS "Public read published villas" ON villas;
DROP POLICY IF EXISTS "Public read villa amenities" ON villa_amenities;
DROP POLICY IF EXISTS "Public read published blogs" ON blogs;
DROP POLICY IF EXISTS "Public insert enquiries" ON enquiries;

DROP POLICY IF EXISTS "Admin full access destinations" ON destinations;
DROP POLICY IF EXISTS "Admin full access amenities" ON amenities;
DROP POLICY IF EXISTS "Admin full access villas" ON villas;
DROP POLICY IF EXISTS "Admin full access villa amenities" ON villa_amenities;
DROP POLICY IF EXISTS "Admin full access blogs" ON blogs;
DROP POLICY IF EXISTS "Admin full access enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admin read admin users" ON admin_users;
DROP POLICY IF EXISTS "Super admin read admin users" ON admin_users;

-- Helper function for admin check (avoids recursive RLS)
CREATE OR REPLACE FUNCTION is_admin_or_editor()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM admin_users
        WHERE id = auth.uid()
        AND role IN ('SUPER_ADMIN', 'CONTENT_MANAGER', 'VILLA_MANAGER')
    );
$$;

-- Helper for super admin check (avoids recursion on admin_users)
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM admin_users
        WHERE id = auth.uid()
        AND role = 'SUPER_ADMIN'
    );
$$;

-- Public read policies
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public read amenities" ON amenities FOR SELECT USING (true);
CREATE POLICY "Public read published villas" ON villas FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public read villa amenities" ON villa_amenities FOR SELECT USING (true);
CREATE POLICY "Public read published blogs" ON blogs FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

-- Admin policies (using helper function to avoid recursion)
CREATE POLICY "Admin full access destinations" ON destinations FOR ALL USING (is_admin_or_editor());
CREATE POLICY "Admin full access amenities" ON amenities FOR ALL USING (is_admin_or_editor());
CREATE POLICY "Admin full access villas" ON villas FOR ALL USING (is_admin_or_editor());
CREATE POLICY "Admin full access villa amenities" ON villa_amenities FOR ALL USING (is_admin_or_editor());
CREATE POLICY "Admin full access blogs" ON blogs FOR ALL USING (is_admin_or_editor());
CREATE POLICY "Admin full access enquiries" ON enquiries FOR ALL USING (is_admin_or_editor());

-- Admin users: only SUPER_ADMIN can read (uses SECURITY DEFINER helper)
CREATE POLICY "Super admin read admin users" ON admin_users FOR SELECT USING (is_super_admin());

-- Public insert for enquiries (with validation)
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (
    name IS NOT NULL AND length(name) <= 255
    AND phone IS NOT NULL AND length(phone) BETWEEN 10 AND 20
    AND (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
    AND (guests IS NULL OR guests BETWEEN 1 AND 50)
    AND (check_in IS NULL OR check_in >= CURRENT_DATE)
    AND (check_out IS NULL OR check_out > check_in)
);

-- ============================================================
-- 13. SECURE SEARCH FUNCTION (SECURITY INVOKER, no b2b_price)
-- ============================================================
CREATE OR REPLACE FUNCTION search_villas(
    p_destination TEXT DEFAULT NULL,
    p_check_in DATE DEFAULT NULL,
    p_check_out DATE DEFAULT NULL,
    p_guests INTEGER DEFAULT NULL,
    p_min_bedrooms INTEGER DEFAULT NULL,
    p_max_price INTEGER DEFAULT NULL,
    p_min_price INTEGER DEFAULT NULL,
    p_amenities TEXT[] DEFAULT NULL,
    p_tags TEXT[] DEFAULT NULL,
    p_featured BOOLEAN DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    slug TEXT,
    name TEXT,
    code_name TEXT,
    description TEXT,
    destination_id UUID,
    destination_name TEXT,
    destination_slug TEXT,
    bedrooms INTEGER,
    bathrooms INTEGER,
    max_guests INTEGER,
    base_price INTEGER,
    cover_image TEXT,
    gallery_images TEXT[],
    video_url TEXT,
    rating NUMERIC,
    review_count INTEGER,
    tags TEXT[],
    featured BOOLEAN
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id_uuid as id,
        v.slug,
        v.name,
        v.code_name,
        v.description,
        v.destination_id,
        d.name as destination_name,
        d.slug as destination_slug,
        v.bedrooms,
        v.bathrooms,
        v.max_guests,
        v.base_price,
        v.cover_image,
        v.gallery_images,
        v.video_url,
        4.5 as rating,
        0 as review_count,
        v.tags,
        v.featured
    FROM villas v
    LEFT JOIN destinations d ON v.destination_id = d.id
    WHERE v.status = 'PUBLISHED'
    AND (p_destination IS NULL OR d.slug = p_destination)
    AND (p_guests IS NULL OR v.max_guests >= p_guests)
    AND (p_min_bedrooms IS NULL OR v.bedrooms >= p_min_bedrooms)
    AND (p_max_price IS NULL OR v.base_price <= p_max_price)
    AND (p_min_price IS NULL OR v.base_price >= p_min_price)
    AND (p_featured IS NULL OR v.featured = p_featured)
    AND (p_amenities IS NULL OR EXISTS (
        SELECT 1 FROM villa_amenities va
        JOIN amenities a ON va.amenity_id = a.id
        WHERE va.villa_id = v.id_uuid AND a.name = ANY(p_amenities)
    ))
    AND (p_tags IS NULL OR v.tags && p_tags)
    ORDER BY v.featured DESC, v.created_at DESC, v.id_uuid
    LIMIT p_limit OFFSET p_offset;
END;
$$;

GRANT EXECUTE ON FUNCTION search_villas TO anon, authenticated;

-- ============================================================
-- 14. SEED DATA (idempotent)
-- ============================================================
INSERT INTO destinations (slug, name, region, country, image, description, villa_count) VALUES
    ('north-goa', 'North Goa', 'Goa', 'India', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', 'Vibrant beaches, nightlife, and Portuguese heritage', 0),
    ('south-goa', 'South Goa', 'Goa', 'India', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 'Serene beaches, luxury resorts, and tranquil vibes', 0),
    ('udaipur', 'Udaipur', 'Rajasthan', 'India', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 'City of Lakes with royal palaces and heritage', 0),
    ('jaipur', 'Jaipur', 'Rajasthan', 'India', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', 'Pink City with majestic forts and culture', 0),
    ('manali-shimla', 'Manali & Shimla', 'Himachal Pradesh', 'India', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', 'Himalayan hill stations with snow-capped peaks', 0),
    ('kerala', 'Kerala', 'Kerala', 'India', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', 'God''s Own Country with backwaters and greenery', 0),
    ('leh-ladakh', 'Leh-Ladakh', 'Ladakh', 'India', 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80', 'High-altitude desert with stunning monasteries', 0),
    ('coorg', 'Coorg', 'Karnataka', 'India', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', 'Coffee plantations and misty hills', 0)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO amenities (name, icon, category) VALUES
    ('Private Pool', 'waves', 'Outdoor'),
    ('Jacuzzi', 'droplet', 'Outdoor'),
    ('In-house Chef', 'utensils', 'Services'),
    ('Butler Service', 'users', 'Services'),
    ('Caretaker Onsite', 'shield', 'Services'),
    ('Housekeeping', 'sparkles', 'Services'),
    ('Free WiFi', 'wifi', 'Amenities'),
    ('Air Conditioning', 'wind', 'Amenities'),
    ('Breakfast Included', 'coffee', 'Food'),
    ('Meals Available', 'utensils-crossed', 'Food'),
    ('Parking', 'car', 'Amenities'),
    ('Garden/Lawn', 'tree-pine', 'Outdoor'),
    ('Rooftop Terrace', 'sunrise', 'Outdoor'),
    ('Games Room', 'gamepad-2', 'Entertainment'),
    ('Home Theater', 'tv', 'Entertainment'),
    ('Gym', 'dumbbell', 'Wellness'),
    ('Spa/Sauna', 'flame', 'Wellness'),
    ('Yoga Deck', 'leaf', 'Wellness'),
    ('Beach Access', 'waves', 'Location'),
    ('Mountain View', 'mountain', 'Location'),
    ('Lake View', 'droplet', 'Location'),
    ('Pet Friendly', 'dog', 'Policy'),
    ('Senior Citizen Friendly', 'accessibility', 'Policy'),
    ('Wheelchair Accessible', 'wheelchair', 'Policy'),
    ('Event Space', 'calendar', 'Events'),
    ('BBQ Area', 'flame', 'Outdoor'),
    ('Fire Pit', 'flame', 'Outdoor'),
    ('Library', 'book', 'Entertainment'),
    ('Wine Cellar', 'wine', 'Food'),
    ('Helipad', 'helicopter', 'Premium')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 15. GRANTS (least privilege)
-- ============================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON destinations, amenities, villas, villa_amenities, blogs TO anon;
GRANT SELECT ON enquiries TO authenticated;
GRANT INSERT ON enquiries TO anon;
GRANT ALL ON destinations, amenities, villas, villa_amenities, blogs, enquiries, admin_users TO authenticated;
GRANT EXECUTE ON FUNCTION search_villas TO anon, authenticated;