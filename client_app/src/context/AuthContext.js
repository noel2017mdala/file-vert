import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useGQLQuery } from "../hooks/useGqlQueries";
import { useGQLMutation } from "../hooks/useGqlMutations";
import { LOGIN } from "../Graphql/mutations";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const { mutateAsync: userLogin } = useGQLMutation(LOGIN, {
    onSuccess: () => {
      // console.log("user is ready to be logged in");
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const userAuth = window.localStorage.getItem("user_items");
    if (userAuth) {
      setCurrentUser(JSON.parse(userAuth));
      navigate("/dashboard");
    }
  };

  const userAuthLogin = async (email, password) => {
    let userLogIn = await userLogin({
      email: email,
      password: password,
    });

    if (userLogIn.userLogin && userLogIn.userLogin.response.status) {
      let userData = {
        loggedIn: true,
        user: userLogIn.userLogin.user,
      };

      window.localStorage.setItem("user_items", JSON.stringify(userData));
      setCurrentUser(userData);

      return true;
    } else {
      return false;
    }
  };
  const value = {
    currentUser,
    userAuthLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
