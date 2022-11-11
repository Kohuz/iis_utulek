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
import CaretakerPage from "Pages/CaretakerPage";
import VeteranianPage from "Pages/VeteraninanPage";
import ThirdPage from "Pages/ThirdPage";
import RequireAuth from "Components/RequireAuth";
import Unauthorized from "Pages/Unauthorized";
import AnimalsPage from "Pages/AnimalsPage";
import CreateUserPage from "Pages/CreateUserPage";
import VeterinarianPage from "Pages/VeteraninanPage";
import VolunteerPage from "Pages/VolunteerPage";
import SchedulesPage from "Pages/SchedulesPage";
import Schedule from "Components/Schedule";
import HealthRecord from "Components/HealthRecord";
import AnimalEventCreate from "Components/AnimalEventCreate";
import AdminSchedule from "Components/AdminSchedule";

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
          <Route path="/animals" element={<AnimalsPage />} />
          <Route element={<RequireAuth allowedRoles={[1, 2, 3]} />}>
            <Route path="/animals/:id" element={<Schedule />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 2, 3]} />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/caretaker" element={<CaretakerPage />} />
            <Route path="/caretaker/:id" element={<AnimalEventCreate />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route path="/veteranian" element={<VeterinarianPage />} />
            <Route path="/veteranian/:id" element={<HealthRecord />} />
            <Route
              path="/veteranian/event/:id"
              element={<AnimalEventCreate />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={[3]} />}>
            <Route path="/volunteer" element={<VolunteerPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[3]} />}>
            <Route path="/schedules" element={<SchedulesPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 2, 3]} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/create_user" element={<CreateUserPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </authContext.Provider>
  );
}

export default App;
