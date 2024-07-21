import { EMAIL_REGEX } from "../constants.js";
export const userIdentifierHandler = userIdentifier => {
  let email, userName;
  if (EMAIL_REGEX.test(userIdentifier)) {
    email = userIdentifier;
  } else {
    userName = userIdentifier;
  }
  return { email, userName };
};
