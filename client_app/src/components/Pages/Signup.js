import { Link } from "react-router-dom";
import file from "../../images/file.png";
import google from "../../images/google.svg";
const SignUp = () => {
  return (
    <div className="">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <img src={file} alt="file" className="w-8 h-8" />
          {/* <p className="text-2xl hover:text-darkGrayishBlue">File-vert</p> */}
          <Link
            to="/ge-started"
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
              // value={email}
              className="
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
              "
              placeholder="John"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-brightRedLight">
              Last Name
            </label>
            <input
              type="text"
              // value={email}
              className="
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
              "
              placeholder="Doe"
              required
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
            // value={email}
            className="
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
              "
            placeholder="name@filevert.com"
            required
          />
        </div>

        <div>
          {/* <h2 className="text-2xl font-bold">Login</h2> */}
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Phone Number
          </label>
          <input
            type="text"
            // value={email}
            className="
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
              "
            placeholder="Phone Number"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Password
          </label>
          <div className="flex flex-col items-end">
            <input
              type="password"
              // value={password}
              className="shadow
            appearance-none
            border
            rounded
            w-full
            py-3
            px-3
            text-gray-500
            leading-tight
            focus:outline-none focus:shadow-outline"
              placeholder="**********"
              required
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
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I have accepted the{" "}
            <span className="text-brightRedLight underline"> Terms of use</span> and
            <span className="text-brightRedLight underline"> privacy policy</span>
          </label>
        </div>

        <div>
          <button className="w-full px-6 py-3 rounded-xl bg-brightRed  transition hover:bg-brightRedLight focus:bg-brightRedLight active:bg-brightRed">
            <span className="font-semibold text-white text-lg">Sign Up</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
