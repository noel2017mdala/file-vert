const fs = require("fs");
const mongoose = require("mongoose");
const UserSchema = require("../Schema/UsersSchema");
const User = mongoose.model("User", UserSchema);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../../helper/emailSender");

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
        let createUser = new User({
          ...userData,
          password: await bcrypt.hash(password, 12),
        });

        //create user
        createUser = await createUser.save();

        if (createUser) {
          sendMail(
            createUser.email,
            "Welcome to File-vert",
            "test Mail",
            createUser.firstName
          );
          return {
            status: true,
            message: "User creates successfully",
          };
        } else {
          return {
            status: false,
            message: "Failed to create user wawa 2",
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "Failed to create user wawa 3",
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
      message: "Failed to create user wawa 1",
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
            expiresIn: "3w",
          }
        );

        return {
          user: getUser,
          token,
          response: {
            status: true,
            message: "Login successful",
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

module.exports = {
  createUser,
  login,
};
