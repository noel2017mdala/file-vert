const fs = require("fs");
const mongoose = require("mongoose");
const UserSchema = require("../Schema/UsersSchema");
const User = mongoose.model("User", UserSchema);
const { createPlan, getPlan } = require("./PlansModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const request = require("request");
const sendMail = require("../../helper/emailSender");
const {
  generateRefreshToken,
  validateRefreshToken,
} = require("../../helper/generateAccessToken");
const { getTime } = require("../../helper/getTime");
const getFileSizeInBytes = require("../../helper/getFileSize");

const createUser = async (userData) => {
  //destracture the userData input
  let { firstName, lastName, email, password, phoneNumber } = userData;

  //check to see if the values are present
  if (
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    password !== "" &&
    phoneNumber !== ""
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
      return getUserData;
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
    // console.log(getUser);
    // return;
    // console.log(getUser);
    //professional and enterprise
    // let userFormats = await testAxios("", format);
    // let convertFormat = [];
    // userFormats.targets.map((data) => {
    //   convertFormat.push(data.name);
    // });

    // console.log(convertFormat);
    // return;

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
        } else if (getUser.plan.name === "professional" || getUser.plan.name === "enterprise") {
          //professional and enterprise
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
  // let data = await axios.get(
  //   "https://sandbox.zamzar.com/v1/formats/gif",
  //   {},
  //   {
  //     auth: {
  //       username: "558686f9377507c05f3d7845b80d64a364578227",
  //       password: "",
  //     },
  //   }
  // );

  // console.log(data);

  let url = `https://sandbox.zamzar.com/v1/formats/${format}`;
  let data = await axios({
    method: "get",
    url,
    auth: {
      username: "558686f9377507c05f3d7845b80d64a364578227",
      password: "",
    },
  });

  // console.log(data);

  return data.data;
};

const uploadFileConvert = async (path, ext, user, cb) => {
  const getFieSize = await getFileSizeInBytes(path);
  // console.log(getFieSize);
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
                cb({ response, status: true });
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
              } else {
                let response = JSON.parse(body);
                cb({ response, status: true });
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
              } else {
                let response = JSON.parse(body);
                cb({ response, status: true });
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
              } else {
                let response = JSON.parse(body);
                cb({ response, status: true });
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
  // console.log(jobId);

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
};
