import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "1%",
  },
  log: {
    marginTop: "13px",
  },
});

function ProfilePage() {
  const classes = useStyles();
  return (
    <form className={classes.form}>
      <TextField></TextField>
      <TextField></TextField>
    </form>
  )
}

export default ProfilePage;
