import {
  Button,
  Grid,
  Input,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Day from '../Helpers/day';
import AdminSchedule from './AdminSchedule';
import DatePicker, { registerLocale } from 'react-datepicker';
import cs from 'date-fns/locale/cs';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios/axios';
import { addDays } from 'date-fns';
import { useEffect } from 'react';
registerLocale('cs', cs);

const ANIMAL_URL = '/animal';

function AnimalEventCreate() {
  const { id } = useParams();
  const path = window.location.pathname;
  const [table, setTable] = useState(Day);
  const [eventName, setEventName] = useState('');
  const [oneDay, setOneDay] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const dict = {
    exam: 'Vyšetření',
    appointment: 'Zákrok',
  };
  const [animal, setAnimal] = useState({});
  const [error, setError] = useState(null);
  const types = [dict['appointment'], dict['exam']];
  const [type, setType] = useState(dict['exam']);
  const [schedule, setSchedule] = useState([]);
  const [index, setIndex] = useState(0);

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

  const send = () => {
    axios
      .post(
        '/event',
        JSON.stringify({
          // title: title,
          commentary: eventName,
          user_id: sessionStorage.getItem('userId'),
          animal_id: id,
          type: type,
          start: dateFrom,
          stop: dateTo,
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
        } else {
        }
      })
      .catch((response) => {});
  };

  useEffect(fetchSchedule, []);
  const fetchData = () => {
    axios
      .get(ANIMAL_URL, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        setAnimal(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchData, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="outlined"
            onClick={() => setOneDay(true)}
          >
            Událost na jeden den
          </Button>
          <Button
            size="large"
            variant="outlined"
            onClick={() => setOneDay(false)}
          >
            Událost na více dní
          </Button>
          {oneDay ? (
            <>
              <Typography>Datum událost</Typography>

              <DatePicker
                locale="cs"
                minDate={new Date()}
                maxDate={addDays(new Date(), 30)}
                selected={date}
                onChange={(date) => {
                  setDate(date);
                  let diff =
                    Math.floor((date - new Date()) / (1000 * 60 * 60 * 24)) + 1;
                  console.log(diff);
                  setIndex(diff);
                }}
                inline
              />
              <AdminSchedule
                type={type}
                schedule={schedule}
                setSchedule={setSchedule}
                index={index}
                date={date}
                eventName={eventName}
                fetchData={fetchData}
                fetchSchedule={fetchSchedule}
              />
            </>
          ) : (
            <>
              <Typography variant="h5">Datum od</Typography>
              <DatePicker
                locale="cs"
                minDate={new Date()}
                selected={dateFrom}
                onChange={(date) => setDateFrom(date)}
              />
              <Typography variant="h5">Datum do</Typography>
              <DatePicker
                locale="cs"
                minDate={dateFrom}
                selected={dateTo}
                onChange={(date) => setDateTo(date)}
              />
            </>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{ marginTop: '30px' }}
            required
            InputLabelProps={{ style: { fontSize: 20 } }}
            inputProps={{ style: { fontSize: 21 } }}
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
            id="eventName"
            label="Popis události"
            type="text"
            variant="outlined"
          ></TextField>

          <FormControl sx={{ marginTop: '30px', minWidth: '500px' }}>
            <InputLabel id="demo-simple-select-label">
              Druh požadavku
            </InputLabel>
            <Select
              fullWidth
              label="Druh požadavku"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {types.map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {!oneDay ? (
            <Button
              type="submit"
              variant="outlined"
              onClick={() => {
                send();
              }}
            >
              Vytvořit
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}

export default AnimalEventCreate;
