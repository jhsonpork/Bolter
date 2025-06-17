/*
  # Final Database Schema Fix

  This migration completely rebuilds the database schema from scratch with unique names
  to avoid any conflicts with previous migrations.
*/

-- Start with a clean slate by dropping everything first
DO $$
BEGIN
    -- Drop tables if they exist (in reverse order of dependencies)
    DROP TABLE IF EXISTS saved_campaigns CASCADE;
    DROP TABLE IF EXISTS profiles CASCADE;
    
    -- Drop all functions that might exist from previous migrations
    DROP FUNCTION IF EXISTS update_updated_at() CASCADE;
    DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
    DROP FUNCTION IF EXISTS update_timestamp_trigger_func() CASCADE;
    DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
    DROP FUNCTION IF EXISTS handle_new_user_signup() CASCADE;
    DROP FUNCTION IF EXISTS nexus_update_timestamp() CASCADE;
    DROP FUNCTION IF EXISTS nexus_handle_new_user() CASCADE;
    DROP FUNCTION IF EXISTS nexusai_update_timestamp() CASCADE;
    DROP FUNCTION IF EXISTS nexusai_handle_new_user() CASCADE;
EXCEPTION
    WHEN OTHERS THEN
        -- Continue even if there are errors
        NULL;
END $$;

-- Create the timestamp update function with a unique name
CREATE OR REPLACE FUNCTION nexusai_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create unique index on email
CREATE UNIQUE INDEX idx_profiles_email ON profiles(email);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policy for profiles
CREATE POLICY "nexusai_profiles_policy" ON profiles
    FOR ALL USING (auth.uid() = id);

-- Create trigger with unique name for profiles
CREATE TRIGGER nexusai_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION nexusai_update_timestamp();

-- Create saved_campaigns table
CREATE TABLE saved_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    ad_data JSONB,
    campaign_data JSONB,
    type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable RLS on saved_campaigns
ALTER TABLE saved_campaigns ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policy for saved_campaigns
CREATE POLICY "nexusai_campaigns_policy" ON saved_campaigns
    FOR ALL USING (auth.uid() = user_id);

-- Create trigger with unique name for saved_campaigns
CREATE TRIGGER nexusai_campaigns_updated_at
    BEFORE UPDATE ON saved_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION nexusai_update_timestamp();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION nexusai_handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but continue
        RAISE NOTICE 'Error creating profile: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation with unique name
DROP TRIGGER IF EXISTS nexusai_on_auth_user_created ON auth.users;
CREATE TRIGGER nexusai_on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION nexusai_handle_new_user();