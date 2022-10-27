import React, { useState } from "react";
import file from "../../images/file.png";
import "../../styles/Navigation.css";
import { Link } from "react-router-dom";
// import folder from "../../images/folder.png";

const Navigation = () => {
  const [navState, setNavBarState] = useState(false);
  return (
    <nav className="relative container  mx-auto p-6 navContainer ">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="pt-2">
          <div className="flex space-x-4">
            <img src={file} alt="file" className="w-8 h-8" />
            {/* <p className="text-2xl hover:text-darkGrayishBlue">File-vert</p> */}
            <Link to="/" className="text-2xl hover:text-darkGrayishBlue">
              File-vert
            </Link>
          </div>
        </div>
        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Pricing
          </a> */}
          <Link to="/pricing" className="hover:text-darkGrayishBlue">
            Pricing
          </Link>
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Formats
          </a> */}

          <Link to="/formats" className="hover:text-darkGrayishBlue">
            Formats
          </Link>
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Careers
          </a> */}

          <Link to="/careers" className="hover:text-darkGrayishBlue">
            Careers
          </Link>
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Contacts us
          </a> */}
          <Link to="/contact" className="hover:text-darkGrayishBlue">
            Contacts us
          </Link>

          {/* <a href="" className="hover:text-darkGrayishBlue">
            About us
          </a> */}

          <Link to="/about" className="hover:text-darkGrayishBlue">
            About us
          </Link>
        </div>

        {/* <a
          href=""
          className="hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
        >
          Get started
        </a> */}

        <Link
          to="/get-started"
          className="hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
        >
          Get started
        </Link>

        <button
          id="menu"
          className={`block mr-6 md:hidden focus:outline-none ${
            navState ? "open" : ""
          }`}
          onClick={() => {
            setNavBarState(!navState);
          }}
        >
          <div className="">
            <div className="cursor-pointer hamburger">
              <div className="bg-black w-8 h-1 m-1.5 hamburger-top"></div>
              <div className="bg-black w-8 h-1 m-1.5 hamburger-mid"></div>
              <div className="bg-black w-8 h-1 m-1.5 hamburger-bottom"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}

      <div className="md:hidden">
        <div
          className={`menu absolute flex flex-col items-center self-end ${
            !navState ? "hidden" : "block"
          } py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md`}
        >
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Pricing
          </a> */}
          <Link to="/pricing" className="hover:text-darkGrayishBlue">
            Pricing
          </Link>
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Formats
          </a> */}

          <Link to="/formats" className="hover:text-darkGrayishBlue">
            Formats
          </Link>
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Careers
          </a> */}

          <Link to="/careers" className="hover:text-darkGrayishBlue">
            Careers
          </Link>
          {/* <a href="" className="hover:text-darkGrayishBlue">
            Contacts us
          </a> */}
          <Link to="/contact" className="hover:text-darkGrayishBlue">
            Contacts us
          </Link>

          {/* <a href="" className="hover:text-darkGrayishBlue">
            About us
          </a> */}

          <Link to="/about" className="hover:text-darkGrayishBlue">
            About us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
