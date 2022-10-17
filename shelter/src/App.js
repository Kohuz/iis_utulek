import React, { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "Pages/ProfilePage";
import Navbar from "Components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import authContext from "Helpers/AuthContext";
import FirstPage from "Pages/FirstPage";
import SecondPage from "Pages/SecondPage";
import ThirdPage from "Pages/ThirdPage";
import RequireAuth from "Components/RequireAuth";
import Unauthorized from "Pages/Unauthorized";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFF",
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "0px",
          padding: "10px",
          color: "inherit",
        },
      },
    },
  },
});

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem("roles")));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  return (
    <authContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        roles,
        setRoles,
        accessToken,
        setAccessToken,
        username,
        setUsername,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={[1, 2, 3]} />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/first" element={<FirstPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route path="/second" element={<SecondPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[3]} />}>
            <Route path="/third" element={<ThirdPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1,2,3]} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </authContext.Provider>
  );
}

export default App;
