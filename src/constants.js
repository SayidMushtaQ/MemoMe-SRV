const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const CONTENT_FILTER_REGEX =
  /\b(?:fuck|shit|bitch|asshole|damn|cunt|dick|pussy|bastard|whore|slut|nigger|faggot|sex|sexual|porn|pornography|nude|nudity|cock|cum|suck|blowjob|handjob|anal|oral|rape|molest|incest)\b/i;
const DB_NAME = "MemoMe";
const DATA_LIMIT = "16kb";
const API_URL = "/api/v1";
const excludedAuthPaths = [
  "/",
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/sentVerifyCode",
  "/api/v1/auth/verifyEmail",
  "/api/v1/auth/reset-password",
  "/api/v1/auth/reset-password/:token"
];
const RESET_PARAMS_REGEX =
  /^\/api\/v1\/auth\/reset-password\/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
const FRONT_END_URI = "http://localhost:5173";

export {
  EMAIL_REGEX,
  CONTENT_FILTER_REGEX,
  DB_NAME,
  DATA_LIMIT,
  API_URL,
  excludedAuthPaths,
  RESET_PARAMS_REGEX,
  FRONT_END_URI
};
