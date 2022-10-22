const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

User.virtual("id").get(function () {
  return this._id.toHexString();
});
User.set("toJSON", {
  virtuals: true,
});

module.exports = User;