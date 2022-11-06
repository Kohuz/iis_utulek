import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Schedule() {
  const hours = [
    {
      time: 8,
      chosen: false,
    },
    {
      time: 9,
      chosen: false,
    },
    {
      time: 10,
      chosen: false,
    },
    {
      time: 11,
      chosen: false,
    },
  ];
  const [table, setTable] = useState([
    {
      day: "Pondělí",
      hours: [
        {
          time: 8,
          chosen: false,
          taken: false,
        },
        {
          time: 9,
          chosen: false,
          taken: false,
        },
        {
          time: 10,
          chosen: false,
          taken: false,
        },
        {
          time: 11,
          chosen: false,
          taken: false,
        },
      ],
    },
    {
      day: "Úterý",
      hours: [
        {
          time: 8,
          chosen: false,
          taken: false,
        },
        {
          time: 9,
          chosen: false,
          taken: false,
        },
        {
          time: 10,
          chosen: false,
          taken: false,
        },
        {
          time: 11,
          chosen: false,
          taken: false,
        },
      ],
    },
    {
      day: "Středa",
      hours: [
        {
          time: 8,
          chosen: false,
          taken: false,
        },
        {
          time: 9,
          chosen: false,
          taken: false,
        },
        {
          time: 10,
          chosen: false,
          taken: false,
        },
        {
          time: 11,
          chosen: false,
          taken: false,
        },
      ],
    },
    {
      day: "Čtvrtek",
      hours: [
        {
          time: 8,
          chosen: false,
          taken: false,
        },
        {
          time: 9,
          chosen: false,
          taken: false,
        },
        {
          time: 10,
          chosen: false,
          taken: false,
        },
        {
          time: 11,
          chosen: false,
          taken: false,
        },
      ],
    },
    {
      day: "Pátek",
      hours: [
        {
          time: 8,
          chosen: false,
          taken: false,
        },
        {
          time: 9,
          chosen: false,
          taken: false,
        },
        {
          time: 10,
          chosen: false,
          taken: false,
        },
        {
          time: 11,
          chosen: false,
          taken: false,
        },
      ],
    },
    {
      day: "Sobota",
      hours: [
        {
          time: 8,
          chosen: false,
          taken: false,
        },
        {
          time: 9,
          chosen: false,
          taken: true,
        },
        {
          time: 10,
          chosen: false,
          taken: true,
        },
        {
          time: 11,
          chosen: false,
          taken: false,
        },
      ],
    },
    {
      day: "Neděle",
      hours: [
        {
          time: 8,
          chosen: false,
          taken: false,
        },
        {
          time: 9,
          chosen: false,
          taken: false,
        },
        {
          time: 10,
          chosen: false,
          taken: false,
        },
        {
          time: 11,
          chosen: false,
          taken: false,
        },
      ],
    },
  ]);
  const { id } = useParams();
  const path = window.location.pathname;
  return (
    <>
      <table>
        <caption>Rozvrh {id}</caption>
        <tbody>
          {table.map((day) => (
            <tr>
              <h5>{day.day}</h5>
              {day.hours.map((hour, j) => (
                <td>
                  <Button
                    variant="contained"
                    color={hour.chosen ? "error" : "success"}
                    disabled={hour.taken}
                    onClick={() => {
                      let newArr = [...table];
                      let val = newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).chosen;
                      console.log(
                        newArr
                          .find((x) => x.day === day.day)
                          .hours.find((y) => y.time === hour.time).chosen
                      );
                      newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).chosen = !val;
                      setTable(newArr);
                    }}
                  >
                    {hour.time}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => console.log(table)}>table content</Button>
      <Button>Rezervovat</Button>
    </>
  );
}

export default Schedule;

