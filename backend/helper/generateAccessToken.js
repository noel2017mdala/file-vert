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

const generateAccessToken = async (id) => {
  let getSecret = process.env.REFRESH_TOKEN_SECRET;
  // const token = await jwt.sign(
  //   {
  //     userId: userId.toHexString(),
  //   },
  //   getSecret,
  //   {
  //     expiresIn: "30d",
  //   }
  // );

  const token = await jwt.sign(
    {
      userId: id,
    },
    getSecret,
    {
      expiresIn: "15m",
    }
  );
  return token;
};

const validateRefreshToken = async (userId, refreshToken) => {
  let getSecret = process.env.REFRESH_TOKEN_SECRET;
  return jwt.verify(refreshToken, getSecret, async (err, decode) => {
    if (err) {
      return {
        response: {
          status: false,
          message: "failed to get token",
        },
        token: null,
      };
    } else if (userId === decode.userId) {
      return {
        response: {
          status: true,
          message: "token generated successfully",
        },
        token: await generateAccessToken(userId),
      };
    } else {
      return {
        response: {
          status: false,
          message: "failed to get token",
        },
        token: null,
      };
    }
  });
};
module.exports = { generateRefreshToken, validateRefreshToken };
