import React, { useContext } from "react";
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
  ToggleButtonGroup,
} from "@mui/material";
import dog from "../dog.png";

import MenuIcon from "@mui/icons-material/Menu";

import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate, useParams } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { NavigateBeforeSharp } from "@mui/icons-material";
import authContext from "Helpers/AuthContext";

const useStyles = makeStyles({
  btnGroup: {
    border: 0,
  },
  btn: {
    minWidth: "120px",
  },
  img: {
    width: "8%",
  },
});

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
    setAccessToken("");
    setUsername("");
    sessionStorage.clear();
    navigate("/");
  };

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
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className={classes.img} src={dog}></img>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {roles?.includes(1) ? (
              <Button onClick={() => navigate("/first")}>
                <Typography textAlign="center">first Page</Typography>
              </Button>
            ) : null}
            {roles?.includes(2) ? (
              <Button onClick={() => navigate("/second")}>
                <Typography textAlign="center">SecondPage</Typography>
              </Button>
            ) : null}
            {roles?.includes(3) ? (
              <Button onClick={() => navigate("/third")}>
                <Typography textAlign="center">ThirdPage</Typography>
              </Button>
            ) : null}
            <Button
              onClick={() => {
                console.log(authenticated);
                console.log(roles);
                console.log(accessToken);
                console.log(username);
              }}
            >
              Log auth info
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {authenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button onClick={() => navigate("login")}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
