import { Button, Typography } from '@mui/material';
import axios from 'axios/axios';
import VolunteerCard from 'Components/Cards/VolunteerCard';
import React, { useEffect } from 'react';

const USERS_URL = '/user';
function VolunteerPage() {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchData = () => {
    axios
      .get(USERS_URL, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchData, []);
  return (
    <>
      <Typography>Neověření dobrovolníci</Typography>
      <Button
        onClick={() => {
          console.log(users);
        }}
      >
        asdfkjsd
      </Button>
      {users
        .filter((user) => !user.verified && user.is_volunteer)
        .map((user) => (
          <VolunteerCard
            key={user.user_id}
            user={user}
            users={users}
            setUsers={setUsers}
            fetchData={fetchData}
          ></VolunteerCard>
        ))}
      <Typography>Dobrovolníci</Typography>
      {users
        .filter((user) => user.verified && user.is_volunteer)
        .map((user) => (
          <VolunteerCard
            key={user.user_id}
            user={user}
            users={users}
            setUsers={setUsers}
            fetchData={fetchData}
          ></VolunteerCard>
        ))}
    </>
  );
}

export default VolunteerPage;
