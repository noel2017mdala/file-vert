const {
  createUser,
  login,
  getUserData,
  refreshToken,
  getUserFormats,
  testAxios,
  updateUserActiveState,
} = require("../DB/Model/UserModel");
const { createPlan, getAllPlans } = require("../DB/Model/PlansModel");
const { AddDays } = require("../helper/getTime");

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

  getUser: async ({ id }, args, context) => {
    // if (id && id !== "") {
    //   if (args.request.req["headers"].cookie) {
    //     let tokens = args.request.req["headers"].cookie.split(";");
    //     if (tokens.length === 2) {
    //       let accessToken = tokens[0];
    //       let refreshToken = tokens[1];

    //       console.log(accessToken);
    //       console.log(refreshToken);
    //     } else {
    //       // args.request.res.status(403);
    //     }
    //   } else {
    //     console.log("not found");
    //     // args.request.res.status(403);
    //   }

    // }
    return await getUserData(id);
  },

  tokenRefresh: async ({ id }, args, context) => {
    const requestRefreshToken = args.request.req["headers"].cookie;

    if (id && requestRefreshToken) {
      let rToken = requestRefreshToken.split("=");
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

  getFormats: async ({ id, format }, args, context) => {
    if (id && format) {
      let userFormats = await getUserFormats(id, format);
      return userFormats;
    }
  },

  fetchData: async ({ id, format }, args, context) => {
    testAxios(id, format);
  },

  createPlan: async ({ input }, args, context) => {
    if (input) {
      return createPlan(input);
    }
  },

  updateUserState: async ({ id }, args, context) => {
    return updateUserActiveState(id);
  },

  getAllPlans: async () => {
    return await getAllPlans();
  },
};

module.exports = rootResolver;
