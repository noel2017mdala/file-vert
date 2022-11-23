import React, { useEffect, useRef } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { useGQLQuery } from "../../hooks/useGqlQueries";
import { GET_USER_PLAN } from "../../Graphql/queries";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import { USER_PAYMENT_PAYPAL } from "../../Graphql/mutations";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PaypalButton = ({ billingData }) => {
  const paypal = useRef();
  const { currentUser, socket } = useAuth();
  const MySwal = withReactContent(Swal);

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

  // const successfulPayment = () =>{

  // }

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
          // console.log(order);
          // console.log(updateUserPayment);

          if (order.id && updateUserPayment.paypalPayment.status) {
            Swal.fire({
              icon: "success",
              title: `Payment`,
              text: "Your payment was successful",
              confirmButtonColor: "#F25F3A",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: `Payment`,
              text: "An error occurred while processing your payment please try again",
              confirmButtonColor: "#F25F3A",
            });
          }

          //   Swal.fire('Saved!', '', 'success')
          // } else if (result.isDenied) {
          //   Swal.fire('Changes are not saved', '', 'error')
          // }
        },

        onError: (err) => {
          Swal.fire("Changes are not saved", "", "error");
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
