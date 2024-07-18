const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const BAD_WORD_REGEX =
  /\b(?:fuck|shit|bitch|asshole|damn|cunt|dick|pussy|bastard|whore|slut|nigger|faggot|sex|sexual|porn|pornography|nude|nudity|cock|cum|suck|blowjob|handjob|anal|oral|rape|molest|incest)\b/i;
const DB_NAME = "MemoMe";
const DATA_LIMIT = "16kb";
const API_URL = "/api/v1";
export { EMAIL_REGEX, BAD_WORD_REGEX, DB_NAME, DATA_LIMIT, API_URL };
