import { Button } from "@mui/material";
import React from "react";

function AdminSchedule({ id, table, setTable }) {
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
                      hour.walk = true;
                    });
                  setTable(newArr);
                }}
              >
                Zabrat celý den
              </Button>
              <Button
                onClick={() => {
                  let newArr = [...table];
                  newArr
                    .find((x) => x.day === day.day)
                    .hours.forEach((hour) => {
                      hour.walk = false;
                    });
                  setTable(newArr);
                }}
              >
                Vyčistit celý den
              </Button>
              {day.hours.map((hour, j) => (
                <td>
                  <Button
                    variant="contained"
                    color={
                      hour.event ? "error" : hour.walk ? "warning" : "success"
                    }
                    onClick={() => {
                      let newArr = [...table];
                      let val = newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).event;
                      console.log(
                        newArr
                          .find((x) => x.day === day.day)
                          .hours.find((y) => y.time === hour.time).event
                      );
                      newArr
                        .find((x) => x.day === day.day)
                        .hours.find((y) => y.time === hour.time).event = !val;
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

export default AdminSchedule;
