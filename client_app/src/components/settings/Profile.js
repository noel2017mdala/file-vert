import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
const Profile = ({ userData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (userData && userData.getUser) {
      setFirstName(userData.getUser.firstName);
      setLastName(userData.getUser.lastName);
      setEmail(userData.getUser.email);
    }
  }, [userData]);
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
              <button className="py-2 px-4 rounded-xl bg-brightRed hover:bg-brightRedLight text-white text-sm capitalize">
                save
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
              `}
                  placeholder="John"
                  autoComplete="off"
                  required
                  onChange={(text) => {
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
              `}
                  placeholder="Doe"
                  required
                  autoComplete="off"
                  onChange={(text) => {
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
            `}
                  placeholder="name@filevert.com"
                  required
                  autoComplete="off"
                  onChange={(text) => {
                    setEmail(text.target.value);
                  }}
                />
              </div>

              <div className=" pb-4">
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
    </div>
  );
};

export default Profile;
