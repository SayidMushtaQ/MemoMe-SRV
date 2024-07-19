import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";
export const sentVerifyCode = asynHandler(async (req, res) => {
  /**
   * [+] User Verify
   * 1) Get user Data from Browser
   * 2) Generate OTP
   * 3) Validate the user
   * 4) Send OTP to email
   * 5) Store the OTP to the User and Exp
   */
  const localUser = req.user;
  if (!localUser)
    throw new ApiError(401, "Access denied. Please log in to continue.", [
      "Unauthorized"
    ]);
  const verifyOTP = Math.floor(10000 + Math.random() * 90000).toString();
  if (!verifyOTP) {
    throw new ApiError(500, "Something went wrong..!!", ["Internal Server Error"]);
  }
  const isEmailSent = await sendEmailVerification("", verifyOTP);
  console.log(isEmailSent);
  res.send("ok");
});
