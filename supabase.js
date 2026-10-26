const SUPABASE_URL =
  "https://cvczerjsrwldzbaebhdd.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_A7-SqavsRc6RI_igrREYTw_v1aXZyOt";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
