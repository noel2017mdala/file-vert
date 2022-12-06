import React, { useState, useCallback, useEffect } from "react";
import { GET_FORMATS, FETCH_DATA, GET_USER } from "../../Graphql/queries";
import { useGQLQuery } from "../../hooks/useGqlQueries";
import { useAuth } from "../../context/AuthContext";

import notification from "../../images/profession_entertainment_icon.svg";

const Notification = () => {
  const { currentUser, socket, userToken, updateToken, userLogout } = useAuth();
  const {
    data: userData,
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
    if (!userLoading && userData.getUser) {
      if (userData.getUser.response.token === null) {
        // console.log("token active");
      } else {
        updateToken(userData.getUser.response.token);
      }

      if (userData.getUser.response.message === "unauthenticated_user") {
        console.log("Notifications");
        userLogout();
      }
    }
  }, [socket]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center  h-screen">
        <img src={notification} className="h-2/4 w-2/4" />

        <h3 className="font-bold text-sm md:text-xl text-brightRedLight">
          Oops no notifications found
        </h3>
      </div>
    </div>
  );
};

export default Notification;
