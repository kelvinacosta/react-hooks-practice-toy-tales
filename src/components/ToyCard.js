import React,{useState} from "react";

function ToyCard({toy,onDeleteToyCard,updateToy}) {
  
  const {id,name,image,likes} = toy
  const [likeButton,setLikeButton] = useState(likes)
  
  const handleClickLike = () => {
    
    const updateLike = likeButton + 1;

    fetch(`http://localhost:3001/toys/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updateLike })
    })
    .then(response=>response.json())
    .then(()=>{
      
      setLikeButton(updateLike)
      updateToy({id,likes:updateLike})
      
    })
    .catch(err=>console.error("Error updating Likes",err))
    
    
    // console.log(likeButton)
  }

  const handleDonateButton = () => {
    fetch(`http://localhost:3001/toys/${id}`,{
      method:"DELETE",
    })
    .then(response=>response.json())
    .then(()=> onDeleteToyCard(id))
    .catch(err=>console.error("Error Deleting Toy Card",err))
    
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likeButton} Likes </p>
      <button className="like-btn" onClick={handleClickLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDonateButton}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
