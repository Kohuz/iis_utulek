import { Button, Grid, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import timetable from "../Helpers/temp_arrays";
import AdminSchedule from "./AdminSchedule";
function AnimalEventCreate() {
  const [table, setTable] = useState(timetable);
  const { id } = useParams();
  const path = window.location.pathname;
  const [eventName, setEventName] = useState("");
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AdminSchedule id={id} table={table} setTable={setTable} />
        </Grid>
        <Grid item xs={6}>
          <form>
            <TextField
              required
              InputLabelProps={{ style: { fontSize: 20 } }}
              inputProps={{ style: { fontSize: 21 } }}
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              id="eventName"
              label="Název eventu"
              type="text"
              variant="outlined"
            ></TextField>

            <Button type="submit" variant="outlined">
              Vytvořit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default AnimalEventCreate;
