import { GET_USER_PLANS } from "../../Graphql/queries";
import { useGQLQuery } from "../../hooks/useGqlQueries";
const Billing = ({ userData }) => {
  const { data, isLoading, error } = useGQLQuery(
    "get_user_plans",
    GET_USER_PLANS
  );

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
                Please select your preferred plan
              </p>
            </div>

            <div className="flex space-x-4">
              <button className="py-2 px-4 rounded-xl bg-brightRed hover:bg-brightRedLight text-white text-sm capitalize">
                proceed
              </button>
              <button className="py-2 px-4 rounded-xl border border-gray-400 text-sm capitalize">
                cancel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-8 py-14 md:px-8">
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            data.getAllPlans.map((plan, key) =>
              userData && userData.getUser ? (
                <div
                  className="border border-gray-200 shadow-lg p-8 bg-white rounded-xl relative flex flex-col"
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

                  <button
                    type="button"
                    className={`text-white bg-brightRed hover:bg-brightRedLight focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center shadow-md ${
                      userData.getUser.plan.name === plan.name
                        ? {
                            cursor: "not-allowed",
                          }
                        : ""
                    }`}
                    onClick={() => {
                      console.log();
                    }}
                    disabled={
                      userData.getUser.plan.name === plan.name ? "disabled" : ""
                    }
                  >
                    {userData.getUser.plan.name === plan.name
                      ? "Current active"
                      : "Choose plan"}
                  </button>
                </div>
              ) : (
                <p>Loading ......</p>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
