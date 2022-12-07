import { useState } from "react";
import data from "../../helper/accordionData";
import Accordion from "../Accordion";
const Format = () => {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <section>
      <div className="min-h-screen bg-white">
        {/* <div className="flex flex-col items-center justify-center  h-screen">
        
        </div> */}

        <h3 className="font-bold text-sm md:text-xl text-brightRedLight mt-12 text-center p-4 md:p-12">
          Common file formats
        </h3>

        <section className="max-w-6xl mx-auto ">
          {data.map((items, index) => (
            <div key={index} className=" m-4">
              <Accordion title={items.title} content={items.formats} />
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default Format;
