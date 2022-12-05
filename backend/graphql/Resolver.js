const {
  createUser,
  login,
  getUserData,
  refreshToken,
  getUserFormats,
  testAxios,
  updateUserActiveState,
  updateProfile,
  updatePassword,
  processUserPayment,
  processPaypalPayment,
  getUserExp,
} = require("../DB/Model/UserModel");
const {
  createPlan,
  getAllPlans,
  getUserPlan,
} = require("../DB/Model/PlansModel");
const { AddDays } = require("../helper/getTime");
const Auth = require("../middleware/AuthMiddleware");

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
    const authResponse = await Auth(args);

    //if accessToken and refreshToken are all valid
    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      const userData = await getUserData(id);
      userData.response.token = authResponse.token;
      return userData;
    } else if (
      //if refreshToken is valid while access token has expired
      authResponse.refreshTokenResponse.status &&
      authResponse.accessTokenResponse.status === undefined &&
      authResponse.accessTokenResponse.token !== null
    ) {
      const userData = await getUserData(id);
      userData.response.token = authResponse.token;
      return userData;
    } else {
      //if all tokens have expired
      return {
        response: {
          status: false,
          message: "unauthenticated_user",
        },
      };
    }
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
    const authResponse = await Auth(args);
    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      if (id && format) {
        let userFormats = await getUserFormats(id, format);
        userFormats.response.token = authResponse.token;
        return userFormats;
      }
    } else if (
      authResponse.refreshTokenResponse.status &&
      authResponse.accessTokenResponse.status === undefined &&
      authResponse.accessTokenResponse.token !== null
    ) {
      let userFormats = await getUserFormats(id, format);
      userFormats.response.token = authResponse.token;
      return userFormats;
    } else {
      console.log("wawa token has expired get formats");
    }
  },

  createPlan: async ({ input }, args, context) => {
    const authResponse = await Auth(args);
    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      if (input) {
        return createPlan(input);
      }
    }
  },

  updateUserState: async ({ id }, args, context) => {
    const authResponse = await Auth(args);

    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      return updateUserActiveState(id);
    } else {
      console.log("wawa token has expired user state");
    }
  },

  getAllPlans: async () => {
    return await getAllPlans();
  },

  updateUserProfile: async (
    { id, firstName, lastName, email },
    args,
    context
  ) => {
    const authResponse = await Auth(args);

    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      let userProfile = await updateProfile({ id, firstName, lastName, email });
      console.log(userProfile);
      userProfile.token = authResponse.token;

      return userProfile;
    } else if (
      authResponse.refreshTokenResponse.status &&
      authResponse.accessTokenResponse.status === undefined &&
      authResponse.accessTokenResponse.token !== null
    ) {
      let userProfile = await updateProfile({ id, firstName, lastName, email });
      userProfile.token = authResponse.token;

      return userProfile;
    } else {
      console.log("wawa token has expired profile update");
    }
  },

  updateUserPassword: async (
    { id, oldPassword, password, confirmPassword },
    args,
    context
  ) => {
    const authResponse = await Auth(args);

    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      let userPasswordUpdate = await updatePassword({
        id,
        oldPassword,
        password,
        confirmPassword,
      });

      userPasswordUpdate.token = authResponse.token;
      return userPasswordUpdate;
    } else if (
      authResponse.refreshTokenResponse.status &&
      authResponse.accessTokenResponse.status === undefined &&
      authResponse.accessTokenResponse.token !== null
    ) {
      let userPasswordUpdate = await updatePassword({
        id,
        oldPassword,
        password,
        confirmPassword,
      });

      console.log(userPasswordUpdate);

      userPasswordUpdate.token = authResponse.token;
      return userPasswordUpdate;
    } else {
      console.log("wawa token has expired update password");
    }
  },

  processPayment: async ({ id, amount, productID, token }, args, context) => {
    const authResponse = await Auth(args);

    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      let userPayment = await processUserPayment({
        id,
        amount,
        productID,
        token,
      });
      userPayment.token = authResponse.token;
      return userPayment;
    } else if (
      authResponse.refreshTokenResponse.status &&
      authResponse.accessTokenResponse.status === undefined &&
      authResponse.accessTokenResponse.token !== null
    ) {
      let userPayment = await processUserPayment({
        id,
        amount,
        productID,
        token,
      });
      userPayment.token = authResponse.token;
      return userPayment;
    } else {
      console.log("wawa token has expired process payment");
    }
  },

  getUserPlan: async ({ id }, args, context) => {
    console.log("plans");
    return getUserPlan(id);
  },

  paypalPayment: async ({ userId, planId }, args, context) => {
    const authResponse = await Auth(args);

    if (
      authResponse.accessTokenResponse.status &&
      authResponse.refreshTokenResponse.status
    ) {
      let payPalPayment = processPaypalPayment(userId, planId);
      payPalPayment.token = authResponse.token;
      return payPalPayment;
    } else if (
      authResponse.refreshTokenResponse.status &&
      authResponse.accessTokenResponse.status === undefined &&
      authResponse.accessTokenResponse.token !== null
    ) {
      let payPalPayment = processPaypalPayment(userId, planId);
      payPalPayment.token = authResponse.token;
      return payPalPayment;
    } else {
      console.log("wawa token has expired paypal");
    }
  },

  getExpUserPlan: async () => {
    getUserExp();
  },
};

module.exports = rootResolver;
