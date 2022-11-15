import { Button } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import timetable from "../Helpers/temp_arrays";
function WalkingSchedule() {
  const [table, setTable] = useState(timetable);
  const { id } = useParams();
  return (
    <>
      <table>
        <caption>Rozvrh {id}</caption>
        <tbody>
          {table.map((day) => (
            <tr>
              <h5>{day.day}</h5>
              <Button
                onClick={() => {
                  let newArr = [...table];
                  newArr
                    .find((x) => x.day === day.day)
                    .hours.forEach((hour) => {
                      hour.available = true;
                    });
                  setTable(newArr);
                }}
              >
                Venčit celý den
              </Button>
              {day.hours.map((hour, j) => (
                <td>
                  <Button
                    variant="contained"
                    color={hour.available ? "success" : "error"}
                    disabled={hour.event}
                    onClick={() => {
                      let newArr = [...table];
                      let val = newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).available;
                      newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).available =
                        !val;
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
      <Button>Uložit</Button>
    </>
  );
}

export default WalkingSchedule;
