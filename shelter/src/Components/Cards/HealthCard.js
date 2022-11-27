import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import axios from 'axios/axios';
import React from 'react';

function HealthCard({ event, events, setEvents, fetchData }) {
  const remove = (id) => {
    const newEvents = events.filter((event) => id !== event.event_id);
    setEvents(newEvents);
    axios
      .delete('event/' + id, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          fetchData();
        }
      })
      .catch(() => fetchData());
  };
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Název události: {event.commentary}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Typ události: {event.type}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Zvíře: {event.animal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start: {event.start.slice(0, 10)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Konec: {event.stop.slice(0, 10)}
        </Typography>
      </CardContent>
      <CardActions>
        {new Date(event.start) > new Date() ? <Button>Změnit</Button> : null}
        <Button size="small" onClick={() => remove(event.event_id)}>
          Smazat
        </Button>
        {/*
        <Button size="small" onClick={() => reject()}>
          Zamítnout
        </Button> */}
      </CardActions>
    </Card>
  );
}

export default HealthCard;
