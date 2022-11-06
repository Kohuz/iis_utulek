import AnimalCard from "Components/AnimalCard";
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
          id={animal.id}
          name={animal.name}
          type={animal.type}
          age={animal.age}
          from={"animals"}
        ></AnimalCard>
      ))}
    </>
  );
}

export default AnimalsPage;
