import { useState } from "react";
import { notify } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import { UPDATE_USER_PASSWORD } from "../../Graphql/mutations";
import { useAuth } from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorState, setErrorState] = useState({
    oldPasswordErr: false,
    passwordErr: false,
    confirmPasswordErr: false,
  });

  const { currentUser, socket, userToken, updateToken } = useAuth();

  const { mutateAsync: updateUserPassword } = useGQLMutation(
    UPDATE_USER_PASSWORD,
    {
      onSuccess: () => {
        // console.log("user is ready to be logged in");
      },
    },
    userToken,
    currentUser.user.id
  );

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  return (
    <div className="mx-2">
      <div>
        <div className="">
          <div className="flex flex-col space-y-4 md:flex-row md:items-end md:justify-between md:px-8">
            <div>
              <h2 className="text-sm font-bold  text-brightRed md:text-base">
                Password information
              </h2>
              <p className="text-sm text-gray-700 md:text-base">
                Update your password details here
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                className={`py-2 px-4 rounded-xl bg-brightRed hover:bg-brightRedLight text-white text-sm capitalize ${
                  loader ? "cursor-not-allowed" : ""
                }`}
                onClick={async (e) => {
                  setLoader(true);

                  if (
                    oldPassword === "" &&
                    password === "" &&
                    confirmPassword === ""
                  ) {
                    notify.fail("please enter all values");
                    setLoader(false);
                    setErrorState({
                      oldPasswordErr: true,
                      passwordErr: true,
                      confirmPasswordErr: true,
                    });
                  } else if (oldPassword === "") {
                    setErrorState({
                      oldPasswordErr: true,
                      passwordErr: false,
                      confirmPasswordErr: false,
                    });
                    setLoader(false);
                  } else if (password === "") {
                    setErrorState({
                      oldPasswordErr: false,
                      passwordErr: true,
                      confirmPasswordErr: false,
                    });
                    setLoader(false);
                  } else if (confirmPassword === "") {
                    setErrorState({
                      oldPasswordErr: false,
                      passwordErr: false,
                      confirmPasswordErr: true,
                    });
                    setLoader(false);
                  } else if (password !== confirmPassword) {
                    setErrorState({
                      oldPasswordErr: false,
                      passwordErr: true,
                      confirmPasswordErr: true,
                    });
                    setLoader(false);
                    notify.fail("passwords do not match");
                  } else if (password.length < 6) {
                    setLoader(false);
                    notify.fail("passwords do not match");
                  } else {
                    const updatePassword = await updateUserPassword({
                      id: currentUser.user.id,
                      oldPassword,
                      password,
                      confirmPassword,
                    });

                    if (
                      updatePassword.updateUserPassword &&
                      updatePassword.updateUserPassword.status
                    ) {
                      if (updatePassword.updateUserPassword.token) {
                        updateToken(updatePassword.updateUserPassword.token);
                      }
                      notify.success(updatePassword.updateUserPassword.message);
                      setLoader(false);
                      setPassword("");
                      setConfirmPassword("");
                      setOldPassword("");
                    } else {
                      console.log(updatePassword);
                      notify.fail("unable to update password");
                      setLoader(false);
                      setPassword("");
                      setConfirmPassword("");
                      setOldPassword("");
                    }
                  }
                }}
                disabled={loader ? "disabled" : ""}
              >
                {loader ? (
                  <ClipLoader
                    color="#FFFFFF"
                    css={override}
                    size={15}
                    className=""
                  />
                ) : (
                  "save"
                )}
              </button>
              <button className="py-2 px-4 rounded-xl border border-gray-400 text-sm capitalize">
                cancel
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 md:px-8">
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-brightRedLight">
                Old password
              </label>
              <input
                type="password"
                value={oldPassword}
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
              errorState.oldPasswordErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
              `}
                placeholder="******"
                autoComplete="off"
                required
                onChange={(text) => {
                  setErrorState({
                    oldPasswordErr: false,
                    passwordErr: false,
                    confirmPasswordErr: false,
                  });
                  setOldPassword(text.target.value);
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-brightRedLight">
                New password
              </label>
              <input
                type="password"
                value={password}
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
              errorState.passwordErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
              `}
                placeholder="******"
                required
                autoComplete="off"
                onChange={(text) => {
                  setErrorState({
                    oldPasswordErr: false,
                    passwordErr: false,
                    confirmPasswordErr: false,
                  });
                  setPassword(text.target.value);
                }}
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium text-brightRedLight">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
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
              errorState.confirmPasswordErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
              `}
                placeholder="******"
                autoComplete="off"
                required
                onChange={(text) => {
                  setErrorState({
                    oldPasswordErr: false,
                    passwordErr: false,
                    confirmPasswordErr: false,
                  });
                  setConfirmPassword(text.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Password;
