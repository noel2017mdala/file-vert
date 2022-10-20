import React from "react";
import "../../styles/heroSection.css";
import fileImage from "../../images/undraw_file_bundle_re_6q1e.svg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold  text-center md:text-5xl md:text-left">
            Convert all kinds of files{" "}
            <div className="text-brightRedLight uppercase words mx-4 inline">
              <span>pdf</span>
              <span>epub</span>
              <span>SVG</span>
              <span>MP4</span>
              <span>doc</span>
              {/* <span>csv</span> */}
            </div>
          </h1>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
            File-vert makes it simple to easily Convert all you files to any
            format of your choice while keeping your pockets safe.
          </p>

          <div className="flex justify-center md:justify-start">
            <Link
              to="/ge-started"
              className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={fileImage} alt="file" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
