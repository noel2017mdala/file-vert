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

const getUserFormats = (id, format) => {
  if (id && format) {
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

  console.log(data.data);
};

const uploadFileConvert = async (path, ext, cb) => {
  let formData = {
    target_format: ext,
    source_file: fs.createReadStream(path),
  };

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
};

const getFileStatus = async (jobId) => {
  console.log("wawawwwawa");
  console.log(jobId);

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
};
