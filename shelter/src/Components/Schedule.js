import React from "react";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import Day from "../Helpers/day";
import DatePicker, { registerLocale } from "react-datepicker";
import cs from "date-fns/locale/cs";
import axios from "axios/axios";

import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
registerLocale("cs", cs);

const ANIMAL_URL = "/animal";

function Schedule() {
  const [startDate, setStartDate] = useState(new Date());
  const [day, setDay] = useState(Day);
  const { id } = useParams();
  const path = window.location.pathname;

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
      <table>
        <caption>Rozvrh {animal.name}</caption>
        <DatePicker
          locale="cs"
          minDate={new Date()}
          maxDate={addDays(new Date(), 14)}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <tbody>
          <Button
            onClick={() => {
              let newArr = [...day];
              newArr.forEach((hour) => {
                hour.walk = !hour.walk;
              });
              setDay(newArr);
            }}
          >
            Celý den
          </Button>
          <tr>
            {day.map((hour, j) => (
              <td>
                <Button
                  variant="contained"
                  color={hour.walk ? "warning" : "success"}
                  disabled={hour.event}
                  onClick={() => {
                    let newArr = [...day];
                    let val = newArr.find((y) => y.time === hour.time).walk;
                    console.log(newArr.find((y) => y.time === hour.time).walk);
                    newArr.find((y) => y.time === hour.time).walk = !val;
                    setDay(newArr);
                  }}
                >
                  {hour.time}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Button onClick={() => console.log(day)}>table content</Button>
      <Button>Rezervovat</Button>
    </>
  );
}

export default Schedule;
