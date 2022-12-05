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

  userRefreshToken: {
    type: Object,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },

  userActive: {
    type: Boolean,
    default: false,
  },

  numberOfConverts: {
    type: Number,
    required: true,
  },

  userTimezone: {
    type: String,
    required: true,
  },

  subscription: {
    type: Object,
  },

  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plans",
  },

  userSocket: {
    type: String,
  },
});

User.virtual("id").get(function () {
  return this._id.toHexString();
});
User.set("toJSON", {
  virtuals: true,
});

module.exports = User;
