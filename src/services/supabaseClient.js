import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dqzeilxxuaehxrngptsw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxemVpbHh4dWFlaHhybmdwdHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NTQyODAsImV4cCI6MjA3NjMzMDI4MH0.8LDZVyqVmzO_oiWo1gMDb2NilIFywWjaXiuvoNPBbcw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);