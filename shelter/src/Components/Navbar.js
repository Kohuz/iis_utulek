import React, { useContext, useState, useEffect } from 'react';
import useInterval from 'Helpers/useInterval';
import axios from 'axios/axios';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  IconButton,
  ToggleButton,
  Badge,
  ToggleButtonGroup,
} from '@mui/material';
import dog from '../dog.png';
import ErrorIcon from '@mui/icons-material/Error';
import MenuIcon from '@mui/icons-material/Menu';

import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { NavigateBeforeSharp } from '@mui/icons-material';
import authContext from 'Helpers/AuthContext';

const useStyles = makeStyles({
  btnGroup: {
    border: 0,
  },
  btn: {
    minWidth: '120px',
  },
  img: {
    width: '8%',
  },
  notif: {
    marginLeft: '3px',
  },
});

const VOLUNTEERS_URL = '/user/unverified';
const REQUESTS_COUNT = '/request/pending/count';
const REQUEST_URL = '/user';
const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    setAuthenticated(false);
    setRoles([]);
    setAccessToken('');
    setUsername('');
    sessionStorage.clear();
    navigate('/');
  };
  const [volunteers, setVolunteers] = useState(0);
  const [requests, setRequests] = useState(0);
  const [error, setError] = useState(null);

  const fetchUnverified = () => {
    if (authenticated && roles.includes(2077)) {
      axios
        .get(VOLUNTEERS_URL, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          //console.log(response);
          setVolunteers(response.data.length);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  useInterval(fetchUnverified, 5000);
  useEffect(fetchUnverified, []);
  const fetchRequests = () => {
    if (authenticated && roles.includes(2077)) {
      axios
        .get(REQUESTS_COUNT, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          //console.log(response);
          setRequests(response.data.length);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  //TODO: UNCOMMENT
  useInterval(fetchRequests, 5000);
  useEffect(fetchRequests, []);

  const {
    setAuthenticated,
    authenticated,
    setRoles,
    roles,
    accessToken,
    setAccessToken,
    setUsername,
    username,
  } = useContext(authContext);

  const notif = 5;
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className={classes.img} src={dog}></img>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => navigate('/animals')}>
              <Typography textAlign="center">Zvířata</Typography>
            </Button>
            {roles?.includes(2077) ? (
              <Button onClick={() => navigate('/caretaker')}>
                <Typography textAlign="center">Pečovatel</Typography>
              </Button>
            ) : null}
            {roles?.includes(3998) ? (
              <Button onClick={() => navigate('/veteranian')}>
                <Typography textAlign="center">Veteřinář</Typography>
                {requests != 0 ? (
                  <Badge
                    className={classes.notif}
                    badgeContent={requests}
                    color="error"
                  >
                    <ErrorIcon color="warning" />
                  </Badge>
                ) : null}
              </Button>
            ) : null}
            {roles?.includes(4004) ? (
              <Button onClick={() => navigate('/walks')}>
                <Typography textAlign="center">Venčení</Typography>
              </Button>
            ) : null}
            {roles?.includes(2077) ? (
              <Button onClick={() => navigate('/volunteer')}>
                <Typography textAlign="center">Dobrovolníci</Typography>
                {volunteers != 0 ? (
                  <Badge
                    className={classes.notif}
                    badgeContent={volunteers}
                    color="error"
                  >
                    <ErrorIcon color="warning" />
                  </Badge>
                ) : null}
              </Button>
            ) : null}

            <Button onClick={() => navigate('/about')}>
              <Typography textAlign="center">O nás</Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {authenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar> {sessionStorage.getItem('name')[0]}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Odhlásit se</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/profile')}>
                    <Typography textAlign="center">Profil</Typography>
                  </MenuItem>
                  {roles?.includes(1212) ? (
                    <MenuItem onClick={() => navigate('/create_user')}>
                      <Typography textAlign="center">
                        Vytvořit uživatele
                      </Typography>
                    </MenuItem>
                  ) : null}
                  {roles?.includes(1212) ? (
                    <MenuItem onClick={() => navigate('/users')}>
                      <Typography textAlign="center">Uživatelé</Typography>
                    </MenuItem>
                  ) : null}
                </Menu>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('login')}>Přihlásit se</Button>
                <Button onClick={() => navigate('register')}>
                  Registrovat
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
