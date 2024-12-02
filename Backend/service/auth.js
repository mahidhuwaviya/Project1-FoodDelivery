import jwt from "jsonwebtoken";
const secretKey = "WHATdoYouWant";

async function setUserToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

async function getUSerToken(token) {
  const verify = jwt.verify(token, secretKey);
  return verify;
}

async function setUserResetPassswordToken(UserData) {
  const payload = {
    OTP: UserData.OTP,
    email: UserData.email,
  };
  const UserPasswordResetToken = jwt.sign(payload, secretKey);
  return UserPasswordResetToken;
}
async function getUserResetPasswordToken(UserPasswordResetToken) {
  const verify = jwt.verify(UserPasswordResetToken, secretKey);
  return verify;
}

export {
  setUserToken,
  getUSerToken,
  getUserResetPasswordToken,
  setUserResetPassswordToken,
};
// { algorithms: ["HS256"] },
// (err, decoded) => {
//   if (err) {
//     console.error("Token verification failed:", err.message);
//   } else {
//     console.log("Token verified:", decoded);
//   }
// }
