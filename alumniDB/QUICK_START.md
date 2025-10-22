# Quick Start Guide

## Fix the Blank Page Issue

The blank page is caused by missing Supabase configuration. Follow these steps:

### Step 1: Create Environment File

Create a file named `.env.local` in the project root with this content:

```env
VITE_SUPABASE_URL=https://pimrdtytjpwsibzyfaoe.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 2: Get Your Supabase Key

1. Go to https://supabase.com and sign in
2. Open your project (or create a new one)
3. Go to Settings > API
4. Copy the "anon public" key
5. Replace `your-anon-key-here` in `.env.local` with your actual key

### Step 3: Set Up Database

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database_schema.sql`
3. Click "Run" to create the tables and sample data

### Step 4: Restart the Development Server

```bash
npm run dev
```

## Alternative: Use Static Data (No Database)

If you want to test the app without setting up Supabase, the app will automatically fall back to static data when the database is not available.

## Troubleshooting

### Still seeing blank page?
1. Check browser console for errors
2. Make sure `.env.local` file exists in the project root
3. Restart the development server after creating the env file
4. Check that your Supabase key is correct

### Database errors?
1. Make sure you've run the SQL schema
2. Check that your Supabase project is active
3. Verify the API key has the correct permissions

## What's Working Now

- ✅ Responsive design for all screen sizes
- ✅ Calendar with event display
- ✅ Alumni management (CRUD operations)
- ✅ Invitation system
- ✅ Thank you letter system
- ✅ Real-time statistics
- ✅ Database integration with fallback to static data
