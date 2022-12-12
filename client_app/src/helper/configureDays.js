import * as moment from "moment";

export const AddDays = (days) => {
  var today = new Date();
  var resultDate = new Date(today);
  resultDate.setDate(today.getDate() + days);
  return resultDate;
};
