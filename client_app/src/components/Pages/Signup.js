import React, { useState } from "react";
import { Link } from "react-router-dom";
import file from "../../images/file.png";
import google from "../../images/google.svg";
import validateEmail from "../../helper/emailValidator";
import { CREATE_ACCOUNT } from "../../Graphql/mutations";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

import { notify } from "../../helper/notification";

const SignUp = ({ loginTabState, loginTab }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const [errorState, setErrorState] = useState({
    emailError: false,
    passwordErr: false,
    firstNameErr: false,
    lastNameErr: false,
    phoneNumberErr: false,
  });

  const { mutateAsync: createUser } = useGQLMutation(CREATE_ACCOUNT, {
    onSuccess: () => {
      // console.log("user is ready to be logged in");
    },
  });

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <img src={file} alt="file" className="w-8 h-8" />
          {/* <p className="text-2xl hover:text-darkGrayishBlue">File-vert</p> */}
          <Link
            to="/get-started"
            className="text-2xl hover:text-darkGrayishBlue"
          >
            File-vert
          </Link>
        </div>

        <p>Welcome to File-vert! Please create your account</p>
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
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="text-sm my-2">
            Create your account. It's free and
            <span className="text-brightRedLight"> No credit card needed</span>
          </p>
        </div>

        <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
          <div>
            <label className="block mb-2 text-sm font-medium text-brightRedLight">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
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
              errorState.firstNameErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
              `}
              placeholder="John"
              autoComplete="off"
              required
              onChange={(text) => {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setFirstName(text.target.value);
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-brightRedLight">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
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
              errorState.lastNameErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
              `}
              placeholder="Doe"
              required
              autoComplete="off"
              onChange={(text) => {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setLastName(text.target.value);
              }}
            />
          </div>
        </div>

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
            autoComplete="off"
            onChange={(text) => {
              setErrorState({
                emailError: false,
                passwordErr: false,
                firstNameErr: false,
                lastNameErr: false,
                phoneNumberErr: false,
              });
              setEmail(text.target.value);
            }}
          />
        </div>

        <div>
          {/* <h2 className="text-2xl font-bold">Login</h2> */}
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Phone Number
          </label>
          <PhoneInput
            defaultCountry="MW"
            // type="text"
            // value={phoneNumber}
            value={phoneNumber}
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
              errorState.phoneNumberErr
                ? ` border-solid
            border-red-500
              border-3`
                : null
            }
            `}
            placeholder="991234123"
            required
            autoComplete="off"
            onChange={(text) => {
              setErrorState({
                emailError: false,
                passwordErr: false,
                firstNameErr: false,
                lastNameErr: false,
                phoneNumberErr: false,
              });
              setPhoneNumber(text);
            }}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Password
          </label>
          <div className="flex flex-col items-end">
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
              placeholder="**********"
              required
              autoComplete="off"
              onChange={(text) => {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setPassword(text.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-700 ">
            I have accepted the
            <span className="text-brightRedLight underline cursor-pointer">
              {" "}
              Terms of use{" "}
            </span>
            and
            <span className="text-brightRedLight underline cursor-pointer">
              {" "}
              privacy policy{" "}
            </span>
          </label>
        </div>

        <div>
          <button
            className="w-full px-6 py-3 rounded-xl bg-brightRed  transition hover:bg-brightRedLight focus:bg-brightRedLight active:bg-brightRed"
            onClick={async (e) => {
              e.preventDefault();
              setLoader(true);
              if (
                firstName === "" &&
                lastName === "" &&
                email === "" &&
                phoneNumber === "" &&
                password === ""
              ) {
                setErrorState({
                  emailError: true,
                  passwordErr: true,
                  firstNameErr: true,
                  lastNameErr: true,
                  phoneNumberErr: true,
                });
                setLoader(false);
              } else if (firstName === "") {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: true,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setLoader(false);
              } else if (lastName === "") {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: true,
                  phoneNumberErr: false,
                });
                setLoader(false);
              } else if (email === "") {
                setErrorState({
                  emailError: true,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setLoader(false);
              } else if (!validateEmail(email)) {
                setErrorState({
                  emailError: true,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setLoader(false);
              } else if (!phoneNumber) {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: true,
                });
                setLoader(false);
              } else if (phoneNumber === "") {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: true,
                });
                setLoader(false);
              } else if (phoneNumber.length < 9) {
                setErrorState({
                  emailError: false,
                  passwordErr: false,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: true,
                });
                setLoader(false);
              } else if (password === "") {
                setErrorState({
                  emailError: false,
                  passwordErr: true,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setLoader(false);
              } else if (password.length < 6) {
                setErrorState({
                  emailError: false,
                  passwordErr: true,
                  firstNameErr: false,
                  lastNameErr: false,
                  phoneNumberErr: false,
                });
                setLoader(false);
              } else {
                let getTimeZone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
                let createUserData = await createUser({
                  input: {
                    firstName,
                    lastName,
                    email,
                    phoneNumber: phoneNumber.substring(1),
                    password,
                    timeZone: getTimeZone,
                  },
                });

                if (createUserData.createUser) {
                  if (createUserData.createUser.status) {
                    notify.success(createUserData.createUser.message);

                    setTimeout(() => {
                      loginTab({
                        ...loginTabState,
                        login: true,
                        createAccount: false,
                      });
                    }, 3000);
                    setLoader(false);
                  } else {
                    notify.fail(createUserData.createUser.message);
                    setLoader(false);
                  }
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
                "Sign Up"
              )}
            </span>
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
