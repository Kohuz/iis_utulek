import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
  MenuItem,
  Divider,
  FormGroup,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Address from "Components/Address";
import CreateInfo from "Components/CreateInfo";
import React, { useState } from "react";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: "3%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "25%",
    marginRight: "25%",
    flexDirection: "column",
  },
});
function CreateUserPage() {
  const classes = useStyles();
  const [vet, setVet] = useState(false);
  const [care, setCare] = useState(false);

  return (
    <div className={classes.container}>
      <Typography gutterBottom variant="h3">
        Vytvořit nového uživatele
      </Typography>
      <Divider variant="middle" />
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CreateInfo />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">Role</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={vet}
                    onChange={() => setVet(!vet)}
                  />
                }
                label="Veterinář"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={care} onChange={() => setCare(!care)} />
                }
                label="Pečovatel"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            {care ? (
              <FormControlLabel
                control={<TextField></TextField>}
                labelPlacement="top"
                label="Bankovní účet"
              />
            ) : null}
            {vet ? <Address /> : null}
          </Grid>
        </Grid>
      </FormGroup>
      <Button variant="outlined">Vytvořit</Button>
    </div>
  );
}

export default CreateUserPage;
