const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../helper/generateAccessToken");

const Auth = async (args) => {
  if (
    args.request.req["headers"].cookie !== undefined &&
    args.request.req["headers"].authorization !== undefined
  ) {
    let refreshToken = args.request.req["headers"].cookie.split("=");
    let accessToken = args.request.req["headers"].authorization.split(" ");
    let userId = args.request.req["headers"]["user-id"];

    if (refreshToken && accessToken) {
      const accessTokenResponse = validateAccessToken(
        accessToken[1],
        userId,
        (results) => {
          return results;
        }
      );

      const refreshTokenResponse = validateRefreshToken(
        refreshToken[1],
        userId,
        (result) => {
          return result;
        }
      );

      if (refreshTokenResponse && accessTokenResponse) {
        return {
          accessTokenResponse,
          token: null,
          refreshTokenResponse,
        };
      } else if (refreshTokenResponse && !accessTokenResponse && userId) {
        const accessToken = await generateAccessToken(userId);

        return {
          accessTokenResponse,
          token: accessToken,
          refreshTokenResponse,
        };
      } else if (!refreshTokenResponse && !accessTokenResponse) {
        console.log("user should log out");
      }
    }
  } else {
    return {
      accessTokenResponse: {
        status: false,
      },
      token: null,
      refreshTokenResponse: {
        status: false,
      },
    };
  }
};

const validateAccessToken = (token, userId, cb) => {
  let accessTokenSecret = process.env.TOKEN_SECRET;
  if (token) {
    return jwt.verify(token, accessTokenSecret, (err, decode) => {
      if (err) {
        return false;
      } else if (decode.userId === userId) {
        return cb({
          status: true,
          data: decode,
        });
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

const validateRefreshToken = (token, userId, cb) => {
  if (token) {
    let refreshTOkenSecret = process.env.REFRESH_TOKEN_SECRET;
    return jwt.verify(token, refreshTOkenSecret, (err, decode) => {
      if (err) {
        return cb({
          status: false,
        });
      } else if (decode.userId === userId) {
        return cb({
          status: true,
          data: decode,
        });
      } else {
        return false;
      }
    });
  }
};

module.exports = Auth;
