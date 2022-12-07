import { useGQLQuery } from "../../hooks/useGqlQueries";
import { Link } from "react-router-dom";
import { GET_USER_PLANS, GET_EXP_USER_PLAN } from "../../Graphql/queries";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const Pricing = () => {
  const { data, isLoading, error } = useGQLQuery(
    "get_user_plans",
    GET_USER_PLANS
  );

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  return (
    <section>
      <div className="min-h-screen bg-white">
        <div>
          <h1 className="text-center py-12 text-2xl font-bold">
            Available Options
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-8 py-14 md:px-8 relative">
          {isLoading ? (
            <div className="absolute left-0 right-0 flex items-center justify-center">
              <ClipLoader
                color="#F25F3A"
                css={override}
                size={35}
                className=""
              />
            </div>
          ) : (
            data.getAllPlans.map((plan, key) => (
              <div
                className={`border  shadow-lg p-8 bg-white rounded-xl relative flex flex-col`}
                key={plan.id}
              >
                <h5 className="mb-4 text-xl text-gray-500 font-semibold leading-5">
                  {plan.name} plan
                </h5>

                {plan.name === "professional" && (
                  <p className="absolute top-0 -translate-y-1/2 bg-brightRed text-white px-3 py-0.5 rounded-full text-sm font-semibold tracking-wide shadow-md">
                    Most Popular
                  </p>
                )}
                <div className="flex items-baseline space-x-2 text-gray-900 bg-gray-50">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xl font-normal text-gray-500 ">
                    /month
                  </span>
                </div>

                <ul role="list" className="my-7 space-y-5 flex-1">
                  {plan.features.map((features, i) => (
                    <li className="flex space-x-3" key={i}>
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-5 h-5 text-brightRedLight "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Check icon</title>
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-normal leading-tight text-gray-500">
                        {plan.features[i]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-center">
          <div className="my-16">
            <div className="">
              <Link
                to="/get-started"
                className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
