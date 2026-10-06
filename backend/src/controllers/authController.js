const supabase = require("../config/supabaseConfig/db");
const { registerUser, verifyEmail } = require("../services/authService");

function isEmailValid(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

async function loginFunction(req, res) {
  try {
    const { name, password } = req.body;

    console.log("name :", name);
    console.log("password :", password);

    const userData = { name, gender: "male" };

    const { data, error } = await supabase
      .from("users")
      .upsert(userData);

    if (error) return res.status(400).json({ message: error.message });

    console.log("successfully uploaded");
    return res.status(200).json({ message: "Successfully uploaded." });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function signUpFunction(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!isEmailValid(email)) return res.status(400).json({ message: "Email is not in valid form" });
    
    await registerUser(name, email, password);

    return res.status(200).json({ message: "Successfully created an account." });
  } catch (error) {
    const statusCode = error.message.includes("registered") ? 400 : 500;
    return res.status(statusCode).json({ error: error.message });
  }
}

async function verifyEmailFunction(req, res) {
  try {
    const { email, otpCode } = req.body;

    await verifyEmail(email, otpCode);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { loginFunction, signUpFunction, verifyEmailFunction }