# Database Connection Troubleshooting

## Why You Can't Get Data from Database

The app now only uses database data (no static fallbacks). Here's how to fix common issues:

## Step 1: Check Your Environment Variables

Create `.env.local` file in project root:

```env
VITE_SUPABASE_URL=https://pimrdtytjpwsibzyfaoe.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

**Important:** Replace `your-actual-anon-key-here` with your real Supabase anon key!

## Step 2: Get Your Supabase Credentials

1. Go to https://supabase.com
2. Sign in and open your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **anon public** key → Use as `VITE_SUPABASE_ANON_KEY`

## Step 3: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `database_schema.sql`
3. Paste and click **Run**
4. You should see "Success. No rows returned" message

## Step 4: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## Common Error Messages & Solutions

### "Supabase not configured"
- **Problem:** Missing or incorrect environment variables
- **Solution:** Check your `.env.local` file exists and has correct values

### "Invalid Supabase API key"
- **Problem:** Wrong API key
- **Solution:** Get the correct anon key from Supabase dashboard

### "Database tables not found"
- **Problem:** Haven't run the SQL schema
- **Solution:** Run the `database_schema.sql` in Supabase SQL Editor

### "Failed to load data from database"
- **Problem:** Database connection issue
- **Solution:** Check all steps above

## Testing Your Setup

1. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for error messages
   - Check Network tab for failed API calls

2. **Test Database Connection:**
   - Go to Supabase dashboard
   - Check if tables exist in Table Editor
   - Verify sample data is there

3. **Verify Environment Variables:**
   - Check that `.env.local` file exists
   - Make sure values are correct (no extra spaces)
   - Restart server after changes

## Quick Test

After setup, you should see:
- ✅ Calendar with events from database
- ✅ Alumni list in Dashboard
- ✅ Statistics showing real numbers
- ✅ No error messages in console

## Still Having Issues?

1. **Check Supabase Project Status:**
   - Make sure your project is active
   - Check if you have the right permissions

2. **Verify API Key Permissions:**
   - Use the "anon public" key, not "service_role"
   - Make sure RLS policies allow access

3. **Check Network Tab:**
   - Look for 401/403 errors (authentication)
   - Look for 404 errors (tables not found)
   - Look for 500 errors (server issues)

## Manual Database Check

1. Go to Supabase dashboard
2. Go to **Table Editor**
3. You should see these tables:
   - `alumni` (with sample data)
   - `events` (with sample data)
   - `invitations`
   - `thank_you_letters`

If tables are empty, run the SQL schema again.

