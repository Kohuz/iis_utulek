import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import timetable from '../Helpers/temp_arrays';
import { addDays, format } from 'date-fns';
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
      .post('event/animal/' + id + '/walkDays', JSON.stringify(finalDates), {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status == 200) {
          alert('Rozvrh na venčení uložen úspěšně');
        } else {
        }
      })
      .catch((response) => {});
  };

  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = () => {
    axios
      .get('event/animal/' + id + '/walkDays', {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        //console.log(response.data);
        const arr = new Array(4);
        const myGrid = [...Array(4)].map((e) => Array(7));
        let s = 0;
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 7; j++) {
            myGrid[i][j] = response.data[s];
            s++;
          }
        }

        setTable(myGrid);
      })
      .catch((error) => {});
  };

  useEffect(fetchSchedule, []);
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
                  color={table[i][j] ? 'success' : 'warning'}
                  onClick={() => {
                    let newArr = [...table];
                    newArr[i][j] = !newArr[i][j];
                    setTable(newArr);
                  }}
                >
                  venčit {format(addDays(new Date(), 7 * i + j), 'dd.MM')}
                </Button>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Button size="large" variant="outlined" onClick={() => handleSubmit()}>
        Uložit
      </Button>
    </>
  );
}

export default WalkingSchedule;
