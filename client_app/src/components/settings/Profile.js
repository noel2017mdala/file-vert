import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { notify } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import { UPDATE_USER_PROFILE } from "../../Graphql/mutations";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import { useAuth } from "../../context/AuthContext";
import validateEmail from "../../helper/emailValidator";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
const Profile = ({ userData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorState, setErrorState] = useState({
    emailError: false,
    passwordErr: false,
    firstNameErr: false,
    lastNameErr: false,
    phoneNumberErr: false,
  });

  const { currentUser, socket } = useAuth();
  useEffect(() => {
    if (userData && userData.getUser) {
      setFirstName(userData.getUser.firstName);
      setLastName(userData.getUser.lastName);
      setEmail(userData.getUser.email);
      // let contactNumber = userData.getUser.phoneNumber.slice(3, userData.getUser.phoneNumber.length);
      // setPhoneNumber(contactNumber);
    }
  }, [userData]);

  const { mutateAsync: updateUserProfile } = useGQLMutation(
    UPDATE_USER_PROFILE,
    {
      onSuccess: () => {
        // console.log("user is ready to be logged in");
      },
    }
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
                Personal information
              </h2>
              <p className="text-sm text-gray-700 md:text-base">
                Update your personal details here
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                className="py-2 px-4 rounded-xl bg-brightRed hover:bg-brightRedLight text-white text-sm capitalize"
                onClick={async (e) => {
                  setLoader(true);
                  if (firstName === "" && lastName === "" && email === "") {
                    notify.fail("please enter all values");
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
                    notify.fail("please enter a valid email address");
                  } else {
                    const updateProfile = await updateUserProfile({
                      id: currentUser.user.id,
                      firstName,
                      lastName,
                      email,
                    });
                    if (
                      updateProfile.updateUserProfile &&
                      updateProfile.updateUserProfile.status
                    ) {
                      notify.success("profile updated successfully");
                      setLoader(false);
                    } else {
                      notify.success(
                        "failed to update your profile pleas try again later"
                      );

                      setLoader(false);
                    }
                  }
                }}
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

          <div className="mt-6 md:px-8 md:w-2/6">
            <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
              <div className="">
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

            <div className="mt-4 flex flex-col space-y-8">
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

              <div className=" pb-4 hidden">
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
            `}
                  placeholder="997216715"
                  required
                  autoComplete="off"
                  onChange={(text) => {
                    console.log(text);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
