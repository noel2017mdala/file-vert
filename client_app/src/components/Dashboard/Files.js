import React, { useState, useCallback, useEffect } from "react";
import { GET_USER } from "../../Graphql/queries";

import { useGQLQuery } from "../../hooks/useGqlQueries";
import { useAuth } from "../../context/AuthContext";

import files from "../../images/discover_search_files_icon.svg";

const Files = () => {
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
        console.log("Files");
        userLogout();
      }
    }
  }, [socket]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center  h-screen">
        <img src={files} className="h-2/4 w-2/4" />

        <h3 className="font-bold text-sm md:text-xl text-brightRedLight">
          You do not have any files to display
        </h3>
      </div>
    </div>
  );
};

export default Files;
