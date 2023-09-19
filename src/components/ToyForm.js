import React,{useState} from "react";

function ToyForm({addToyCard}) {
  
  const [formData,setFormData] = useState({
    name:"",
    image:"",
    likes:"0"
  });

  const handleSubmitButton = (e) => {
    e.preventDefault()
    // console.log(formData)

    const newFormData = {
      name: formData.name,
      image: formData.image,
      likes: parseInt(formData.likes)
    }
    fetch("http://localhost:3001/toys",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData)
    })
    .then(response=>response.json())
    .then(data=> {
      addToyCard(data);
      
      setFormData({
        name:"",
        image:"",
        likes:0
      })
    
    })//addToyCard
    .catch(err=> console.error("Error Postin Toy",err))


    

  }

  const handleChangeToy = (e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }


  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmitButton}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChangeToy}
          value={formData.name}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChangeToy}
          value={formData.image}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
          // onChange={handleChangeToy}
          

        />
      </form>
    </div>
  );
}

export default ToyForm;
