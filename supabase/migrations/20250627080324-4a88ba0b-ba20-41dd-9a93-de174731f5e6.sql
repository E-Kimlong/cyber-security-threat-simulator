
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table to track daily scan usage for free trial
CREATE TABLE public.user_scan_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  scan_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, scan_date)
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles - users can only see their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy for profiles - users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create policy for profiles - users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Enable RLS on user_scan_usage table
ALTER TABLE public.user_scan_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for scan usage - users can only see their own usage
CREATE POLICY "Users can view their own scan usage"
  ON public.user_scan_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for scan usage - users can update their own usage
CREATE POLICY "Users can update their own scan usage"
  ON public.user_scan_usage
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for scan usage - users can insert their own usage
CREATE POLICY "Users can insert their own scan usage"
  ON public.user_scan_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
