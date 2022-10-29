const {
  createUser,
  login,
  getUserData,
  refreshToken,
} = require("../DB/Model/UserModel");
const { AddDays } = require("../helper/getTime");
const data = [
  {
    firstName: "Abel",
    lastName: "Mdala",
    uid: 1,
    email: "noelmdala1017@gmail.com",
    contact: "997216715",
  },
];

const rootResolver = {
  createUser: ({ input }) => {
    if (input) {
      return createUser(input);
    }
    return {
      status: false,
      message: "Failed to create user",
    };
  },

  userLogin: async ({ email, password }, args, context) => {
    if (email && password) {
      const userData = await login({ email, password });

      if (userData.token && userData.refreshToken) {
        if (process.env.NODE_ENV === "production") {
          // args.request.res.cookie("token", userData.token, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV === "production",
          //   path: "/graphql",
          //   sameSite: "none",
          //   expires: new Date(new Date().getTime() + 15 * 60 * 1000),
          // });

          args.request.res.cookie("r_token", userData.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "none",
            expires: AddDays(30),
          });
        } else {
          // args.request.res.cookie("token", userData.token, {
          //   httpOnly: true,
          //   secure: true,
          //   path: "/",
          //   sameSite: "none",
          //   expires: new Date(new Date().getTime() + 15 * 60 * 1000),
          // });

          // console.log(userData.user.userRefreshToken.refreshToken);
          args.request.res.cookie("r_token", userData.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "none",
            expires: AddDays(30),
          });
        }

        return userData;
      }
    }
  },

  // getUser: async ({ id }, args, context) => {
  //   if (id && id !== "") {
  //     if (args.request.req["headers"].cookie) {
  //       let tokens = args.request.req["headers"].cookie.split(";");
  //       if (tokens.length === 2) {
  //         let accessToken = tokens[0];
  //         let refreshToken = tokens[1];

  //         console.log(accessToken);
  //         console.log(refreshToken);
  //       } else {
  //         // args.request.res.status(403);
  //       }
  //     } else {
  //       console.log("not found");
  //       // args.request.res.status(403);
  //     }
  //     return getUserData(id);
  //   }
  // },

  tokenRefresh: async ({ id }, args, context) => {
    const requestRefreshToken = args.request.req["headers"].cookie;

    if (id && requestRefreshToken) {
      let rToken = requestRefreshToken.split("=");
      // console.log(requestRefreshToken);
      return refreshToken(id, rToken[1]);
    } else {
      return {
        response: {
          status: false,
          message: "failed to get token",
        },
        token: null,
      };
    }
  },
};

module.exports = rootResolver;
