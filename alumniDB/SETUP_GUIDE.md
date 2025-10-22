# Alumni Scholarship Database System

A modern web application for managing alumni and student data with authentication, events, and communication features.

## Features

- **Modern Login/Signup UI**: Beautiful gradient-based login interface with Student/Alumni toggle
- **Supabase Integration**: Complete authentication and database management
- **User Management**: Separate tables for students and alumni
- **Event Calendar**: Interactive calendar with event management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Build Tool**: Vite

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### 2. Clone and Install

```bash
git clone <repository-url>
cd alumniDB
npm install
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL commands from `database_schema.sql`:

```sql
-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year VARCHAR(10),
  dept VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  linkedin VARCHAR(255),
  company VARCHAR(255),
  role VARCHAR(255),
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  user_type VARCHAR(20) DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alumni table
CREATE TABLE IF NOT EXISTS alumni (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year VARCHAR(10) NOT NULL,
  dept VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  linkedin VARCHAR(255),
  company VARCHAR(255),
  role VARCHAR(255),
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  user_type VARCHAR(20) DEFAULT 'alumni',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  color VARCHAR(50) DEFAULT 'bg-blue-200',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  target_dept VARCHAR(50) NOT NULL,
  attachment_url TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create thank_you_letters table
CREATE TABLE IF NOT EXISTS thank_you_letters (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  target_dept VARCHAR(50) NOT NULL,
  attachment_url TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_dept ON students(dept);
CREATE INDEX IF NOT EXISTS idx_students_roll_number ON students(roll_number);
CREATE INDEX IF NOT EXISTS idx_alumni_email ON alumni(email);
CREATE INDEX IF NOT EXISTS idx_alumni_status ON alumni(status);
CREATE INDEX IF NOT EXISTS idx_alumni_dept ON alumni(dept);
CREATE INDEX IF NOT EXISTS idx_alumni_roll_number ON alumni(roll_number);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_invitations_target_dept ON invitations(target_dept);
CREATE INDEX IF NOT EXISTS idx_thank_you_letters_target_dept ON thank_you_letters(target_dept);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE thank_you_letters ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on students" ON students FOR ALL USING (true);
CREATE POLICY "Allow all operations on alumni" ON alumni FOR ALL USING (true);
CREATE POLICY "Allow all operations on events" ON events FOR ALL USING (true);
CREATE POLICY "Allow all operations on invitations" ON invitations FOR ALL USING (true);
CREATE POLICY "Allow all operations on thank_you_letters" ON thank_you_letters FOR ALL USING (true);
```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Authentication

1. **Sign Up**: Users can create accounts as either Students or Alumni
2. **Login**: Users can log in using their email and password
3. **User Types**: The system supports both Student and Alumni user types with different dashboards

### Features

- **Home Page**: Displays calendar with events and statistics
- **Login Page**: Modern UI with Student/Alumni toggle
- **Signup Page**: Comprehensive form for user registration
- **Dashboard**: User-specific dashboard based on user type
- **Event Management**: View and manage alumni events
- **User Management**: Admin can manage alumni and student data

## Project Structure

```
src/
├── Components/          # Reusable components
├── Pages/              # Page components
│   ├── Login.tsx       # Login page with modern UI
│   ├── Signup.tsx      # Signup page with form validation
│   ├── Dashboard.tsx   # Admin dashboard
│   ├── Alumnipage.tsx  # Alumni dashboard
│   └── ...
├── services/           # API and authentication services
│   ├── auth.ts         # Authentication service
│   └── api.ts          # API service
├── supabaseClient.js   # Supabase client configuration
└── ...
```

## Environment Variables

Create a `.env.local` file with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

The application uses the following main tables:

- **students**: Student user data
- **alumni**: Alumni user data  
- **events**: Calendar events
- **invitations**: Event invitations
- **thank_you_letters**: Thank you letters

## Authentication Flow

1. User selects Student or Alumni type
2. User fills out registration form
3. Account is created in Supabase Auth
4. User data is inserted into appropriate table (students/alumni)
5. User receives email verification
6. User can log in and access their dashboard

## Customization

### UI Themes
- Home page uses red-to-white gradient [[memory:2477832]]
- Other pages use blue-to-white gradient
- Modern gradient buttons and form elements

### Departments
Supported departments:
- CSE (Computer Science Engineering)
- ECE (Electronics & Communication Engineering)
- IT (Information Technology)
- EEE (Electrical & Electronics Engineering)
- MECH (Mechanical Engineering)
- CIVIL (Civil Engineering)
- CHEM (Chemical Engineering)
- AERO (Aerospace Engineering)

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**: Check your environment variables
2. **Authentication Issues**: Verify Supabase Auth settings
3. **Database Errors**: Check RLS policies and table permissions

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
