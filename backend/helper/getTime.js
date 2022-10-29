const moment = require("moment");

const getTime = () => {
  return moment().format("hh:mm:ss");
};

const AddDays = (days) => {
  var today = new Date();
  var resultDate = new Date(today);
  resultDate.setDate(today.getDate() + days);
  return resultDate;
};

module.exports = {
  getTime,
  AddDays,
};
