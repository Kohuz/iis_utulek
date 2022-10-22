import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
  MenuItem,
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
  log: {
    marginTop: "13px",
  },
});
function CreateUserPage() {
  const classes = useStyles();
  const [vet, setVet] = useState(false);
  const [care, setCare] = useState(false);

  return (
    <>
      <div className={classes.form}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h3">Vytvořit nového uživatele</Typography>
        </Box>
      </div>
      <div className={classes.form}>
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
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CreateInfo />
            </Grid>
            <Grid item xs={4}>
              {vet ? <Address /> : null}
            </Grid>
            <Grid item xs={4}>
              {care ? (
                <FormControlLabel
                  control={<TextField></TextField>}
                  labelPlacement="top"
                  label="Bankovní účet"
                />
              ) : null}
            </Grid>
          </Grid>
        </FormGroup>
        <Button variant="outlined">Vytvořit</Button>
      </div>
    </>
  );
}

export default CreateUserPage;
