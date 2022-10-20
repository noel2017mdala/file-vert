import React, { useState, useCallback } from "react";
import Login from "./Login";
import SignUp from "./Signup";
const Form = () => {


  return (
    <section>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="">
          <Login />
        </div>
      </div>
    </section>
  );
};

export default Form;
