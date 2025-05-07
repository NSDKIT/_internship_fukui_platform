/*
  # Fix Profile RLS Policies

  1. Changes
    - Add RLS policy for profile creation during registration
    - Add RLS policy for profile updates
    
  2. Security
    - Enable RLS on profiles table (if not already enabled)
    - Add policy for authenticated users to create their own profile
    - Add policy for authenticated users to update their own profile
    - Add policy for public read access to profiles
*/

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create comprehensive RLS policies
CREATE POLICY "Allow users to create their own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow public read access to profiles"
ON profiles
FOR SELECT
TO public
USING (true);