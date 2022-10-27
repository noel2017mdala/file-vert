import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <section id="cta" className="bg-brightRed">
      <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
        <h2 className="text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left">
          Simplifies how files are converted
        </h2>

        <div className="">
          <Link
            to="/get-started"
            className="p-3 px-6 pt-2 text-brightRed bg-white rounded-full font-bold shadow-2xl hover:bg-gray-300"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
