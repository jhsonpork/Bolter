-- Migration: 20250617201500_final_fix.sql
-- This migration will definitively fix all trigger and table conflicts

-- Use a transaction to ensure all operations succeed or fail together
BEGIN;

-- Drop triggers using dynamic SQL to avoid errors
DO $$
DECLARE
    trigger_exists boolean;
BEGIN
    -- Check and drop update_profiles_updated_at trigger
    SELECT EXISTS (
        SELECT 1 FROM pg_catalog.pg_trigger 
        WHERE tgname = 'update_profiles_updated_at' 
        AND tgrelid = 'profiles'::regclass::oid
    ) INTO trigger_exists;
    
    IF trigger_exists THEN
        EXECUTE 'DROP TRIGGER update_profiles_updated_at ON profiles';
    END IF;
    
    -- Check and drop update_saved_campaigns_updated_at trigger
    SELECT EXISTS (
        SELECT 1 FROM pg_catalog.pg_trigger 
        WHERE tgname = 'update_saved_campaigns_updated_at' 
        AND tgrelid = 'saved_campaigns'::regclass::oid
    ) INTO trigger_exists;
    
    IF trigger_exists THEN
        EXECUTE 'DROP TRIGGER update_saved_campaigns_updated_at ON saved_campaigns';
    END IF;
    
EXCEPTION
    WHEN undefined_table THEN
        -- Tables don't exist, which is fine
        NULL;
    WHEN OTHERS THEN
        -- Continue even if there are other errors
        NULL;
END $$;

-- Drop tables and functions (these commands are safe even if objects don't exist)
DROP TABLE IF EXISTS saved_campaigns CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- Now create everything fresh
-- Create the timestamp update function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create profiles table
CREATE TABLE profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email text UNIQUE NOT NULL,
    full_name text,
    avatar_url text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create saved_campaigns table
CREATE TABLE saved_campaigns (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    ad_data jsonb,
    campaign_data jsonb,
    type text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on saved_campaigns
ALTER TABLE saved_campaigns ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for saved_campaigns
CREATE POLICY "Users can view their own campaigns" ON saved_campaigns
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own campaigns" ON saved_campaigns
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" ON saved_campaigns
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" ON saved_campaigns
    FOR DELETE USING (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_saved_campaigns_updated_at
    BEFORE UPDATE ON saved_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Create a function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- If the profile already exists, just return the NEW record
        RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

COMMIT;