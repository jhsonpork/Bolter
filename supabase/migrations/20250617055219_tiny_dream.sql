/*
  # Create saved campaigns table

  1. New Tables
    - `saved_campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `name` (text)
      - `ad_data` (jsonb)
      - `campaign_data` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
      - `type` (text)
  2. Security
    - Enable RLS on `saved_campaigns` table
    - Add policies for authenticated users to manage their own campaigns
*/

-- Create saved_campaigns table
CREATE TABLE IF NOT EXISTS saved_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  ad_data JSONB,
  campaign_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  type TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE saved_campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_saved_campaigns_updated_at
BEFORE UPDATE ON saved_campaigns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();