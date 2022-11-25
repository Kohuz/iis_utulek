import React, { useState, useEffect } from "react";
import AnimalCard from "Components/Cards/AnimalCard";
import RequestCard from "Components/Cards/RequestCard";
import axios from "axios/axios";

const ANIMALS_URL = "/animal";

function VeterinarianPage() {
  // const animals = [
  //   {
  //     id: 1,
  //     name: "Alík",
  //     type: "Pes",
  //     age: 3,
  //   },
  //   {
  //     id: 2,
  //     name: "Micinka",
  //     type: "Kočka",
  //     age: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Žofka",
  //     type: "Leguán",
  //     age: 6,
  //   },
  // ];
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios
      .get(ANIMALS_URL + "?token=" + localStorage.getItem("token"))
      .then((response) => {
        console.log(response);
        setAnimals(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchData, []);
  const requests = [
    {
      id: 1,
      animal: "Alík",
      author: "Pepa",
      date: "27/11/2022",
    },
    {
      id: 2,
      animal: "Žofka",
      author: "Pepa",
      date: "28/11/2022",
    },
  ];
  return (
    <>
      <h3>Požadavky</h3>
      {requests.map((request) => (
        <RequestCard request={request}></RequestCard>
      ))}
      <h3>Zvířata</h3>
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          from={"veteranian"}
        ></AnimalCard>
      ))}
    </>
  );
}

export default VeterinarianPage;
