import { getUSerToken } from "../service/auth.js";

function checkcookies(tokenName) {
  return async (req, res, next) => {
    // console.log(req);
    const cookies = req.cookies[tokenName];
    if (!cookies) {
      global.isAuthenticated = false;
      return next();
    }
    try {
      const userPayload = await getUSerToken(cookies);
      if (userPayload) {
        global.isAuthenticated = true;
      } else {
        global.isAuthenticated = false;
      }
      next();
    } catch (error) {
      console.error("Error validating token:", error);
      global.isAuthenticated = false;
      return next();
    }
  };
}

export default checkcookies;
