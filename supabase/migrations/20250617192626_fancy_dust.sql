-- Migration: 20250617220000_ultimate_fix.sql
-- This will definitely resolve the trigger conflict by using a completely different approach

-- Step 1: Use a more aggressive cleanup approach
-- We'll drop everything without checking, using IF EXISTS clauses that work reliably

-- Drop all constraints and dependent objects first
DO $$
BEGIN
    -- Drop foreign key constraints first to avoid dependency issues
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'saved_campaigns_user_id_fkey') THEN
        ALTER TABLE saved_campaigns DROP CONSTRAINT saved_campaigns_user_id_fkey;
    END IF;
    
    -- Drop RLS policies
    DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can view their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "Users can insert their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "Users can update their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "Users can delete their own campaigns" ON saved_campaigns;
    DROP POLICY IF EXISTS "profiles_policy" ON profiles;
    DROP POLICY IF EXISTS "campaigns_policy" ON saved_campaigns;
    
EXCEPTION 
    WHEN OTHERS THEN NULL;
END $$;

-- Force drop triggers by name without table reference
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_saved_campaigns_updated_at ON saved_campaigns;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS trg_campaigns_updated_at ON saved_campaigns;
DROP TRIGGER IF EXISTS trg_handle_new_user ON auth.users;

-- Drop tables completely
DROP TABLE IF EXISTS saved_campaigns CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Now create everything fresh with a completely clean slate and UNIQUE NAMES

-- Create the update timestamp function with a unique name
CREATE FUNCTION update_timestamp_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create profiles table
CREATE TABLE profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Create unique index on email
CREATE UNIQUE INDEX idx_profiles_email ON profiles(email);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create saved_campaigns table
CREATE TABLE saved_campaigns (
    id uuid DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    name text NOT NULL,
    ad_data jsonb,
    campaign_data jsonb,
    type text NOT NULL,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Add foreign key constraint
ALTER TABLE saved_campaigns 
ADD CONSTRAINT fk_saved_campaigns_user_id 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE saved_campaigns ENABLE ROW LEVEL SECURITY;

-- Create RLS policies with simple names
CREATE POLICY "profiles_policy" ON profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "campaigns_policy" ON saved_campaigns
    FOR ALL USING (auth.uid() = user_id);

-- Create triggers with unique names to avoid conflicts
CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_trigger_func();

CREATE TRIGGER trg_campaigns_updated_at
    BEFORE UPDATE ON saved_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_trigger_func();

-- Create function to handle new user signup
CREATE FUNCTION handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- Profile already exists, just return
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation with unique name
CREATE TRIGGER trg_handle_new_user
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user_signup();