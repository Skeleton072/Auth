const { createClient } = require("@supabase/supabase-js");
const config = require("../index");

const supabase = createClient(
  config.supabase.supabaseUrl,
  config.supabase.supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

module.exports = supabase;
