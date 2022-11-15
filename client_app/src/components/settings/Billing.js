import { GET_USER_PLANS } from "../../Graphql/queries";
import { useGQLQuery } from "../../hooks/useGqlQueries";
const Billing = () => {
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

        <div className="flex flex-col space-y-8 md:flex-row space-x-8">
          {isLoading ? (
            <p>loading</p>
          ) : (
            data.getAllPlans.map((plan, key) => (
              <div key={key} className="">
                <div className="p-4 w-full max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                    {plan.name} plan
                  </h5>
                  <div className="flex items-baseline text-gray-900 dark:text-white">
                    <span className="text-3xl font-semibold">$</span>
                    <span className="text-5xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>

                  <ul role="list" className="my-7 space-y-5">
                    {plan.features.map((features, i) => (
                      <li className="flex space-x-3" key={i}>
                        <svg
                          aria-hidden="true"
                          className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
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
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                          {plan.features[i]}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                  >
                    Choose plan
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
