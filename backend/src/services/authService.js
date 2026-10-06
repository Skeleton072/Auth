const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const { findByEmail, createUser, insertOtp, findByEmailFromOtp, updateEmailVerified, addOtpAttempts } = require("../repositories/authRepository");

async function registerUser(name, email, password) {
  const otpCode = Math.floor(Math.random() * 1000000);
  const html = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
      <tr>
          <td style="padding: 40px 20px;">
              <!-- Header -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td style="text-align: center; padding-bottom: 30px;">
                          <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0;">Verification Code</h1>
                      </td>
                  </tr>
              </table>
              <!-- Content Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <tr>
                      <td style="padding: 40px 30px;">
                          <!-- Intro Text -->
                          <p style="color: #6b7280; font-size: 16px; line-height: 24px; margin: 0 0 24px 0;">
                              Please use the following verification code to complete your request:
                          </p>
                          <!-- OTP Code -->
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 32px 0;">
                              <tr>
                                  <td style="text-align: center;">
                                      <div style="background: #4f46e5; color: white; font-size: 32px; font-weight: 700; letter-spacing: 8px; padding: 16px 24px; border-radius: 6px; display: inline-block;">
                                          ${otpCode}
                                      </div>
                                  </td>
                              </tr>
                          </table>
                          <!-- Expiration Notice -->
                          <p style="color: #6b7280; font-size: 14px; line-height: 20px; margin: 0 0 24px 0; text-align: center;">
                              This code will expire in <strong style="color: #dc2626;">5 minutes</strong>
                          </p>
                          <!-- Security Notice -->
                          <div style="background: #fef3f2; border: 1px solid #fecaca; border-radius: 6px; padding: 16px; margin-top: 24px;">
                              <p style="color: #92400e; font-size: 14px; line-height: 20px; margin: 0;">
                                  <strong>Security tip:</strong> Never share this code with anyone. Our team will never ask for your verification code.
                              </p>
                          </div>
                      </td>
                  </tr>
              </table>
              <!-- Footer -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                  <tr>
                      <td style="text-align: center;">
                          <p style="color: #9ca3af; font-size: 12px; line-height: 16px; margin: 0;">
                              If you didn't request this code, please ignore this email or contact support if you have concerns.
                          </p>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>
  `;

  // checking if email exists
  const { data: emailData } = await findByEmail(email);

  if (emailData[0]) throw new Error("Email has already registered");

  // inserting user credentials to the supabase
  const passwordhash = await bcrypt.hash(password, 10);
  const { data: userData, error: userError } = await createUser(name, email, passwordhash);
  if (userError) throw new Error(userError.message);

  const user_id = userData[0].id;

  // inserting OTP code to the supabase
  const code_hash = await bcrypt.hash(otpCode, 10);
  const { data: otpData, error: otpError } = await insertOtp(user_id, code_hash);
  if (otpError) throw new Error(otpError.message);

  // sending OTP code to the user
  await sendEmail(email, "Verify OTP Code", html);

  return otpData;
}

async function verifyEmail(email, otpCode) {
  const { data, error } = await findByEmailFromOtp(email);

  if (error) throw new Error(error.message);

  const code_hash = data[0].code_hash;

  const verify = await bcrypt.compare(otpCode, code_hash);

  if (!verify) {
    await addOtpAttempts(email, data[0].attempts);
    throw new Error("Wrong OTP");
  };

  await updateEmailVerified(email);

  return;
}

module.exports = { registerUser, verifyEmail };
