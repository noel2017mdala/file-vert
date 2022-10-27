import ade from "../../images/ade-B0q7eBuXKjA-unsplash.jpg";
import askas from "../../images/askas-jeremy-7TI-3jUObYg-unsplash.jpg";
import stephanie from "../../images/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg";
import { Link } from "react-router-dom";

const Testimonials = () => {
  return (
    <section id="testimonials">
      <div className="max-w-6 px-5 mx-auto mt-32 text-center">
        <h2 className="text-4xl font-bold text-center">
          What others say about File-vert
        </h2>

        <div className="flex flex-col items-center justify-center mt-24  md:flex-row md:space-x-6">
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/4">
            <img
              src={ade}
              className="w-24 h-24 -mt-14 rounded-full border-2"
              alt="Ada Achebe"
            />

            <h5 className="text-lg font-bold capitalize">Ada Achebe</h5>
            <p className="text-sm text-darkGrayishBlue">
              This app allows me to easily convert files. The interface is easy
              to navigate and I find everything I need quickly. I cant wait for
              more feature!
            </p>
          </div>

          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/4">
            <img
              src={askas}
              className="w-24 h-24 -mt-14 rounded-full border-2"
              alt="Ada Achebe"
            />

            <h5 className="text-lg font-bold capitalize">askas Oladele</h5>
            <p className="text-sm text-darkGrayishBlue">
              This app allows me to easily convert files. The interface is easy
              to navigate and I find everything I need quickly. I cant wait for
              more feature!
            </p>
          </div>
          {/* 
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/4">
            <img
              src={stephanie}
              className="w-24 h-24 -mt-14 rounded-full border-2"
              alt="Ada Achebe"
            />

            <h5 className="text-lg font-bold capitalize">stephanie Harper</h5>
            <p className="text-sm text-darkGrayishBlue">
              This app is one of, if not the best file conversion application i
              have ever used and i also like how easy it is to navigate
            </p>
          </div> */}

          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/4">
            <img
              src={stephanie}
              className="w-24 h-24 -mt-14 rounded-full border-2"
              alt="Ada Achebe"
            />

            <h5 className="text-lg font-bold capitalize">stephanie Harper</h5>
            <p className="text-sm text-darkGrayishBlue">
              This app is one of, if not the best file conversion application i
              have ever used and i also like how easy it is to navigate
            </p>
          </div>
        </div>

        <div className="my-16">
          <div className="">
            {/* <a
              href=""
              className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
            >
              Get started
            </a> */}

            <Link
              to="/get-started"
              className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
