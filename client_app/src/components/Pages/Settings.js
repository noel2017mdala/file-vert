import { useState, useEffect } from "react";
import Notification from "../Dashboard/Notification";
import Billing from "../settings/Billing";
import Notifications from "../settings/Notifications";
import Password from "../settings/Password";
import Profile from "../settings/Profile";
import { useAuth } from "../../context/AuthContext";
import { GET_USER } from "../../Graphql/queries";
import { useGQLQuery } from "../../hooks/useGqlQueries";
const Settings = ({ userData }) => {
  const [uiState, setUiState] = useState({
    profileState: true,
    passwordState: false,
    billingState: false,
    notificationState: false,
  });

  const { currentUser, socket, userToken, updateToken, userLogout } = useAuth();

  const {
    data: user_Data,
    isLoading: userLoading,
    error: userError,
  } = useGQLQuery(
    "get_user",
    GET_USER,
    {
      id: currentUser.user.id,
    },
    {},
    userToken,
    currentUser.user.id
  );

  useEffect(() => {
    if (!userLoading && user_Data.getUser) {
      if (user_Data.getUser.response.token === null) {
        // console.log("token active");
      } else {
        updateToken(user_Data.getUser.response.token);
      }

      if (user_Data.getUser.response.message === "unauthenticated_user") {
        console.log("Settings");
        userLogout();
      }
    }
  }, [socket]);

  return (
    <div className="">
      <div className="h-screen">
        <div className="">
          <div className="w-fit pt-4 md:m-6">
            <ul className="flex md:space-x-12 items-center justify-center text-sm md:items-start md:justify-start md:text-base cursor-pointer text-brightRed">
              <li
                className={`${
                  uiState.profileState
                    ? "bg-brightRed text-white rounded-lg"
                    : ""
                }  p-2`}
                onClick={() => {
                  setUiState({
                    profileState: true,
                    passwordState: false,
                    billingState: false,
                    notificationState: false,
                  });
                }}
              >
                Profile
              </li>
              <li
                className={`${
                  uiState.passwordState
                    ? "bg-brightRed text-white rounded-lg"
                    : ""
                }  p-2`}
                onClick={() => {
                  setUiState({
                    profileState: false,
                    passwordState: true,
                    billingState: false,
                    notificationState: false,
                  });
                }}
              >
                Password
              </li>
              <li
                className={`${
                  uiState.billingState
                    ? "bg-brightRed text-white rounded-lg"
                    : ""
                }  p-2`}
                onClick={() => {
                  setUiState({
                    profileState: false,
                    passwordState: false,
                    billingState: true,
                    notificationState: false,
                  });
                }}
              >
                Billing
              </li>
              <li
                className={`${
                  uiState.notificationState
                    ? "bg-brightRed text-white rounded-lg"
                    : ""
                }  p-2`}
                onClick={() => {
                  setUiState({
                    profileState: false,
                    passwordState: false,
                    billingState: false,
                    notificationState: true,
                  });
                }}
              >
                Notifications
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 ">
          {uiState.profileState ? (
            <Profile userData={userData} />
          ) : uiState.passwordState ? (
            <Password />
          ) : uiState.billingState ? (
            <Billing userData={userData} />
          ) : uiState.notificationState ? (
            <Notifications />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Settings;
