import {
  CardHeader,
  Card,
  Avatar,
  Typography,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import axios from 'axios/axios';
import React from 'react';

function WalkCard({ walk, upcoming, walks, setWalks, fetchData }) {
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
          {walk.start.slice(0, 10)}
        </Typography>
        {upcoming ? (
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
