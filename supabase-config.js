// Supabase Configuration for AI Builders Hackathon
const SUPABASE_URL = "https://tdgsbuomjtezhpnauzvc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZ3NidW9tanRlemhwbmF1enZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NTEyOTYsImV4cCI6MjEwMDAyNzI5Nn0.FKH-p_wwCYXz3TvHRFdcCJRpZHMqoedpXSGQCvHmm4g";

// Initialize Supabase Client (using a unique name to avoid conflicts with global CDN library)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
