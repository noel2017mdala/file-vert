const mongoose = require("mongoose");
const { Schema } = mongoose;

const Plans = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberOfConverts: {
    type: Number,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
});

Plans.virtual("id").get(function () {
  return this._id.toHexString();
});
Plans.set("toJSON", {
  virtuals: true,
});

module.exports = Plans;
