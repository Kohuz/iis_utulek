import { Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    <>
      <form>
        <div className={classes.form}>
          <Typography variant="h4">Změna hesla</Typography>
          <TextField label="Heslo"></TextField>

          <TextField label="Potvrdit heslo"></TextField>
          <Button variant="outlined"> Potvrdit změnu</Button>
        </div>
      </form>
      <form>
        <div className={classes.form}>
          <Typography variant="h4">Změna dalších údajů</Typography>
          <TextField label="Jiný údaj"></TextField>

          <Button variant="outlined"> Potvrdit změnu</Button>
        </div>
      </form>
    </>
  );
}

export default ProfilePage;
