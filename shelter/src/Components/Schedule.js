import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import timetable from "../Helpers/temp_arrays";

function Schedule() {
  const [table, setTable] = useState(timetable);
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
                    color={hour.walk ? "error" : "success"}
                    disabled={hour.event}
                    onClick={() => {
                      let newArr = [...table];
                      let val = newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).walk;
                      console.log(
                        newArr
                          .find((x) => x.day === day.day)
                          .hours.find((y) => y.time === hour.time).walk
                      );
                      newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).walk = !val;
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
