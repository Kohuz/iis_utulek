import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios/axios';
import { useParams } from 'react-router-dom';

function AdminSchedule({
  schedule,
  setSchedule,
  index,
  type,
  date,
  eventName,
  fetchData,
  fetchSchedule,
}) {
  const { id } = useParams();
  const createEvent = () => {
    if (type == 'Zákrok') type = 'appointment';
    if (type == 'Vyšetření') {
      type = 'exam';
    }

    let arr = schedule[index].hours.filter((hour) =>
      hour.events.includes('current event')
    );
    let s = arr.map((item) => (item.time < 10 ? '0' + item.time : item.time));
    let cur_date =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    console.log(eventName);
    console.log(type);
    console.log(s);
    console.log(date);
    console.log(id);
    axios
      .post(
        '/event/day',
        JSON.stringify({
          event: {
            commentary: eventName,
            type: type,
            animal_id: id,
            user_id: parseInt(sessionStorage.getItem('userId')),
          },

          hours: s,
          day:
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
        }),
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          fetchData();
          fetchSchedule();
        } else {
        }
      })
      .catch((response) => {});
  };

  const [animal, setAnimal] = useState({});
  const fetchAnimal = () => {
    axios
      .get('animal' + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        //console.log(response);
        setAnimal(response.data);
      })
      .catch((error) => {});
  };
  useEffect(fetchAnimal, []);

  return (
    <>
      <table>
        <caption>Rozvrh {animal.name}</caption>
        <tbody>
          <tr>
            {!schedule[index] ? (
              <p>Bohužel nelze udělat událost tak dopředu </p>
            ) : null}
            {schedule[index] && schedule.length != 0
              ? schedule[index].hours.map((hour, j) => (
                  <td>
                    <Button
                      variant='contained'
                      color={
                        hour.events.includes('current event')
                          ? 'warning'
                          : hour.events.includes('walk')
                          ? 'error'
                          : 'success'
                      }
                      disabled={
                        hour.events.includes('appointment') ||
                        hour.events.includes('exam')
                      }
                      onClick={() => {
                        let newArr = [...schedule];

                        let val = newArr[index].hours.find(
                          (y) => y === hour
                        ).events;

                        // console.log(
                        //   newArr.find((y) => y.time === hour.time).walk
                        // );
                        if (val.includes('current event')) {
                          val = val.splice(val.indexOf('current event'), 1);
                        } else {
                          val.push('current event');
                        }

                        setSchedule(newArr);
                      }}
                    >
                      {hour.time}
                    </Button>
                  </td>
                ))
              : null}
          </tr>
        </tbody>
        <Button onClick={() => createEvent()}>Vytvořit</Button>
      </table>
    </>
  );
}

export default AdminSchedule;
