const jwt = require("jsonwebtoken");

const generateRefreshToken = async (userId) => {
  let getSecret = process.env.REFRESH_TOKEN_SECRET;
  const token = await jwt.sign(
    {
      userId: userId.toHexString(),
    },
    getSecret,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

const validateRefreshToken = (user, refreshToken) => {
  let getSecret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.verify(refreshToken, getSecret, (err, decode) => {
    if (err) {
      return false;
    } else if (user._id === decode.userId) {
      return {
        status: true,
        refreshToken: generateRefreshToken(user),
      };
    } else {
      return false;
    }
  });
};
module.exports = { generateRefreshToken, validateRefreshToken };
