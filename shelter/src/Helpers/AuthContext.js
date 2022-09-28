import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  username: "",
  roles: [],
  accessToken: "",
  setUsername: (username) => "",
  setAuthenticated: (auth) => {},
  setAccessToken: (token) => "",
  setRoles: (roles) => [],
});

export default authContext;
