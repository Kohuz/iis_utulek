import React, { useState } from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from 'Pages/ProfilePage';
import Navbar from 'Components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import authContext from 'Helpers/AuthContext';
import CaretakerPage from 'Pages/CaretakerPage';
import VeteranianPage from 'Pages/VeteraninanPage';
import RegisterPage from 'Pages/RegisterPage';
import RequireAuth from 'Components/RequireAuth';
import Unauthorized from 'Pages/Unauthorized';
import AnimalsPage from 'Pages/AnimalsPage';
import CreateUserPage from 'Pages/CreateUserPage';
import VeterinarianPage from 'Pages/VeteraninanPage';
import VolunteerPage from 'Pages/VolunteerPage';
import WalksPage from 'Pages/WalksPage';
import Schedule from 'Components/Schedule';
import HealthRecord from 'Components/HealthRecord';
import AnimalEventCreate from 'Components/AnimalEventCreate';
import AdminSchedule from 'Components/AdminSchedule';
import UserPage from 'Pages/UserPage';
import WalkingSchedule from 'Components/WalkingSchedule';
import EditProfilePage from 'Pages/EditProfilePage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFF',
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: '0px',
          padding: '10px',
          color: 'inherit',
        },
      },
    },
  },
});

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles')));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route element={<RequireAuth allowedRoles={[1, 2, 3, 4]} />}>
            <Route path="/animals/:id" element={<Schedule />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 2, 3, 4]} />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
            <Route path="/caretaker" element={<CaretakerPage />} />
            <Route path="/caretaker/:id" element={<WalkingSchedule />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 3]} />}>
            <Route path="/veteranian" element={<VeterinarianPage />} />
            <Route path="/veteranian/:id" element={<HealthRecord />} />
            <Route
              path="/veteranian/event/:id"
              element={<AnimalEventCreate />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
            <Route path="/volunteer" element={<VolunteerPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 4]} />}>
            <Route path="/walks" element={<WalksPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 2, 3, 4]} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/create_user" element={<CreateUserPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/users" element={<UserPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/users/:id" element={<EditProfilePage />} />
          </Route>

          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </ThemeProvider>
    </authContext.Provider>
  );
}

export default App;
