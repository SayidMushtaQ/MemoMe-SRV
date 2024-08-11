const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const CONTENT_FILTER_REGEX =
  /\b(?:fuck|shit|bitch|asshole|damn|cunt|dick|pussy|bastard|whore|slut|nigger|faggot|sex|sexual|porn|pornography|nude|nudity|cock|cum|suck|blowjob|handjob|anal|oral|rape|molest|incest)\b/i;
const DB_NAME = "MemoMe";
const DATA_LIMIT = "16kb";
const API_URL = "/api";
const excludedAuthPaths = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/sentVerifyCode",
  "/api/auth/verifyEmail",
  "/api/auth/forgotPassword",
  "/api/auth/resetPassword"
];

export {
  EMAIL_REGEX,
  CONTENT_FILTER_REGEX,
  DB_NAME,
  DATA_LIMIT,
  API_URL,
  excludedAuthPaths
};
