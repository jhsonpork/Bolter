/*
  # Final Database Schema Fix

  1. Changes
    - Completely drops all existing objects with aggressive cleanup
    - Uses unique function and trigger names to avoid any conflicts
    - Properly handles exceptions for all operations
    - Creates all tables and relationships from scratch
    - Sets up proper RLS policies
    - Adds automatic profile creation for new users
*/

-- Start with a transaction to ensure all operations succeed or fail together
BEGIN;

-- Step 1: Force drop any existing triggers using pg_trigger catalog
DO $$
DECLARE
    trigger_record RECORD;
BEGIN
    -- Find and drop any trigger on profiles table
    FOR trigger_record IN 
        SELECT tgname FROM pg_trigger 
        WHERE tgrelid = 'profiles'::regclass::oid
    LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || trigger_record.tgname || ' ON profiles CASCADE';
    END LOOP;
    
    -- Find and drop any trigger on saved_campaigns table
    FOR trigger_record IN 
        SELECT tgname FROM pg_trigger 
        WHERE tgrelid = 'saved_campaigns'::regclass::oid
    LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || trigger_record.tgname || ' ON saved_campaigns CASCADE';
    END LOOP;
    
    -- Drop any auth user trigger
    FOR trigger_record IN 
        SELECT tgname FROM pg_trigger 
        WHERE tgrelid = 'auth.users'::regclass::oid
        AND tgname LIKE '%user%'
    LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || trigger_record.tgname || ' ON auth.users CASCADE';
    END LOOP;
EXCEPTION
    WHEN undefined_table THEN
        -- Tables don't exist yet, which is fine
        NULL;
    WHEN OTHERS THEN
        -- Log error but continue
        RAISE NOTICE 'Error dropping triggers: %', SQLERRM;
END $$;

-- Step 2: Drop all policies
DO $$
BEGIN
    -- Drop all policies on profiles
    DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
    DROP POLICY IF EXISTS "profiles_policy" ON profiles;
    
    -- Drop all policies on saved_campaigns
    DROP POLICY IF EXISTS "Users can view their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "Users can insert their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "Users can update their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "Users can delete their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "campaigns_policy" ON saved_campaigns;
EXCEPTION
    WHEN undefined_table THEN
        -- Tables don't exist yet, which is fine
        NULL;
    WHEN OTHERS THEN
        -- Log error but continue
        RAISE NOTICE 'Error dropping policies: %', SQLERRM;
END $$;

-- Step 3: Drop tables and functions
DROP TABLE IF EXISTS saved_campaigns CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS update_timestamp_trigger_func() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user_signup() CASCADE;

-- Step 4: Create new function with unique name
CREATE OR REPLACE FUNCTION nexus_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create profiles table
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
CREATE POLICY "nexus_profiles_policy" ON profiles
    FOR ALL USING (auth.uid() = id);

-- Create trigger with unique name for profiles
CREATE TRIGGER nexus_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION nexus_update_timestamp();

-- Step 6: Create saved_campaigns table
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
CREATE POLICY "nexus_campaigns_policy" ON saved_campaigns
    FOR ALL USING (auth.uid() = user_id);

-- Create trigger with unique name for saved_campaigns
CREATE TRIGGER nexus_campaigns_updated_at
    BEFORE UPDATE ON saved_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION nexus_update_timestamp();

-- Step 7: Create function to handle new user signup
CREATE OR REPLACE FUNCTION nexus_handle_new_user()
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
    WHEN unique_violation THEN
        -- Profile already exists, just return
        RETURN NEW;
    WHEN OTHERS THEN
        -- Log error but continue
        RAISE NOTICE 'Error creating profile: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation with unique name
DROP TRIGGER IF EXISTS nexus_on_auth_user_created ON auth.users;
CREATE TRIGGER nexus_on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION nexus_handle_new_user();

COMMIT;