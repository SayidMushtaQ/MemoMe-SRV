import { transporter } from "../config/nodemailer.config.js";

export const sendEmailVerification = async (email, userName, otp) => {
  try {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2 style="color: #4CAF50;">Dear user: ${userName} Your OTP Verification Code</h2>
          <p style="font-size: 18px;">Use the following OTP to complete your verification:</p>
          <p style="font-size: 24px; font-weight: bold; color: #333;">${otp}</p>
          <p style="font-size: 14px; color: #777;">This OTP is valid for the next 5 minutes.</p>
        </div>
      `;
    await transporter.sendMail({
      from: `'"MemoMe 🦄" <${process.env.EMAIL_USERNAME}>'`,
      to: email,
      subject: "OTP Verification",
      html: htmlContent
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
};
