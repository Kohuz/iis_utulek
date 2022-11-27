import { Button, Typography, Grid, Box, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import WalkCard from 'Components/Cards/WalkCard';
import Schedule from 'Components/Schedule';
import axios from 'axios/axios';
import React, { useState, useEffect } from 'react';

const WALKS_URL = 'event/user/';

function WalksPage() {
  const [walks, setWalks] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios
      .get(WALKS_URL + sessionStorage.getItem('userId'), {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.length != 0) {
          setWalks(response.data.filter((item) => item.type == 'walk'));
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchData, []);
  const [filter, setFilter] = useState(0);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };
  // let q = new Date();
  // let m = q.getMonth();
  // let d = q.getDay();
  // let y = q.getFullYear();

  // let date = new Date(y, m, d);
  return (
    <>
      <Grid container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={filter} onChange={handleChange}>
            <Tab label="Nadcházející" value={0} />
            <Tab label="Proběhlé" value={1} />
          </Tabs>
        </Box>
      </Grid>
      {walks
        .filter((walk) =>
          filter
            ? new Date(walk.start) < new Date()
            : new Date(walk.start) > new Date()
        )
        .sort(function (a, b) {
          return new Date(b.start) - new Date(a.start);
        })
        .map((walk) => (
          <WalkCard
            key={walk.event_id}
            walk={walk}
            walks={walks}
            setWalks={setWalks}
            upcoming={filter ? false : true}
            fetchData={fetchData}
          />
        ))}
    </>
  );
}

export default WalksPage;
