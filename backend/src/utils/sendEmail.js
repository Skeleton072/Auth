const nodemailer = require("nodemailer");
const config = require("../config/index");

async function sendEmail(to, subject, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "smtp.yourservice.com"
      auth: {
        user: config.email.emailUser,
        pass: config.email.emailPass,
      },
    });

    await transporter.sendMail({
      from: "LMS",
      to,
      subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

module.exports = sendEmail;
