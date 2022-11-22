import React, { useEffect, useRef } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { useGQLQuery } from "../../hooks/useGqlQueries";
import { GET_USER_PLAN } from "../../Graphql/queries";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import { USER_PAYMENT_PAYPAL } from "../../Graphql/mutations";
import { useAuth } from "../../context/AuthContext";

const PaypalButton = ({ billingData }) => {
  const paypal = useRef();
  const { currentUser, socket } = useAuth();

  const { data, isLoading, error, refetch } = useGQLQuery(
    "get_user_plan",
    GET_USER_PLAN,
    { id: billingData.id },
    {
      enabled: false,
    }
  );

  const { mutateAsync: processPayment } = useGQLMutation(USER_PAYMENT_PAYPAL, {
    onSuccess: () => {
      // console.log("user is ready to be logged in");
    },
  });

  useEffect(() => {
    getPlanDetails();
  }, []);

  const getPlanDetails = async () => {
    let planDetails = await refetch();

    confirmPaypalPayment(planDetails.data);
  };

  const confirmPaypalPayment = (planData) => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: planData.getUserPlan.name,
                amount: {
                  value: Number(planData.getUserPlan.price),
                  currency_code: "USD",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          const updateUserPayment = await processPayment({
            userId: currentUser.user.id,
            planId: planData.getUserPlan.id,
          });
          console.log(order);
          console.log(updateUserPayment);
        },

        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  };
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PaypalButton;
