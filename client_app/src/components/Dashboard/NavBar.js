import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import file from "../../images/file.png";
import userProfile from "../../images/userProfile.jpeg";
const Navbar = () => {
  const [openDropDown, setopenDropDown] = useState(false);
  const [openNotifications, seOpenNotifications] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const { currentUser, socket, logUserOut } = useAuth();

  useEffect(() => {
    socket.on("file-download", (data) => {
      setShakeAnimation(!shakeAnimation);
    });
  }, [socket]);

  return (
    <nav className="bg-white py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="ml-4">
          <div className="hidden md:flex space-x-2 md:space-x-4 ">
            <img src={file} alt="file" className="w-6 h-6 md:w-8 md:h-8" />
            {/* <p className="text-2xl hover:text-darkGrayishBlue">File-vert</p> */}
            <p className="text-sm md:text-2xl">File-vert</p>
          </div>
        </div>

        <div className="flex flex-row space-x-12">
          <div>
            <button
              className={`hidden md:inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none ${
                shakeAnimation === true ? "animate-shake" : ""
              }`}
              type="button"
              onClick={() => {
                if (openNotifications) {
                  setopenDropDown(false);
                }
                seOpenNotifications(!openNotifications);
              }}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
              <div className="flex relative">
                <div className="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
            </button>
          </div>

          <div className=" md:right-6 ">
            <button
              className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-brightRed  md:mr-0 focus:ring-4 focus:ring-gray-100 "
              type="button"
              onClick={() => {
                if (openNotifications) {
                  seOpenNotifications(false);
                }
                setopenDropDown(!openDropDown);
              }}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="mr-2 w-8 h-8 rounded-full"
                src={userProfile}
                alt="user photo"
              />
              <p className="hidden md:block">
                {currentUser &&
                  `${currentUser.user.firstName} ${currentUser.user.lastName}`}
              </p>
              <svg
                className="w-4 h-4 mx-1.5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {openDropDown ? (
          <div className="absolute top-12 right-2 z-10">
            <div
              id="dropdownAvatarName"
              className="relative  w-44 mt-4 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              {/* <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                <div className="font-medium ">Pro User</div>
                <div className="truncate">name@flowbite.com</div>
              </div> */}

              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
              >
                <li>
                  <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Dashboard
                  </p>
                </li>
                <li>
                  <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Messages
                  </p>
                </li>
                <li>
                  <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Settings
                  </p>
                </li>
              </ul>
              <div
                className="py-1 cursor-pointer"
                onClick={() => {
                  logUserOut(currentUser.user.id);
                }}
              >
                <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {openNotifications ? (
          <div className="hidden md:block absolute top-16 right-16 z-10">
            <div
              id="dropdownNotification"
              className=" z-20 w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
            >
              <div className="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white">
                Notifications
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {/* <p className="text-center">you do not have any notifications</p> */}

                <a
                  href="#"
                  className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    {/* <img
                      className="w-11 h-11 rounded-full"
                      src={userProfile}
                      alt="Jese image"
                    /> */}
                    {/* <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
                      <svg
                        className="w-3 h-3 text-white"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                    </div> */}
                  </div>
                  <div className="pl-3 w-full">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      {/* New message from{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Jese Leos
                      </span> */}
                      you do not have any notifications
                    </div>
                    {/* <div className="text-xs text-blue-600 dark:text-blue-500">
                      a few moments ago
                    </div> */}
                  </div>
                </a>
                {/* <a
                  href="#"
                  className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-11 h-11 rounded-full"
                      src={userProfile}
                      alt="Jese image"
                    />
                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
                      <svg
                        className="w-3 h-3 text-white"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3 w-full">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      New message from{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Jese Leos
                      </span>
                      : "Hey, what's up? All set for the presentation?"
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      a few moments ago
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-11 h-11 rounded-full"
                      src={userProfile}
                      alt="Jese image"
                    />
                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-800">
                      <svg
                        className="w-3 h-3 text-white"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3 w-full">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Joseph Mcfall
                      </span>{" "}
                      and{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        5 others
                      </span>{" "}
                      started following you.
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      10 minutes ago
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-11 h-11 rounded-full"
                      src={userProfile}
                      alt="Jese image"
                    />
                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-800">
                      <svg
                        className="w-3 h-3 text-white"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3 w-full">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Bonnie Green
                      </span>{" "}
                      and{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        141 others
                      </span>{" "}
                      love your story. See it and view more stories.
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      44 minutes ago
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-11 h-11 rounded-full"
                      src={userProfile}
                      alt="Jese image"
                    />
                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-800">
                      <svg
                        className="w-3 h-3 text-white"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3 w-full">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Leslie Livingston
                      </span>{" "}
                      mentioned you in a comment:{" "}
                      <span className="font-medium text-blue-500" href="#">
                        @bonnie.green
                      </span>{" "}
                      what do you say?
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      1 hour ago
                    </div>
                  </div>
                </a> */}
              </div>

              <a
                href="#"
                className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
              >
                <div className="inline-flex items-center ">
                  <svg
                    className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  View all
                </div>
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
