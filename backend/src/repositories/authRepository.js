const supabase = require("../config/supabaseConfig/db");
const bcrypt = require("bcrypt");

async function findByEmail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq(email)
    .single();

  return { data, error };
}

async function createUser(name, email, passwordhash) {
  const { data, error } = await supabase
    .from("users")
    .upsert({ name, email, passwordhash })
    .select("id")
    .single();

  return { data, error };
}

async function insertOtp(user_id, code_hash) {
  const { data, error } = await supabase
    .from("email_verification")
    .upsert({ user_id, code_hash });

  return { data, error };
}

async function findByEmailFromOtp(email) {
  const { data, error } = await supabase
    .from("email_verification")
    .select("code_hash, attempts")
    .eq("email", email);

  return { data, error };
}

async function updateEmailVerified(email) {
  const { data, error } = await supabase
    .from("users")
    .update({ email_verified: true });

  return { data, error };
}

async function addOtpAttempts(email, newAttempts) {
  const { data, error } = await supabase
    .from("email_verification")
    .update({ attemepts: newAttempts + 1 });

  return { data, error };
}

module.exports = { findByEmail, createUser, insertOtp, findByEmailFromOtp, updateEmailVerified, addOtpAttempts };