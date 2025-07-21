// backend/config/nodemailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can also use SMTP config here for production
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"FOREVER" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

// ✅ Export default for ES Modules
export default sendMail;
