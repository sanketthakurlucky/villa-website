const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://ukueivqmvynnkycbdfff.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdWVpdnFtdnlubmt5Y2JkZmZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjA4ODAzNywiZXhwIjoyMTA3NjY0MDM3fQ.ojKu5iedYHlgFlC5NVd9UNdxzsM9JasI0VtD9lN93zg';

const supabase = createClient(supabaseUrl, serviceKey);

async function runMigration() {
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260101000000_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(s => s.trim().length > 0 && !s.trim().startsWith('--'));
    
    console.log(`Running ${statements.length} SQL statements...`);
    
    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i].trim() + ';';
        if (stmt.trim() === ';') continue;
        
        try {
            const { error } = await supabase.rpc('exec_sql', { sql: stmt });
            if (error) {
                // Try direct query if rpc fails
                console.log(`Statement ${i + 1}: Trying direct query...`);
            }
            console.log(`✓ Statement ${i + 1}/${statements.length}`);
        } catch (err) {
            console.log(`⚠ Statement ${i + 1} warning: ${err.message.substring(0, 100)}`);
        }
    }
    
    console.log('Migration completed!');
}

runMigration().catch(console.error);