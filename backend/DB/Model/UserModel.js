const fs = require("fs");
const mongoose = require("mongoose");
const moment = require("moment");
require("dotenv").config();
const UserSchema = require("../Schema/UsersSchema");
const PlansSchema = require("../Schema/Plans");
const User = mongoose.model("User", UserSchema);
const Plans = mongoose.model("Plans", PlansSchema);
const { createPlan, getPlan } = require("./PlansModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const request = require("request");
const sendMail = require("../../helper/emailSender");
const Stripe = require("stripe")(process.env.Stripe_API_KEY);
const convertTZ = require("../../helper/TimeConverter");
const {
  generateRefreshToken,
  validateRefreshToken,
} = require("../../helper/generateAccessToken");
const { getTime } = require("../../helper/getTime");
const getFileSizeInBytes = require("../../helper/getFileSize");

const createUser = async (userData) => {
  //destracture the userData input
  let { firstName, lastName, email, password, phoneNumber, timeZone } =
    userData;

  //check to see if the values are present
  if (
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    password !== "" &&
    phoneNumber !== "" &&
    timeZone !== ""
  ) {
    //check if the user already exists in the database
    let checkIfUserExists = await User.findOne({
      $or: [{ phoneNumber: phoneNumber }, { email: email }],
    });
    //check if the user already exists in the database
    if (!checkIfUserExists) {
      try {
        const getFreePlan = await getPlan("free");

        let createUser = new User({
          ...userData,
          password: await bcrypt.hash(password, 12),
          plan: getFreePlan._id,
          numberOfConverts: getFreePlan.numberOfConverts,
          userTimezone: timeZone,
        });

        //create user
        createUser = await createUser.save();

        if (createUser) {
          // sendMail(
          //   createUser.email,
          //   "Welcome to File-vert",
          //   "test Mail",
          //   createUser.firstName
          // );
          return {
            status: true,
            message: "User created successfully",
          };
        } else {
          return {
            status: false,
            message: "Failed to create user",
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "Failed to create user",
        };
      }
    } else {
      return {
        status: false,
        message:
          "The Email or Phone number is already registered with another user",
      };
    }
  } else {
    return {
      status: false,
      message: "Failed to create user",
    };
  }
};

const login = async (userData) => {
  const { email, password } = userData;

  if (email && password) {
    try {
      let getUser = await User.findOne({
        $or: [{ email: email }],
      });

      if (getUser && (await bcrypt.compare(password, getUser.password))) {
        let getSecret = process.env.TOKEN_SECRET;

        const token = jwt.sign(
          {
            userId: getUser._id,
          },
          getSecret,
          {
            expiresIn: "15m",
          }
        );

        const refreshToken = await generateRefreshToken(getUser._id);

        await User.findByIdAndUpdate(
          getUser._id,
          {
            userRefreshToken: {
              refreshToken,
              lastRefresh: getTime(),
            },
          },
          {
            new: true,
          }
        );

        return {
          user: getUser,
          token,
          refreshToken: refreshToken,
          response: {
            status: true,
            message: "Login successful",
          },
        };
      } else {
        return {
          user: {},
          response: {
            status: false,
            message: "Login failed",
          },
        };
      }
    } catch (error) {
      return {
        user: {},
        token: null,
        response: {
          status: false,
          message: "Login failed",
        },
      };
    }
  } else {
    return {
      user: {},
      token: null,
      response: {
        status: false,
        message: "Login failed",
      },
    };
  }
};

const getUserData = async (userId) => {
  if (userId && userId !== "") {
    let getUserData = await User.findById(userId).populate("plan");
    if (getUserData) {
      let returnData = {
        ...getUserData._doc,
        response: {
          status: true,
          message: "",
        },
      };
      return returnData;
    }
  }
};

const refreshToken = async (id, refreshToken) => {
  if (id) {
    let getUser = await User.findOne({ _id: id });
    if (getUser) {
      let getUserRefreshToken = getUser.userRefreshToken.refreshToken;
      if (getUserRefreshToken === refreshToken) {
        const getToken = await validateRefreshToken(id, getUserRefreshToken);
        return getToken;
      } else {
        return {
          response: {
            status: false,
            message: "failed to get token",
          },
          token: null,
        };
      }
      // console.log(getUserRefreshToken);
    } else {
      return {
        response: {
          status: false,
          message: "failed to get token",
        },
        token: null,
      };
    }
  } else {
    return {
      response: {
        status: false,
        message: "failed to get token",
      },
      token: null,
    };
  }
};

// const getUser = async ({ id }) => {
//   if (id) {
//     let user = await User.findOne({ _id: id });
//     if (user) {
//       return user;
//     }
//   }
// };

const getUserFormats = async (id, format) => {
  if (id && format) {
    let getUser = await getUserData(id);
    if (getUser) {
      if (getUser.numberOfConverts >= 1) {
        if (getUser.plan.name === "free") {
          if (format === "pdf") {
            return {
              format: ["doc", "png", "jpg"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "jpg") {
            return {
              format: ["pdf"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "png") {
            return {
              format: ["pdf"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "jpeg") {
            return {
              format: ["pdf"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else {
            return {
              response: {
                status: false,
                message:
                  "your plan does not support this file format please try upgrading to a different plan or try again",
              },
              format: null,
            };
          }
        } else if (getUser.plan.name === "personal") {
          if (format === "pdf") {
            return {
              format: ["doc", "png", "jpg", "ppt", "csv"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "csv") {
            return {
              format: ["doc"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "doc") {
            return {
              format: ["pdf", "jpg"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "jpg") {
            return {
              format: ["png", "gif"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "gif") {
            return {
              format: ["png", "jpg"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "svg") {
            return {
              format: ["png", "jpg"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "ppt") {
            return {
              format: ["png", "jpg"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else if (format === "epub") {
            return {
              format: ["pdf"],
              response: {
                status: true,
                message: "file extension",
              },
            };
          } else {
            return {
              response: {
                status: false,
                message:
                  "your plan does not support this file format please try upgrading to a different plan or try again",
              },
              format: null,
            };
          }
        } else if (
          getUser.plan.name === "professional" ||
          getUser.plan.name === "enterprise"
        ) {
          //professional and enterprise
          try {
            let userFormats = await testAxios("", format);
            let convertFormat = [];
            userFormats.targets.map((data) => {
              convertFormat.push(data.name);
            });
            if (convertFormat.length > 0) {
              return {
                format: convertFormat,
                response: {
                  status: true,
                  message: "file extension",
                },
              };
            } else {
              return {
                response: {
                  status: false,
                  message:
                    "failed to get file extensions please try again later",
                },
                format: null,
              };
            }
          } catch (error) {
            return {
              response: {
                status: false,
                message: "failed to get file extensions please try again later",
              },
              format: null,
            };
          }
        }
      } else {
        return {
          response: {
            status: false,
            message: "you do not have any converts left",
          },
          format: null,
        };
      }
    } else {
      return {
        response: {
          status: false,
          message: "failed to get file extensions please try again later",
        },
        format: null,
      };
    }

    return;
    if (format === "pdf") {
      return {
        format: ["doc", "ppt", "csv", "png", "jpg"],
        response: {
          status: true,
          message: "file extension",
        },
      };
    } else if (format === "jpg") {
      return {
        format: ["doc", "pdf", "png"],
        response: {
          status: true,
          message: "file extension",
        },
      };
    } else if (format === "png") {
      return {
        format: ["jpg", "doc", "pdf"],
        response: {
          status: true,
          message: "file extension",
        },
      };
    } else if (format === "svg") {
      return {
        format: ["jpg", "png", "pdf"],
        response: {
          status: true,
          message: "file extension",
        },
      };
    } else if (format === "epub") {
      return {
        format: ["pdf"],
        response: {
          status: true,
          message: "file extension",
        },
      };
    } else if (format === "jpeg") {
      return {
        format: ["png", "doc", "pdf"],
        response: {
          status: true,
          message: "file extension",
        },
      };
    } else {
      return {
        response: {
          status: false,
          message: "failed to get file extensions",
        },
        format: null,
      };
    }
  }
};

const testAxios = async (id, format) => {
  let url = `https://sandbox.zamzar.com/v1/formats/${format}`;
  let data = await axios({
    method: "get",
    url,
    auth: {
      username: "558686f9377507c05f3d7845b80d64a364578227",
      password: "",
    },
  });

  return data.data;
};

const updateUserSocket = async (userId, userSocket) => {
  if (userId !== "null" && userSocket !== "") {
    const updateSocket = await User.findByIdAndUpdate(
      userId,
      {
        userSocket: userSocket,
      },
      {
        new: true,
      }
    );

    if (updateSocket) {
      console.log(`socket updated`);
    }
  }
};
const uploadFileConvert = async (path, ext, user, cb) => {
  const getFieSize = await getFileSizeInBytes(path);
  // console.log(user);
  if (user) {
    if (user.plan.name === "free") {
      //1 MB
      if (getFieSize <= 1000000) {
        let formData = {
          target_format: ext,
          source_file: fs.createReadStream(path),
        };

        request
          .post(
            { url: "https://sandbox.zamzar.com/v1/jobs/", formData: formData },
            function (err, response, body) {
              if (err) {
                cb({
                  response: {
                    message:
                      "failed to convert your file please try again later",
                  },
                  status: false,
                });
              } else {
                let response = JSON.parse(body);
                if (response.errors) {
                  cb({ response: response.errors, status: false });
                } else {
                  cb({ response, status: true });
                }
              }
            }
          )
          .auth("558686f9377507c05f3d7845b80d64a364578227", "", true);
      } else {
        fs.unlinkSync(path);
        cb({
          response: {
            message: "you can not upload files more than 1 MB",
          },
          status: false,
        });
      }
    } else if (user.plan.name === "personal") {
      //100 MB
      if (getFieSize <= 104857600) {
        let formData = {
          target_format: ext,
          source_file: fs.createReadStream(path),
        };

        request
          .post(
            { url: "https://sandbox.zamzar.com/v1/jobs/", formData: formData },
            function (err, response, body) {
              if (err) {
                cb({ response: err, status: false });
                fs.unlinkSync(path);
              } else {
                let response = JSON.parse(body);
                if (response.errors) {
                  cb({ response: response.errors, status: false });
                } else {
                  cb({ response, status: true });
                }
                fs.unlinkSync(path);
              }
            }
          )
          .auth("558686f9377507c05f3d7845b80d64a364578227", "", true);
      } else {
        fs.unlinkSync(path);
        cb({
          response: {
            message: "you can not upload files more than 100 MB",
          },
          status: false,
        });
      }
    } else if (user.plan.name === "professional") {
      //1 GB
      if (getFieSize <= 1073741824) {
        let formData = {
          target_format: ext,
          source_file: fs.createReadStream(path),
        };

        request
          .post(
            { url: "https://sandbox.zamzar.com/v1/jobs/", formData: formData },
            function (err, response, body) {
              if (err) {
                cb({ response: err, status: false });
                fs.unlinkSync(path);
              } else {
                let response = JSON.parse(body);

                if (response.errors) {
                  cb({ response: response.errors, status: false });
                } else {
                  cb({ response: response, status: true });
                }
                fs.unlinkSync(path);
              }
            }
          )
          .auth("558686f9377507c05f3d7845b80d64a364578227", "", true);
      } else {
        fs.unlinkSync(path);
        cb({
          response: {
            message: "you can not upload files more than 1 GB",
          },
          status: false,
        });
      }
    } else if (user.plan.name === "enterprise") {
      //5 GB
      if (getFieSize <= 5368709120) {
        let formData = {
          target_format: ext,
          source_file: fs.createReadStream(path),
        };

        request
          .post(
            { url: "https://sandbox.zamzar.com/v1/jobs/", formData: formData },
            function (err, response, body) {
              if (err) {
                cb({ response: err, status: false });
                fs.unlinkSync(path);
              } else {
                let response = JSON.parse(body);
                if (response.errors) {
                  cb({ response: response.errors, status: false });
                } else {
                  cb({ response, status: true });
                }
                fs.unlinkSync(path);
              }
            }
          )
          .auth("558686f9377507c05f3d7845b80d64a364578227", "", true);
      } else {
        fs.unlinkSync(path);
        cb({
          response: {
            message: "you can not upload files more than 5 GB",
          },
          status: false,
        });
      }
    }
  } else {
    cb({ response: "err", status: false });
  }

  // return;
  // let formData = {
  //   target_format: ext,
  //   source_file: fs.createReadStream(path),
  // };

  // let url = "https://sandbox.zamzar.com/v1/jobs/";
  // let data = await axios({
  //   method: "post",
  //   url,
  //   auth: {
  //     username: "558686f9377507c05f3d7845b80d64a364578227",
  //     password: "",
  //   },
  //   data: {
  //     formData: formData,
  //   },
  // });

  // console.log(data);
};

const getFileStatus = async (jobId) => {
  // console.log("wawawwwawa");

  if (jobId) {
    let url = `https://sandbox.zamzar.com/v1/jobs/${jobId}`;
    let data = await axios({
      method: "get",
      url,
      auth: {
        username: "558686f9377507c05f3d7845b80d64a364578227",
        password: "",
      },
    });
    return data.data;
  }
  // var request = require("request"),
  //   apiKey = "558686f9377507c05f3d7845b80d64a364578227";

  // request
  //   .get(
  //     "https://sandbox.zamzar.com/v1/jobs/" + jobId,
  //     function (err, response, body) {
  //       if (err) {
  //         console.error("Unable to get job", err);
  //       } else {
  //         console.log("SUCCESS! Got job:", JSON.parse(body));
  //       }
  //     }
  //   )
  //   .auth(apiKey, "", true);

  // console.log(data.data);
};

const downloadFile = async (fileId, cb) => {
  axios({
    method: "get",
    url: `https://sandbox.zamzar.com/v1/files/${fileId}/content`,
    auth: {
      username: "558686f9377507c05f3d7845b80d64a364578227",
      password: "",
    },
    responseType: "stream",
  }).then(function (response) {
    // response.data.pipe(fs.createWriteStream());

    cb({
      status: true,
      downloadLink: response.data.responseUrl,
    });
  });
};

const updateUserActiveState = async (userId) => {
  if (userId) {
    const updateUserState = await User.findByIdAndUpdate(
      userId,
      {
        userActive: true,
      },
      {
        new: true,
      }
    );

    if (updateUserState) {
      return {
        status: true,
        message: "user status updated successfully",
      };
    } else {
      return {
        status: false,
        message: "Failed to update user status",
      };
    }
  } else {
    return {
      status: false,
      message: "Failed to update user status",
    };
  }
};

const updateConverts = async (id, convertNumber) => {
  if (id && convertNumber) {
    let userConvertNumber = convertNumber - 1;

    const updateUserState = await User.findByIdAndUpdate(
      id,
      {
        numberOfConverts: userConvertNumber,
      },
      {
        new: true,
      }
    );

    if (updateUserState) {
      return {
        status: true,
        message: "user converts updated successfully",
      };
    } else {
      return {
        status: false,
        message: "Failed to update user converts",
      };
    }
  } else {
    return {
      status: false,
      message: "Failed to update user converts",
    };
  }
};

const updateProfile = async ({ id, firstName, lastName, email }) => {
  if (id !== "" && firstName !== "" && lastName !== "" && email !== "") {
    const updateUserProfile = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
      },
      {
        new: true,
      }
    );

    if (updateUserProfile) {
      return {
        status: true,
        message: "user profile updated successfully",
      };
    } else {
      return {
        status: false,
        message: "failed to update user profile",
      };
    }
  } else {
    return {
      status: false,
      message: "failed to update user profile",
    };
  }
};

const updatePassword = async ({
  id,
  oldPassword,
  password,
  confirmPassword,
}) => {
  if (
    id !== "" &&
    oldPassword !== "" &&
    password !== "" &&
    confirmPassword !== ""
  ) {
    try {
      let getUser = await User.findOne({ _id: id });

      if (
        getUser &&
        (await bcrypt.compare(oldPassword, getUser.password)) &&
        password === confirmPassword
      ) {
        const updateUserPassword = await User.findByIdAndUpdate(
          id,
          {
            password: await bcrypt.hash(password, 12),
          },
          {
            new: true,
          }
        );

        if (updateUserPassword) {
          return {
            status: true,
            message: "Password updated successfully",
          };
        } else {
          return {
            status: false,
            message: "Failed to update user password",
          };
        }
      } else {
        return {
          status: false,
          message: "Failed to update user password",
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "Failed to update user password",
      };
    }
  }
};

const processUserPayment = async ({ id, productID, amount, token }) => {
  if (id !== "" && productID !== "" && amount !== "") {
    const getUserPlan = await Plans.findOne({ _id: productID });
    const getUser = await getUserData(id);

    const date = new Date();
    const timeZoneDate = convertTZ(date, getUser.userTimezone);

    const subscriptionUnixTime = moment(timeZoneDate).unix();

    var today = new Date();
    var nextSubscriptionDate = new Date(
      new Date().setDate(today.getDate() + 30)
    );
    const newDate = convertTZ(nextSubscriptionDate, getUser.userTimezone);
    const endSubscriptionDate = moment(newDate).unix();

    if (getUserPlan && getUser) {
      try {
        let makePayment = await Stripe.charges.create({
          source: token,
          amount: getUserPlan.price * 100,
          currency: "usd",
        });

        if (makePayment.id) {
          const updateUserPlan = await User.findByIdAndUpdate(
            id,
            {
              plan: productID,
              numberOfConverts: getUserPlan.numberOfConverts,
              subscription: {
                subscriptionDate: subscriptionUnixTime,
                endSubscription: endSubscriptionDate,
              },
            },
            {
              new: true,
            }
          );

          if (updateUserPlan) {
            return {
              status: true,
              message: "Payment made successfully",
            };
          } else {
            return {
              status: false,
              message: "Payment failed please try again later",
            };
          }
        } else {
          return {
            status: false,
            message: "Payment failed please try again later",
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "Payment failed please try again later",
        };
      }
    } else {
      return {
        status: false,
        message: "Payment failed please try again later",
      };
    }
  }
};

const userSubExp = async (id) => {
  if (id) {
    try {
      const updateUserPlan = await User.findByIdAndUpdate(
        id,
        {
          plan: "636517aed4712f9c7ae23f16",
          numberOfConverts: 0,
          // subscription: {
          //   subscriptionDate: subscriptionUnixTime,
          //   endSubscription: endSubscriptionDate,
          // },
        },
        {
          new: true,
        }
      );

      return updateUserPlan;
    } catch (err) {
      console.log(err);
    }
  }
};

const processPaypalPayment = async (userId, planId) => {
  if (userId !== "" && planId !== "") {
    const getUserPlan = await Plans.findOne({ _id: planId });
    const getUser = await getUserData(userId);

    const date = new Date();
    const timeZoneDate = convertTZ(date, getUser.userTimezone);

    const subscriptionUnixTime = moment(timeZoneDate).unix();

    var today = new Date();
    var nextSubscriptionDate = new Date(
      new Date().setDate(today.getDate() + 30)
    );
    const newDate = convertTZ(nextSubscriptionDate, getUser.userTimezone);
    const endSubscriptionDate = moment(newDate).unix();

    if (getUserPlan && getUser) {
      try {
        const updateUserPlan = await User.findByIdAndUpdate(
          userId,
          {
            plan: planId,
            numberOfConverts: getUserPlan.numberOfConverts,
            subscription: {
              subscriptionDate: subscriptionUnixTime,
              endSubscription: endSubscriptionDate,
            },
          },
          {
            new: true,
          }
        );

        if (updateUserPlan) {
          return {
            status: true,
            message: "Payment made successfully",
          };
        } else {
          return {
            status: false,
            message: "Payment failed please try again later",
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "Payment failed please try again later",
        };
      }
    } else {
      return {
        status: false,
        message: "Payment failed please try again later",
      };
    }
  } else {
    return {
      status: false,
      message: "Payment failed please try again later",
    };
  }
};

const getUserExp = async () => {
  const date = new Date();
  const timeZoneDate = convertTZ(date, "Africa/Blantyre");
  const subscriptionUnixTime = moment(timeZoneDate).unix();
  // console.log(subscriptionUnixTime);
  const getExpSub = await User.find({
    "subscription.endSubscription": { $lte: subscriptionUnixTime },
  });

  if (getExpSub) {
    getExpSub.map(async (user) => {
      await userSubExp(user.id);
    });
  }
};

module.exports = {
  createUser,
  login,
  getUserData,
  refreshToken,
  getUserFormats,
  testAxios,
  uploadFileConvert,
  getFileStatus,
  downloadFile,
  updateUserActiveState,
  updateConverts,
  updateProfile,
  updatePassword,
  processUserPayment,
  processPaypalPayment,
  getUserExp,
  updateUserSocket,
};
