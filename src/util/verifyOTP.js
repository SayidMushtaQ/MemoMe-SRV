export const verifyOTP = (verifyCodeExpiry, verifyCode, otp) => {
  try {
    const currentTime = new Date();
    const expireTime = new Date(verifyCodeExpiry);
    const isCodeNotExpire = currentTime.getTime() > expireTime.getTime();
    const isCodeValid = verifyCode === otp;
    return {
      isCodeNotExpire,
      isCodeValid,
      success: true,
      message: "Verify successfully"
    };
  } catch (otpError) {
    console.error("Error: verification OTP", otpError);
    return { success: false, message: "Failed to verify OTP" };
  }
};
