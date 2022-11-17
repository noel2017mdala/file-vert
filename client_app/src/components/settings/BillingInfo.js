import { useState } from "react";
import card from "../../images/7341114_e-commerce_online_shopping_ui_credit card_icon.svg";
import payPal from "../../images/4375034_logo_paypal_icon.svg";
const BillingInfo = ({ billingData, billingTabs, setBilling }) => {
  const [billingTabState, setBillingSTate] = useState({
    creditCard: false,
    payPal: false,
  });
  return (
    <div className="mx-2">
      <div>
        <div className="">
          <div className="flex flex-col space-y-4 md:flex-row md:items-end md:justify-between md:px-8">
            <div>
              <h2 className="text-sm font-bold  text-brightRed md:text-base">
                Billing information
              </h2>
              <p className="text-sm text-gray-700 md:text-base">
                Please choose a payment method and fill out the appropriate
                information
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                className="py-2 px-4 rounded-xl bg-brightRed hover:bg-brightRedLight text-white text-sm capitalize"
                onClick={() => {
                  console.log(billingData);
                }}
              >
                Pay
              </button>
              <button
                className="py-2 px-4 rounded-xl border border-gray-400 text-sm capitalize"
                onClick={() => {
                  setBilling({
                    billing: true,
                    billingInfo: false,
                  });
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-4">
            <div
              className={`border-2 py-2 px-12 bg-white  rounded-md cursor-pointer ${
                billingTabState.creditCard
                  ? "border-blue-400"
                  : "border-gray-200"
              }`}
              onClick={() => {
                setBillingSTate({
                  creditCard: true,
                  payPal: false,
                });
              }}
            >
              <img src={card} alt={"credit card"} className="w-24 h-24" />
              <p className="text-center">Credit card</p>
            </div>
            <div
              className={`border-2 py-2 px-12 bg-white border-gray-200 rounded-md cursor-pointer ${
                billingTabState.payPal ? "border-blue-400" : "border-gray-200"
              }`}
              onClick={() => {
                setBillingSTate({
                  creditCard: false,
                  payPal: true,
                });
              }}
            >
              <img src={payPal} alt={"Paypal"} className="w-24 h-24" />
              <p className="text-center">Paypal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;
