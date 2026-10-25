import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.DATABASE_URL;

// Initialize Supabase Server Client
export const supabase = createClient(
  process.env.SUPABASE_URL || 'https://ukueivgmvynkycbclfff.supabase.co', 
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'your-key'
);