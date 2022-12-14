import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import userProfile from "../../images/userProfile.jpeg";
import files_dashboard from "../../images/files_dashboard.svg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Sidebar = ({ state, changeState }) => {
  const { currentUser, logUserOut } = useAuth();
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="min-h-screen">
      <div
        className={`flex flex-col top-0 left-0 ${
          openSideBar ? "w-64" : "w-20"
        } bg-white h-full border-r relative duration-300`}
      >
        <div
          className="absolute cursor-pointer -right-1 top-9 w-7  mt-12"
          onClick={() => {
            setOpenSideBar(!openSideBar);
          }}
        >
          {openSideBar ? (
            <MdArrowBack color="F6866A" size={25} />
          ) : (
            <MdArrowForward color="F6866A" size={25} />
          )}
        </div>
        <div className="flex items-center justify-center  border-b  md:my-0 ">
          <div className="flex flex-col md:flex-row items-center p-2 space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={userProfile}
              alt=""
              className="w-12 h-12 rounded-full dark:bg-gray-500"
            />
            <div className={`${!openSideBar ? "hidden" : "block"}`}>
              <h2 className="text-lg font-semibold">
                Hello {currentUser && currentUser.user.firstName}
              </h2>
              <span className="flex items-center space-x-1">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  View profile
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto overflow-x-hidden flex-grow mt-6">
          <ul className="flex flex-col py-4 space-y-1">
            <li
              onClick={() => {
                changeState({
                  dashboard: true,
                  messages: false,
                  notifications: false,
                  files: false,
                  profile: false,
                  settings: false,
                });
              }}
            >
              <p
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-brightRed cursor-pointer ${
                  state.dashboard ? "bg-gray-50 border-brightRed" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    !openSideBar ? "hidden" : "block"
                  }`}
                >
                  Dashboard
                </span>
              </p>
            </li>

            <li
              onClick={() => {
                changeState({
                  dashboard: false,
                  messages: true,
                  notifications: false,
                  files: false,
                  profile: false,
                  settings: false,
                });
              }}
            >
              <p
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-brightRed cursor-pointer ${
                  state.messages ? "bg-gray-50 border-brightRed" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </span>

                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    !openSideBar ? "hidden" : "block"
                  }`}
                >
                  Messages
                </span>

                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                  0
                </span>
              </p>
            </li>

            <li
              onClick={() => {
                changeState({
                  dashboard: false,
                  messages: false,
                  notifications: true,
                  files: false,
                  profile: false,
                  settings: false,
                });
              }}
            >
              <p
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-brightRed cursor-pointer ${
                  state.notifications ? "bg-gray-50 border-brightRed" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </span>

                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    !openSideBar ? "hidden" : "block"
                  }`}
                >
                  Notifications
                </span>

                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                  0
                </span>
              </p>
            </li>

            <li
              onClick={() => {
                changeState({
                  dashboard: false,
                  messages: false,
                  notifications: false,
                  files: true,
                  profile: false,
                  settings: false,
                });
              }}
            >
              <p
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-brightRed cursor-pointer ${
                  state.files ? "bg-gray-50 border-brightRed" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <img src={files_dashboard} width="24" height="24" />
                </span>

                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    !openSideBar ? "hidden" : "block"
                  }`}
                >
                  Files
                </span>
              </p>
            </li>

            {/* <li
              onClick={() => {
                changeState({
                  dashboard: false,
                  messages: false,
                  notifications: false,
                  files: false,
                  profile: true,
                  settings: false,
                });
              }}
            >
              <p
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-brightRed cursor-pointer ${
                  state.profile ? "bg-gray-50 border-brightRed" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>

                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    !openSideBar ? "hidden" : "block"
                  }`}
                >
                  Profile
                </span>
              </p>
            </li> */}

            <li
              onClick={() => {
                changeState({
                  dashboard: false,
                  messages: false,
                  notifications: false,
                  files: false,
                  profile: false,
                  settings: true,
                });
              }}
            >
              <p
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-brightRed cursor-pointer ${
                  state.settings ? "bg-gray-50 border-brightRed" : ""
                }`}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>

                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    !openSideBar ? "hidden" : "block"
                  }`}
                >
                  Settings
                </span>
              </p>
            </li>

            <li
              onClick={() => {
                logUserOut(currentUser.user.id);
              }}
            >
              <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-brightRed cursor-pointer">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>

                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    !openSideBar ? "hidden" : "block"
                  }`}
                >
                  Logout
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
