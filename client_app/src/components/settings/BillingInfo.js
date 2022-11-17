import { useState } from "react";
import card from "../../images/7341114_e-commerce_online_shopping_ui_credit card_icon.svg";
import payPal from "../../images/4375034_logo_paypal_icon.svg";
import { notify } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
const BillingInfo = ({ billingData, billingTabs, setBilling }) => {
  const [billingTabState, setBillingSTate] = useState({
    creditCard: false,
    payPal: false,
  });

  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  const [errorState, setErrorState] = useState({
    nameOnCardError: false,
    cardNumberErr: false,
    expDateErr: false,
    cvcErr: false,
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
              {/* <button
                className="py-2 px-4 rounded-xl bg-brightRed hover:bg-brightRedLight text-white text-sm capitalize"
                onClick={() => {
                  if (!billingTabState.creditCard && !billingTabState.payPal) {
                    notify.fail("please choose a payment method");
                  } else if (billingTabState.creditCard) {
                    console.log("stripe payment method");
                  } else if (billingTabState.payPal) {
                    console.log("paypal payment method");
                  }
                }}
              >
                Pay
              </button> */}
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

        <div>
          <div className="md:w-2/5 mx-auto mt-8">
            <h2 className="capitalize text-lg py-4">Payment information</h2>

            <div className="md:border-2 md:py-2 md:px-12 bg-white shadow-lg rounded-md">
              <div>
                <form>
                  <div className="flex flex-col  md:flex-col md:space-x-0 space-y-4 md:space-y-6 w-11/12 mx-auto">
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium text-brightRedLight">
                        Name on card
                      </label>
                      <input
                        type="text"
                        value={nameOnCard}
                        className={`
              shadow
            appearance-none
            border
            rounded
            w-full
            py-3
            px-3
            text-gray-500
            leading-tight
            focus:outline-none focus:shadow-outline


            ${
              errorState.nameOnCardError
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
              `}
                        placeholder="John Doe"
                        autoComplete="off"
                        required
                        onChange={(text) => {
                          // console.log(text);
                          setNameOnCard(text.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-brightRedLight">
                        Card number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        className={`
              shadow
            appearance-none
            border
            rounded
            w-full
            py-3
            px-3
            text-gray-500
            leading-tight
            focus:outline-none focus:shadow-outline

            ${
              errorState.cardNumberErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }

              `}
                        placeholder="0000 0000 0000 0000"
                        autoComplete="off"
                        required
                        onChange={(text) => {
                          setCardNumber(text.target.value);
                        }}
                      />
                    </div>

                    <div className="pt-8 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-brightRedLight">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          value={expDate}
                          className={`
              shadow
            appearance-none
            border
            rounded
            w-full
            py-3
            px-3
            text-gray-500
            leading-tight
            focus:outline-none focus:shadow-outline


            ${
              errorState.expDateErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }

              `}
                          placeholder="MM/YY"
                          autoComplete="off"
                          required
                          onChange={(text) => {
                            setExpDate(text.target.value);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-brightRedLight">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cvc}
                          className={`
              shadow
            appearance-none
            border
            rounded
            w-full
            py-3
            px-3
            text-gray-500
            leading-tight
            focus:outline-none focus:shadow-outline

            ${
              errorState.cvcErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
              `}
                          placeholder="***"
                          autoComplete="off"
                          required
                          onChange={(text) => {
                            setCvc(text.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <p className="font-semibold text-base">
                      {billingData.price} USD
                    </p>
                    <div className="py-4">
                      <button
                        className="block w-full max-w-xs mx-auto bg-brightRed hover:bg-brightRedLight text-white rounded-lg px-3 py-3 font-semibold"
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            !billingTabState.creditCard &&
                            !billingTabState.payPal
                          ) {
                            notify.fail("please choose a payment method");
                          } else if (
                            billingTabState.creditCard ||
                            billingTabState.payPal
                          ) {
                            if (
                              nameOnCard === "" &&
                              cardNumber === "" &&
                              expDate === "" &&
                              cvc === ""
                            ) {
                              setErrorState({
                                nameOnCardError: true,
                                cardNumberErr: true,
                                expDateErr: true,
                                cvcErr: true,
                              });
                            } else if (nameOnCard === "") {
                              setErrorState({
                                nameOnCardError: true,
                                cardNumberErr: false,
                                expDateErr: false,
                                cvcErr: false,
                              });
                            } else if (cardNumber === "") {
                              setErrorState({
                                nameOnCardError: false,
                                cardNumberErr: true,
                                expDateErr: false,
                                cvcErr: false,
                              });
                            } else if (expDate === "") {
                              setErrorState({
                                nameOnCardError: false,
                                cardNumberErr: false,
                                expDateErr: true,
                                cvcErr: false,
                              });
                            } else if (cvc === "") {
                              setErrorState({
                                nameOnCardError: false,
                                cardNumberErr: false,
                                expDateErr: false,
                                cvcErr: true,
                              });
                            } else {
                              console.log("about to pay");
                            }
                          }
                        }}
                      >
                        <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BillingInfo;
