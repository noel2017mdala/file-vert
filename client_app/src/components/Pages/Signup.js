const SignUp = () => {
  return (
    <div>
      <form>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            User Name
          </label>
          <input
            type="text"
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
            placeholder="User Name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Email
          </label>
          <input
            type="email"
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
            placeholder="name@filevert.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Phone Number
          </label>
          <input
            type="number"
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
            placeholder="Phone Number"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-brightRedLight">
            Password
          </label>
          <input
            type="password"
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

        <button
          type="submit"
          className="bg-brightRedLight text-white   font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center hover:bg-brightRed"
          onClick={(e) => {
            e.preventDefault();
            console.log("you are about to login");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
