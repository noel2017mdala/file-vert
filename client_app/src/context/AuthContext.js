import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useGQLQuery } from "../hooks/useGqlQueries";
import { useGQLMutation } from "../hooks/useGqlMutations";
import { LOGIN, TOKEN_REFRESH } from "../Graphql/mutations";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userToken, setUserToken] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const { mutateAsync: userLogin } = useGQLMutation(LOGIN, {
    onSuccess: () => {
      // console.log("user is ready to be logged in");
    },
  });

  const { mutateAsync: tokenRefresh } = useGQLMutation(TOKEN_REFRESH, {
    onSuccess: () => {
      // console.log("user is ready to be logged in");
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = window.localStorage.getItem("user_items");
    if (userAuth) {
      getUserToken();
    } else {
      setLoadingState(false);
    }
  }, []);

  const getUserToken = async () => {
    const userAuth = window.localStorage.getItem("user_items");
    if (userAuth) {
      let userAuthData = JSON.parse(userAuth).user.id;
      if (userAuthData) {
        let checkRefreshToken = await tokenRefresh({ id: userAuthData });

        const { response, token } = checkRefreshToken.tokenRefresh; 
        if (response.status && userAuth) {
           
          setUserToken(token);
          setCurrentUser(JSON.parse(userAuth));
          navigate("/dashboard");
        }
      }
    }

    setLoadingState(false);
  };

  // const checkUserAuth = async () => {
  //   const userAuth = window.localStorage.getItem("user_items");
  //   if (userAuth && userToken) {
  //     setCurrentUser(JSON.parse(userAuth));
  //     navigate("/dashboard");
  //   }

  //   setLoadingState(false);
  // };

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
      console.log(userData);

      window.localStorage.setItem("user_items", JSON.stringify(userData));
      setCurrentUser(userData);
      setUserToken(userLogIn.userLogin.token);

      return true;
    } else {
      return false;
    }
  };
  const value = {
    userToken,
    currentUser,
    userAuthLogin,
  };
  return loadingState ? (
    <p>Loading</p>
  ) : (
    <AuthContext.Provider value={value}>
      {!loadingState && children}
    </AuthContext.Provider>
  );
};
