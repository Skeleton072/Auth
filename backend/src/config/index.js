const auth = require("./auth");
const redis = require("./redis");
const supabase = require("./supabase");
const session = require("./session");
const email = require("./email");

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,

  auth,
  redis,
  supabase,
  session,
  email
}