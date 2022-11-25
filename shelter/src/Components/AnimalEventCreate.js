import { Button, Grid, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Day from "../Helpers/day";
import AdminSchedule from "./AdminSchedule";
import DatePicker, { registerLocale } from "react-datepicker";
import cs from "date-fns/locale/cs";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios/axios";
import { addDays } from "date-fns";
import { useEffect } from "react";
registerLocale("cs", cs);

const ANIMAL_URL = "/animal";

function AnimalEventCreate() {
  const { id } = useParams();
  const path = window.location.pathname;
  const [table, setTable] = useState(Day);
  const [eventName, setEventName] = useState("");
  const [oneDay, setOneDay] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const [animal, setAnimal] = useState({});
  const [error, setError] = useState(null);
  const fetchData = () => {
    axios
      .get(ANIMAL_URL + "/" + id + "?token=" + localStorage.getItem("token"))
      .then((response) => {
        console.log(response);
        setAnimal(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchData, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button onClick={() => setOneDay(true)}>Událost na jeden den</Button>
          <Button onClick={() => setOneDay(false)}>Událost na více dní</Button>
          {oneDay ? (
            <>
              <Typography>Datum událost</Typography>

              <DatePicker
                locale="cs"
                minDate={new Date()}
                selected={date}
                onChange={(date) => setDate(date)}
              />
              <AdminSchedule
                id={animal.animal_id}
                table={table}
                setTable={setTable}
              />
            </>
          ) : (
            <>
              <Typography>Datum od</Typography>
              <DatePicker
                locale="cs"
                minDate={new Date()}
                selected={dateFrom}
                onChange={(date) => setDateFrom(date)}
              />
              <Typography>Datum do</Typography>
              <DatePicker
                locale="cs"
                minDate={dateFrom}
                selected={dateTo}
                onChange={(date) => setDateTo(date)}
              />
            </>
          )}
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
      </Grid>
    </>
  );
}

export default AnimalEventCreate;
