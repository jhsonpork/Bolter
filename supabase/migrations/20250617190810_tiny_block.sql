/*
  # Fix all migration issues

  1. Changes
    - Drop all existing tables if they exist
    - Drop all existing triggers if they exist
    - Drop all existing functions if they exist
    - Recreate the profiles table with proper structure
    - Recreate the saved_campaigns table with proper structure
    - Create a single update_timestamp function
    - Create proper triggers for both tables
    - Set up appropriate RLS policies
*/

-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS saved_campaigns;
DROP TABLE IF EXISTS profiles;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_saved_campaigns_updated_at ON saved_campaigns;

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS update_updated_at();

-- Create the update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Create saved_campaigns table
CREATE TABLE saved_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  ad_data JSONB,
  campaign_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  type TEXT NOT NULL
);

-- Enable Row Level Security on saved_campaigns
ALTER TABLE saved_campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_campaigns
CREATE POLICY "Users can view their own campaigns"
  ON saved_campaigns
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own campaigns"
  ON saved_campaigns
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns"
  ON saved_campaigns
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns"
  ON saved_campaigns
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for saved_campaigns
CREATE TRIGGER update_saved_campaigns_updated_at
BEFORE UPDATE ON saved_campaigns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();