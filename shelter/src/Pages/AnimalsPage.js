import AnimalCard from "Components/AnimalCard";
import React from "react";

function AnimalsPage() {
  const animals = [
    {
      name: "Alík",
      type: "Pes",
      age: 3,
    },
    {
      name: "Micinka",
      type: "Kočka",
      age: 5,
    },
    {
      name: "Žofka",
      type: "Leguán",
      age: 6,
    },
  ];
  return (
    <>
      {animals.map((animal) => (
        <AnimalCard
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
