import { transporter } from "../config/nodemailer.config.js";

export const sendResetPasswordMail = async (email, userName, URI) => {
  try {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2 style="color: #4CAF50;">Dear user: ${userName} Your FORGOT Password URI</h2>
          <p style="font-size: 18px;">Use the following URI to RESET your Password:</p>
          <p style="font-size: 24px; font-weight: bold; color: #333;">${URI}</p>
          <p style="font-size: 14px; color: #777;">This URI is valid for the next 10 minutes.</p>
        </div>
      `;
    await transporter.sendMail({
      from: `'"MemoMe 🦄" <${process.env.EMAIL_USERNAME}>'`,
      to: email,
      subject: "Forgot Password 🚀",
      html: htmlContent
    });
    return { success: true, message: "Forgot password URI sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send FORGOT Password URI" };
  }
};
