import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios/axios';
import HealthCard from './Cards/HealthCard';

function HealthRecord() {
  const { id } = useParams();

  const [events, setEvents] = useState([]);

  const fetchData = () => {
    axios
      .get('event/animal/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        setEvents(response.data);
      })
      .catch((error) => {});
  };
  useEffect(fetchData, []);
  return (
    <>
      {events
        .filter((event) => event.type == 'exam' || event.type == 'appointment')
        .map((event) => (
          <HealthCard
            events={events}
            setEvents={setEvents}
            fetchData={fetchData}
            event={event}
          ></HealthCard>
        ))}
    </>
  );
}

export default HealthRecord;
