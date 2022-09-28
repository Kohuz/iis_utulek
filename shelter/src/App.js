import React, { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Navbar from "Components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import authContext from "Helpers/AuthContext";
import FirstPage from "Pages/FirstPage";
import SecondPage from "Pages/SecondPage";
import ThirdPage from "Pages/ThirdPage";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/first" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/third" element={<ThirdPage />} />
        </Routes>
      </ThemeProvider>
    </authContext.Provider>
  );
}

export default App;
