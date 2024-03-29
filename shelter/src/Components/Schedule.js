import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Day from '../Helpers/day';
import DatePicker, { registerLocale } from 'react-datepicker';
import cs from 'date-fns/locale/cs';
import axios from 'axios/axios';

import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { useEffect } from 'react';
registerLocale('cs', cs);

const ANIMAL_URL = '/animal';
const CREATE_URL = '/event/day';

function Schedule() {
  const [startDate, setStartDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [index, setIndex] = useState(0);

  //const [day, setDay] = useState([Day]);
  const { id } = useParams();
  const path = window.location.pathname;

  const [animal, setAnimal] = useState({});
  const [error, setError] = useState(null);
  const fetchSchedule = () => {
    axios
      .get('event/animal/' + id + '/schedule', {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchSchedule, []);
  const fetchData = () => {
    axios
      .get(ANIMAL_URL + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        //console.log(response);
        setAnimal(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const createEvent = () => {
    let arr = schedule[index].hours.filter((hour) =>
      hour.events.includes('current_walk')
    );
    let s = arr.map((item) => (item.time < 10 ? '0' + item.time : item.time));

    let date =
      startDate.getFullYear() +
      '-' +
      (startDate.getMonth() + 1) +
      '-' +
      (startDate.getDate() < 10
        ? '0' + startDate.getDate()
        : startDate.getDate());
    axios
      .post(
        CREATE_URL,
        JSON.stringify({
          event: {
            title: '',
            type: 'walk',
            animal_id: id,
            user_id: parseInt(sessionStorage.getItem('userId')),
          },

          hours: s,
          day: date,
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

  useEffect(fetchData, []);

  console.log(schedule[index]);
  return (
    <>
      <table>
        <caption>
          <Typography variant='h2'>Rozvrh {animal.name}</Typography>
        </caption>
        <DatePicker
          locale='cs'
          minDate={new Date()}
          maxDate={addDays(new Date(), 28)}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            let diff =
              Math.floor((date - new Date()) / (1000 * 60 * 60 * 24)) + 1;
            console.log(diff);
            setIndex(diff);
          }}
          inline
        />
        {/*
        <tbody>
          <Button
            onClick={() => {
              let newArr = [...schedule];
              newArr.forEach((hour) => {
                hour.walk = !hour.walk;
              });
              setSchedule(newArr);
            }}
          >
            Celý den
          </Button> */}
        <tbody>
          <tr>
            {schedule.length != 0
              ? schedule[index].hours.map((hour, j) => (
                  <td>
                    <Button
                      variant='contained'
                      color={
                        hour.events.includes('current_walk')
                          ? 'warning'
                          : 'success'
                      }
                      disabled={
                        hour.events.includes('appointment') ||
                        hour.events.includes('exam') ||
                        hour.events.includes('walk') ||
                        !hour.can_walk
                      }
                      onClick={() => {
                        let newArr = [...schedule];

                        let val = newArr[index].hours.find(
                          (y) => y === hour
                        ).events;

                        // console.log(
                        //   newArr.find((y) => y.time === hour.time).walk
                        // );
                        if (val.includes('current_walk')) {
                          val.length = 0;
                          console.log('eher');
                        } else {
                          val.push('current_walk');
                        }

                        // //newArr.find((y) => y.time === hour.time).walk = !val;
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
      </table>
      {/* {schedule.length != 0
        ? schedule[index].hours.map((hour) => <p>{hour.time}</p>)
        : null} */}
      <Button
        size='large'
        onClick={() => {
          //console.log(schedule[index]);
          createEvent();
        }}
        variant='outlined'
      >
        Rezervovat
      </Button>
    </>
  );
}

export default Schedule;
