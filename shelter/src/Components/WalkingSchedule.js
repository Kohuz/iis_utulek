import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import timetable from '../Helpers/temp_arrays';
import { addDays } from 'date-fns';
import axios from 'axios/axios';
function WalkingSchedule() {
  //const [table, setTable] = useState(timetable);
  // const table = Array.from({ length: 4 }, (v, i) => Array.from({ length: 7 }, (g, d) => i);
  const arr = new Array(4);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = Array.from({ length: 7 }, (v, i) => false);
  }

  const [table, setTable] = useState(arr);

  console.log(table);
  const { id } = useParams();

  const handleSubmit = () => {
    let flattened = table.flat();
    const arr = flattened.map((item, j) => addDays(new Date(), j));
    const dates = arr.map(
      (date) =>
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
    let datesUndefined = dates.map((item, j) => {
      if (flattened[j]) return item;
    });
    let finalDates = datesUndefined.filter((item) => item);

    axios
      .post(
        'event/animal/' + id + '/walkDays',
        JSON.stringify({
          animal_id: id,
          days: finalDates,
        }),
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
        } else {
        }
      })
      .catch((response) => {});
  };
  return (
    <>
      <table>
        <caption>Rozvrh {id}</caption>
        <tbody>
          {table.map((week, i) => (
            <tr>
              {week.map((day, j) => (
                <Button
                  variant="contained"
                  color={table[i][j] ? 'warning' : 'success'}
                  onClick={() => {
                    let newArr = [...table];
                    newArr[i][j] = !newArr[i][j];
                    setTable(newArr);
                  }}
                >
                  venčit
                </Button>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={() => console.log(table)}>table content</Button>
      <Button onClick={() => handleSubmit()}>Uložit</Button>
    </>
  );
}

export default WalkingSchedule;
