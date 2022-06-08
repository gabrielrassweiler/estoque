import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nylxuifdunbgdscdxiyz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bHh1aWZkdW5iZ2RzY2R4aXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ2OTU1NTUsImV4cCI6MTk3MDI3MTU1NX0.V30uhYVrIMuoAtaA8a2nxRFSc9UsFJ2fWfPFiM1IDeE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function useSupabase () {
  return {
    supabase
  }
}
