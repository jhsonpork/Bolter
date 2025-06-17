/*
  # Create saved_campaigns table

  1. New Tables
    - `saved_campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles.id)
      - `name` (text, not null)
      - `ad_data` (jsonb)
      - `campaign_data` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
      - `type` (text, not null)
  2. Security
    - Enable RLS on `saved_campaigns` table
    - Add policies for authenticated users to manage their own campaigns
*/

CREATE TABLE IF NOT EXISTS saved_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  ad_data jsonb,
  campaign_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  type text NOT NULL
);

ALTER TABLE saved_campaigns ENABLE ROW LEVEL SECURITY;

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_saved_campaigns_updated_at
BEFORE UPDATE ON saved_campaigns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Create policies
CREATE POLICY "Users can insert their own campaigns"
  ON saved_campaigns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns"
  ON saved_campaigns FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own campaigns"
  ON saved_campaigns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns"
  ON saved_campaigns FOR DELETE
  USING (auth.uid() = user_id);