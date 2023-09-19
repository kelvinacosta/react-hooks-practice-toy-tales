import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toyCards,onDeleteToyCard,updateToy}) {
  
  const cardsOfToy = toyCards.map(toy=> <ToyCard key={toy.id} toy={toy} onDeleteToyCard={onDeleteToyCard} updateToy={updateToy}/>)
  
  return (
    <div id="toy-collection">{cardsOfToy}</div>
  );
}

export default ToyContainer;
