import { Button } from "@mui/material";
import React, { useState } from "react";

function SchedulesPage() {
  const days = ["Pondělí", "Úterý", "Středa"];
  const hours = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  let arr = [];
  const [table, setTable] = useState([
    {
      day: "Pondělí",
      hours: [
        {
          time: 1,
          taken: false,
        },
        {
          time: 2,
          taken: false,
        },
      ],
    },
    {
      day: "Úterý",
      hours: [
        {
          time: 1,
          taken: false,
        },
        {
          time: 2,
          taken: false,
        },
      ],
    },
  ]);
  return (
    <>
      <table>
        <caption>Hodiny</caption>
        <tbody>
          {table.map((day) => (
            <tr>
              <h5>{day.day}</h5>
              {day.hours.map((hour, j) => (
                <td>
                  <Button
                    variant="contained"
                    color={hour.taken ? "error" : "primary"}
                    onClick={() => {
                      let newArr = [...table];
                      let val = newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).taken;
                      console.log(
                        newArr
                          .find((x) => x.day === day.day)
                          .hours.find((y) => y.time === hour.time).taken
                      );
                      newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).taken = !val;
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
      <Button onClick={() => console.log(table)}>d</Button>
    </>
  );
}

export default SchedulesPage;
