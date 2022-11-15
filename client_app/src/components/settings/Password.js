import { useState } from "react";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
              <button className="py-2 px-4 rounded-xl bg-brightRed hover:bg-brightRedLight text-white text-sm capitalize">
                save
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
              `}
              placeholder="******"
                autoComplete="off"
                required
                onChange={(text) => {
                  console.log(text);
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
              `}
              placeholder="******"
                required
                autoComplete="off"
                onChange={(text) => {
                  console.log(text);
                }}
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium text-brightRedLight">
                Confirm password
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
              `}
                placeholder="******"
                autoComplete="off"
                required
                onChange={(text) => {
                  console.log(text);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
