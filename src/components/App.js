import React, { useState,useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyCards,setToyCards] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(response=>response.json())
    .then(data=>setToyCards(data))
    .catch(err=>console.error("Error adding ToyCards",err))
  },[])

  const handleToyForm = (newToyCard)=>{
    setToyCards([...toyCards,newToyCard])
  }
  const handleDeletingToyCard = (toyIdCard) => {
    const toyToDelete = toyCards.filter(toy=> toy.id !== toyIdCard)
    setToyCards(toyToDelete)
  }

  const updatingToyCard = (updateCard) => {
    const updateLikes = toyCards.map((card)=> {
      if(card.id === updateCard.id){
        return {
          ...card,likes: updateCard.likes
        }
      }else{
        return card
      }
    })
    setToyCards(updateLikes)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToyCard={handleToyForm} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toyCards={toyCards} onDeleteToyCard={handleDeletingToyCard} updateToy={updatingToyCard}/>
    </>
  );
}

export default App;
