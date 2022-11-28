import {
  CardHeader,
  Card,
  Avatar,
  Typography,
  CardContent,
  CardActions,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios/axios';
import addHours from 'date-fns/addHours';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function WalkCard({ walk, upcoming, walks, setWalks, fetchData }) {
  const navigate = useNavigate();
  const remove = (id) => {
    const newWalks = walks.filter((walk) => id !== walk.event_id);
    setWalks(newWalks);
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
    <Card sx={{ maxWidth: 700, marginTop: '1%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Procházka s {walk.animal.name}
        </Typography>
        <Typography gutterBottom variant="h6">
          Datum : {walk.start.slice(0, 10)}
        </Typography>
        <Typography gutterBottom variant="h6">
          Čas : {format(addHours(new Date(walk.start), 1), 'HH:mm')}
        </Typography>
        {walk.state == 'canceled' ? (
          <>
            <Alert severity="error"> Zrušena</Alert>
            <Button onClick={() => navigate('/animals/' + walk.animal_id)}>
              Vytvořit novou procházku
            </Button>
            <Button onClick={() => remove(walk.event_id)}> Odebrat</Button>
          </>
        ) : null}
        {upcoming && walk.state != 'canceled' ? (
          <CardActions>
            <Button size="small" onClick={() => remove(walk.event_id)}>
              Zrušit
            </Button>
          </CardActions>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default WalkCard;
