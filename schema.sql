-- Run this in your Supabase SQL Editor to set up the registration table

create table registrations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  student_email text not null,
  student_id text not null, -- Student Registration ID
  faculty text not null, -- Faculty selection
  department text not null, -- Department selection
  year_of_study text not null,
  team_name text not null,
  team_size int not null check (team_size >= 1 and team_size <= 3),
  tools_interested text[], -- Array containing Qoder, QoderWork, MuleRun
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table registrations enable row level security;

-- Allow anyone to submit a registration (fixes RLS policy errors when email verification is on)
create policy "Allow insert for all users" 
on registrations for insert 
to public 
with check (true);

-- Create policy to allow users to view their own registrations (requires login)
create policy "Allow read for owner" 
on registrations for select 
to authenticated 
using (auth.uid() = user_id);
