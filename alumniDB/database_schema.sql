-- Alumni Database Schema for Supabase
-- Run these commands in your Supabase SQL editor

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

-- Insert sample data
INSERT INTO alumni (name, year, dept, email, phone, whatsapp, linkedin, company, role, status) VALUES
('Deepak Raja', '2023', 'CSE', 'deepak@example.com', '9876543210', '9876543210', 'linkedin.com/in/deepak', 'TechCorp Pvt Ltd', 'Software Engineer', 'Active'),
('Suresh Kumar', '2022', 'ECE', 'suresh@example.com', '8765432190', '8765432190', 'linkedin.com/in/suresh', 'Tech Solutions Inc', 'Hardware Engineer', 'Inactive'),
('Priya Sharma', '2021', 'IT', 'priya@example.com', '7654321098', '7654321098', 'linkedin.com/in/priya', 'DataTech Corp', 'Data Scientist', 'Active'),
('Rajesh Patel', '2020', 'MECH', 'rajesh@example.com', '6543210987', '6543210987', 'linkedin.com/in/rajesh', 'MechTech Ltd', 'Mechanical Engineer', 'Active'),
('Anita Singh', '2023', 'EEE', 'anita@example.com', '5432109876', '5432109876', 'linkedin.com/in/anita', 'PowerCorp', 'Electrical Engineer', 'Active');

INSERT INTO events (name, description, date, color) VALUES
('Workout Session', 'Fitness activities for alumni', '2025-10-10', 'bg-red-200'),
('Coffee Chat', 'Informal networking session', '2025-10-12', 'bg-red-200'),
('Performance Review', 'Annual performance discussions', '2025-10-15', 'bg-purple-200'),
('Dashboard Research', 'Research and development meeting', '2025-10-15', 'bg-blue-200'),
('Annual Alumni Meet', 'Main alumni gathering event', '2025-10-15', 'bg-purple-200'),
('DS Org Regroup', 'Data science organization meeting', '2025-10-18', 'bg-red-200'),
('Prep for All Hands', 'Preparation for company meeting', '2025-10-18', 'bg-purple-200'),
('Q4 Results Share', 'Quarterly results presentation', '2025-10-20', 'bg-purple-200'),
('Tech Talk Series', 'Technology discussion session', '2025-10-20', 'bg-red-200'),
('Operations Research', 'Operations and research meeting', '2025-10-22', 'bg-blue-200'),
('Client Meeting', 'Important client discussion', '2025-10-22', 'bg-purple-200'),
('Team Building', 'Team building activities', '2025-10-25', 'bg-red-200'),
('Career Fair', 'Career opportunities showcase', '2025-10-25', 'bg-purple-200'),
('Team Standup', 'Daily team coordination', '2025-10-28', 'bg-blue-200'),
('Project Review', 'Project progress evaluation', '2025-10-28', 'bg-purple-200');

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
