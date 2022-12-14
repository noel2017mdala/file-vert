import React, { useState } from "react";
import emailValidator from "../../helper/emailValidator";
import { Link, useNavigate } from "react-router-dom";
import file from "../../images/file.png";
import google from "../../images/google.svg";
import SignUp from "./Signup";
import { LOGIN } from "../../Graphql/mutations";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import { GET_USER } from "../../Graphql/queries";
import { useGQLQuery } from "../../hooks/useGqlQueries";
import { ToastContainer } from "react-toastify";
import { notify } from "../../helper/notification";
import { useAuth } from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const Login = () => {
  const [tabState, changeStabState] = useState({
    login: true,
    createAccount: false,
  });

  return (
    <div>
      {tabState.login ? (
        <UserLogin />
      ) : tabState.createAccount ? (
        <SignUp loginTab={changeStabState} loginTabState={tabState} />
      ) : null}
      {tabState.login ? (
        <button
          className="w-max p-3 -ml-3"
          onClick={() => {
            changeStabState({
              login: false,
              createAccount: true,
            });
          }}
        >
          <span className="text-sm tracking-wide text-blue-600">
            Create new account
          </span>
        </button>
      ) : tabState.createAccount ? (
        <button
          className="w-max p-3 -ml-3"
          onClick={() => {
            changeStabState({
              login: true,
              createAccount: false,
            });
          }}
        >
          <span className="text-sm tracking-wide text-blue-600">
            Already have an account
          </span>
        </button>
      ) : null}
    </div>
  );
};

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const [errorState, setErrorState] = useState({
    emailError: false,
    passwordErr: false,
    emailErrMsg: "",
    passwordErrMsg: "",
  });

  const { userAuthLogin, currentUser } = useAuth();

  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGQLQuery(
    "get_user",
    GET_USER,
    { id: "6358f9826d0e20fdd55a80ec" },
    {
      enabled: false,
    }
  );

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  return (
    <div className="">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <img src={file} alt="file" className="w-8 h-8" />
          <Link
            to="/get-started"
            className="text-2xl hover:text-darkGrayishBlue"
          >
            File-vert
          </Link>
        </div>

        <p>Welcome to File-vert! Login first</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <button className="py-3 px-6 rounded-xl bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200">
          <div className="flex gap-4 justify-center">
            <img src={google} className="w-5" alt="" />
            <span className="block w-max font-medium tracking-wide text-sm text-blue-700">
              with Google
            </span>
          </div>
        </button>
        <button className="py-3 px-6 rounded-xl bg-gray-900 transition hover:bg-gray-800 active:bg-gray-600 focus:bg-gray-700">
          <div className="flex gap-4 items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="block w-max font-medium tracking-wide text-sm text-white">
              with Github
            </span>
          </div>
        </button>
      </div>

      <div role="hidden" className="mt-12 border-t">
        <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">
          Or
        </span>
      </div>

      <form className="space-y-6 py-6">
        <div>
          {/* <h2 className="text-2xl font-bold">Login</h2> */}
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Email
          </label>
          <input
            type="email"
            value={email}
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
              errorState.emailError
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
            `}
            placeholder="name@filevert.com"
            required
            onChange={(text) => {
              setErrorState({
                emailError: false,
                passwordErr: false,
                emailErrMsg: "",
                passwordErrMsg: "",
              });
              setEmail(text.target.value);
            }}
          />
        </div>

        <p className="text-red-500 text-sm italic py-2">
          {errorState.emailError ? errorState.emailErrMsg : null}
        </p>

        <div>
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Password
          </label>
          <div className="flex flex-col items-end">
            <input
              type="password"
              id="password"
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
              placeholder="**********"
              required
              onChange={(text) => {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  emailErrMsg: "",
                  passwordErrMsg: "",
                });
                setPassword(text.target.value);
              }}
            />
            <button
              type="reset"
              className="w-max p-3 -mr-3"
              onClick={async () => {
                // let userData = await refetch();
                // console.log(userData.data.getUser);
              }}
            >
              <span className="text-sm tracking-wide text-blue-600">
                Forgot password ?
              </span>
            </button>
          </div>

          <p className="text-red-500 text-sm italic py-2">
            {errorState.passwordErr ? errorState.passwordErrMsg : null}
          </p>
        </div>

        <div>
          <button
            className="w-full px-6 py-3 rounded-xl bg-brightRed  transition hover:bg-brightRedLight focus:bg-brightRedLight active:bg-brightRed"
            onClick={async (e) => {
              e.preventDefault();
              setLoader(true);

              if (email === "" && password === "") {
                setErrorState({
                  emailError: true,
                  passwordErr: true,
                  emailErrMsg: "Please enter your email",
                  passwordErrMsg: "Please enter your password",
                });
                setLoader(false);
              } else if (email === "") {
                setErrorState({
                  emailError: true,
                  emailErrMsg: "Please enter your email",
                });
                setLoader(false);
              } else if (!emailValidator(email)) {
                setErrorState({
                  emailError: true,
                  emailErrMsg: "Please enter a valid email address",
                });
                setLoader(false);
              } else if (password === "") {
                setErrorState({
                  passwordErr: true,
                  passwordErrMsg: "Please enter your password",
                });
                setLoader(false);
              } else if (password.length < 6) {
                setErrorState({
                  passwordErr: true,
                  passwordErrMsg:
                    "Password should not be less than 6 characters",
                });
                setLoader(false);
              } else {
                try {
                  const getUserAuth = await userAuthLogin(email, password);

                  if (getUserAuth) {
                    setEmail("");
                    setPassword("");
                    navigate("/dashboard");
                  } else {
                    setEmail("");
                    setPassword("");
                    notify.fail("Invalid email or password.");
                    setLoader(false);
                  }
                } catch (error) {
                  setEmail("");
                  setPassword("");
                  notify.fail("Failed to login.");
                  setLoader(false);
                }
              }
            }}
          >
            <span className="font-semibold text-white text-lg">
              {loader ? (
                <ClipLoader
                  color="#FFFFFF"
                  css={override}
                  size={15}
                  className=""
                />
              ) : (
                "Login"
              )}
            </span>
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
