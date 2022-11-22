import { Button, Typography } from '@mui/material';
import axios from 'axios/axios';
import VolunteerCard from 'Components/Cards/VolunteerCard';
import React, { useEffect } from 'react';

const USERS_URL = '/user';
function VolunteerPage() {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);
  // const users = [
  //   {
  //     name: "Pepa",
  //     surname: "Jouda",
  //     birthDate: "exampleDate",
  //     verified: false,
  //   },
  //   {
  //     name: "Mike",
  //     surname: "Pán",
  //     birthDate: "exampleDate",
  //     verified: true,
  //   },
  //   {
  //     name: "Marek",
  //     surname: "Pazdera",
  //     birthDate: "exampleDate",
  //     verified: true,
  //   },
  // ];
  const fetchData = () => {
    axios
      .get(USERS_URL + '?token=' + localStorage.getItem('token'))
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
            name={user.name}
            surname={user.type}
            birthDate={user.age}
            verified={user.verified}
          ></VolunteerCard>
        ))}
      <Typography>Dobrovolníci</Typography>
      {users
        .filter((user) => user.verified)
        .map((user) => (
          <VolunteerCard
            key={user.user_id}
            name={user.name}
            surname={user.surname}
            birthDate={user.age}
            verified={user.verified}
          ></VolunteerCard>
        ))}
    </>
  );
}

export default VolunteerPage;
