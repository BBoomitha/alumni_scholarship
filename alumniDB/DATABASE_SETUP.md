# Alumni Database Setup Guide

This guide will help you set up the Supabase database for the Alumni Management System.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed
3. The project dependencies installed (`npm install`)

## Database Setup

### Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `alumni-database`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

### Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following:
   - Project URL
   - Project API Key (anon/public key)

### Step 3: Update Environment Variables

1. Create a `.env.local` file in the project root
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Create Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database_schema.sql`
3. Click "Run" to execute the SQL

This will create:
- `alumni` table for storing alumni information
- `events` table for calendar events
- `invitations` table for event invitations
- `thank_you_letters` table for thank you letters
- Sample data for testing

### Step 5: Update Supabase Client

Update `src/supabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
```

### Step 6: Test the Application

1. Start the development server: `npm run dev`
2. Open the application in your browser
3. Check that data is loading from the database
4. Test CRUD operations (Create, Read, Update, Delete)

## Database Schema

### Alumni Table
- `id`: Primary key
- `name`: Alumni name
- `year`: Graduation year
- `dept`: Department
- `email`: Email address (unique)
- `phone`: Phone number
- `whatsapp`: WhatsApp number
- `linkedin`: LinkedIn profile
- `company`: Current company
- `role`: Current role
- `status`: Active/Inactive
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Events Table
- `id`: Primary key
- `name`: Event name
- `description`: Event description
- `date`: Event date
- `color`: Color for calendar display
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Invitations Table
- `id`: Primary key
- `title`: Invitation title
- `description`: Invitation message
- `target_dept`: Target department
- `attachment_url`: Optional attachment
- `sent_at`: Sent timestamp
- `created_at`: Creation timestamp

### Thank You Letters Table
- `id`: Primary key
- `message`: Thank you message
- `target_dept`: Target department
- `attachment_url`: Optional attachment
- `sent_at`: Sent timestamp
- `created_at`: Creation timestamp

## API Endpoints

The application uses the following REST API endpoints through Supabase:

### Alumni
- `GET /alumni` - Get all alumni
- `GET /alumni?id=eq.{id}` - Get alumni by ID
- `POST /alumni` - Create new alumni
- `PATCH /alumni?id=eq.{id}` - Update alumni
- `DELETE /alumni?id=eq.{id}` - Delete alumni

### Events
- `GET /events` - Get all events
- `POST /events` - Create new event
- `PATCH /events?id=eq.{id}` - Update event
- `DELETE /events?id=eq.{id}` - Delete event

### Invitations
- `GET /invitations` - Get all invitations
- `POST /invitations` - Create new invitation

### Thank You Letters
- `GET /thank_you_letters` - Get all thank you letters
- `POST /thank_you_letters` - Create new thank you letter

## Security

The database uses Row Level Security (RLS) with policies that allow all operations for now. In production, you should:

1. Create proper authentication
2. Set up user-specific policies
3. Restrict access based on user roles
4. Add input validation and sanitization

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your environment variables are set correctly
   - Ensure the API key is the anon/public key, not the service role key

2. **"Table doesn't exist" error**
   - Make sure you've run the database schema SQL
   - Check that table names match exactly

3. **CORS errors**
   - Add your domain to the allowed origins in Supabase settings
   - For development, localhost should work by default

4. **Data not loading**
   - Check the browser console for errors
   - Verify your Supabase project is active
   - Check the Network tab for failed API calls

### Getting Help

- Check the Supabase documentation: https://supabase.com/docs
- Review the browser console for error messages
- Check the Supabase dashboard logs for server-side errors

## Next Steps

1. Set up authentication with Supabase Auth
2. Add user roles and permissions
3. Implement real-time subscriptions
4. Add data validation and error handling
5. Set up automated backups
6. Add monitoring and analytics
