import { createClient } from '@supabase/supabase-js';

// Initialize Supabase using your environment variables
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://ukueivgmvynkycbclfff.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'your-key'
);

export default async function handler(req, res) {
  // Only allow POST requests from the admin dashboard
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const villaData = req.body;

    // Insert data into your PostgreSQL 'villas' table
    const { data, error } = await supabase
      .from('villas')
      .insert([
        {
          unique_id: villaData.unique_id,
          name: villaData.name,
          destination: villaData.destination,
          bedrooms: villaData.bedrooms,
          bathrooms: villaData.bathrooms || 3,
          max_guests: villaData.max_guests,
          public_rate: villaData.public_rate,
          b2b_rate: villaData.b2b_rate, // Secret B2B rate saved securely
          description: villaData.description,
          slug: villaData.slug,
          status: villaData.status || 'PUBLISHED'
        }
      ])
      .select();

    if (error) {
      console.error('Database Insertion Error:', error);
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Villa successfully published to PostgreSQL database!',
      data: data[0]
    });

  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}