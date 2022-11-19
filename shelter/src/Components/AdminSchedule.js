import { Button } from "@mui/material";
import React from "react";

function AdminSchedule({ id, table, setTable }) {
  return (
    <>
      <table>
        <caption>Rozvrh {id}</caption>
        <tbody>
          <Button
            onClick={() => {
              let newArr = [...table];
              newArr.forEach((hour) => {
                hour.event = !hour.event;
              });
              setTable(newArr);
            }}
          >
            Celý den
          </Button>
          {table.map((hour, j) => (
            <td>
              <Button
                variant="contained"
                color={hour.event ? "error" : hour.walk ? "warning" : "success"}
                onClick={() => {
                  let newArr = [...table];
                  let val = newArr.find((y) => y.time === hour.time).event;
                  console.log(newArr.find((y) => y.time === hour.time).event);
                  newArr.find((y) => y.time === hour.time).event = !val;
                  setTable(newArr);
                }}
              >
                {hour.time}
              </Button>
            </td>
          ))}
        </tbody>
        <Button onClick={() => console.log(table)}>table content</Button>
        <Button>Rezervovat</Button>
      </table>
    </>
  );
}

export default AdminSchedule;
