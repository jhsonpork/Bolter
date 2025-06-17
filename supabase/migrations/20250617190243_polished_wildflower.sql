/*
# Fix duplicate triggers

1. Changes
   - Drop existing triggers if they exist
   - Drop existing functions if they exist
   - Recreate the update_updated_at function
   - Recreate triggers for both tables
*/

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_saved_campaigns_updated_at ON saved_campaigns;

-- Drop the function if it exists
DROP FUNCTION IF EXISTS update_updated_at();

-- Re-create the update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Re-create the triggers
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_saved_campaigns_updated_at
BEFORE UPDATE ON saved_campaigns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();