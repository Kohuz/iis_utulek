import AnimalCard from "Components/Cards/AnimalCard";
import React from "react";

function AnimalsPage() {
  const animals = [
    {
      id: 1,
      name: "Alík",
      type: "Pes",
      age: 3,
    },
    {
      id: 2,
      name: "Micinka",
      type: "Kočka",
      age: 5,
    },
    {
      id: 3,
      name: "Žofka",
      type: "Leguán",
      age: 6,
    },
  ];
  return (
    <>
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          from={"animals"}
        ></AnimalCard>
      ))}
    </>
  );
}

export default AnimalsPage;
