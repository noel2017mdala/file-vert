const mongoose = require("mongoose");
const PlansSchema = require("../Schema/Plans");
const Plans = mongoose.model("Plans", PlansSchema);

const createPlan = async (plansData) => {
  let { name, price, features } = plansData;

  //   console.log(name);

  if (name !== "" && price !== "" && features !== "") {
    let getPlans = await Plans.findOne({ name: name });

    if (!getPlans) {
      try {
        let createPlan = new Plans({
          ...plansData,
          price: Number(price),
        });

        createPlan = await createPlan.save();

        if (createPlan) {
          return {
            status: true,
            message: "Plan created successfully",
          };
        } else {
          return {
            status: false,
            message: "Failed to create Plan",
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "Failed to create Plan",
        };
      }
    } else {
      return {
        status: false,
        message: "Failed to create Plan",
      };
    }
  }
};

const getPlan = async (planName) => {
  if (planName) {
    if (planName === "free") {
    }
    let getFreePlan = await Plans.findOne({ name: planName });
    return getFreePlan;
  }
};

const getAllPlans = async () => {
  let getAllPlans = await Plans.find().sort("price");
  return getAllPlans;
};

module.exports = {
  createPlan,
  getPlan,
  getAllPlans,
};
