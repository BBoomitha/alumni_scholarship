import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://YOUR_PROJECT_URL.supabase.co"
const supabaseKey = "YOUR_ANON_PUBLIC_KEY"   // from Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)
