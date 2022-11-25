import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios/axios';
import UserCard from 'Components/Cards/UserCard';

const USERS_URL = '/user';
function UserPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

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
      {users.map((user) => (
        <UserCard
          user={user}
          users={users}
          setUsers={setUsers}
          fetchData={fetchData}
        />
      ))}
    </>
  );
}

export default UserPage;
