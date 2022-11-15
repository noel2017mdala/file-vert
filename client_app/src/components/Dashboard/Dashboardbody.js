import React, { useState, useCallback, useEffect } from "react";
import Navbar from "./NavBar";
import GetStarted from "../Pages/FileUpload";
import Messages from "./Messages";
import Notification from "./Notification";
import Files from "./Files";
import { useGQLQuery } from "../../hooks/useGqlQueries";
import { GET_USER } from "../../Graphql/queries";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import { UPDATE_USER_ACTIVE } from "../../Graphql/mutations";
import Settings from "../Pages/Settings";

const DashboardBody = ({ state, changeState }) => {
  const { currentUser, socket } = useAuth();
  const MySwal = withReactContent(Swal);

  const { mutateAsync: updateUserState } = useGQLMutation(UPDATE_USER_ACTIVE, {
    onSuccess: () => {
      // console.log("user is ready to be logged in");
    },
  });

  const { data, isLoading, error } = useGQLQuery("get_user", GET_USER, {
    id: currentUser.user.id,
  });

  // if (!isLoading) {
  //   console.log(data.getUser.userActive);
  // }

  const demoFile = () => {
    MySwal.fire({
      icon: "info",
      title: `Welcome ${currentUser.user.firstName}`,
      text: "you are currently using the free trial subscription, but you can change in the setting tab",
      confirmButtonColor: "#F25F3A",
      preConfirm: async () => {
        await updateUserState({
          id: currentUser.user.id,
        });
      },
      allowOutsideClick: async () => {
        await updateUserState({
          id: currentUser.user.id,
        });

        // return !Swal.isLoading();
      },
    });
  };

  useEffect(() => {
    if (!isLoading && !data.getUser.userActive) {
      demoFile();
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-white w-screen">
      <Navbar userData={data} />

      <div>
        {state.dashboard ? (
          <GetStarted />
        ) : state.messages ? (
          <Messages userData={data} />
        ) : state.notifications ? (
          <Notification userData={data} />
        ) : state.files ? (
          <Files userData={data} />
        ) : state.settings ? (
          <Settings userData={data} />
        ) : (
          "Nothing to display"
        )}
      </div>
    </div>
  );
};

export default DashboardBody;
