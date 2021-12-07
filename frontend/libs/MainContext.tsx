import { createContext, useContext, useEffect, useState } from "react";
import { getUser, GET_USER_QUERY, refreshToken } from "./useUser";
import React from "react";
import { useQuery } from "@apollo/client";
// import { vars } from "../styles/globalVariables";
// interface MainContextType {
//   user: {
//     username: string;
//   };
// }

interface Theme {
  darker: string;
  dark: string;
  light: string;
  lighter: string;
  lightest: string;
}

interface User {
  firstName?: string;
  lastName?: string;
  groups?: string;
  username?: string;
  __typename?: string;
  loading?: string;
}

interface HighOrderObject {
  theme?: string;
  user?: User;
}

const MainContext = createContext<{ user: User; theme: Theme }>({
  user: null,
  theme: null,
});
const MainProvider = MainContext.Provider;
function MainContextProvider({ children }) {
  const { getUser: user } = getUser({ fetchPolicy: "cache-and-network" });
  const isSignedIn = () => {
    if (!user) {
      return false;
    } else if (user && user.loading !== "loading") {
      return true;
    }
  };
  const [theme, setTheme] = useState({
    darkerer:"#30343F",
    darker: "#474957",
    dark: "#5D5E6F",
    light: "#CEC5E7",
    lighter: "#EFEAFF",
    lighterer:"#F5F2FF",
    lightest: "#F2EEFF",
  });

  return <MainProvider value={{ user,theme }}>{children}</MainProvider>;
}

function useMainContext() {
  return useContext(MainContext);
}
export { MainContextProvider, useMainContext };
