import React, { useState } from "react";
import '../styles/Textbox.css';


const Brief: React.FC = () => {
  const [dialogueIndex, setDialogue] = useState<number>(0);
  const dialogues = [
    { buttonText: ["Hello", "Pull out the I am a good person card", "Cry inside"], labelText: "Garfield: Why are you like this"},
    { buttonText: ["yes", "wrong", "arcnae"], labelText: "Hello"},
    { buttonText: ["yes", "no", "no"], labelText: "Garfield: Are you tho" },
    { buttonText: ["alrighty", "i apologize", "Ive got to go"], labelText: "Garfield: fine, goodbye" },
    { buttonText: ["Really?", "Who is it", "Watson?"], labelText: "Detective Gerbils: Thats It, I have cracked the case." },
  ];
  const currentDialogue = dialogues[dialogueIndex];
  

  const handleDialogue = (chosen: number) => {
    
    if(dialogueIndex === 0){
      if(chosen === 0){
       setDialogue(1) 
      }
      if(chosen === 1){
        setDialogue(2)
       }
       if(chosen === 2){
        setDialogue(3)

       }
    }   else if(dialogueIndex === 1 || dialogueIndex === 2 || dialogueIndex === 3){
      if(chosen === 0){
       setDialogue(4) 
      }
      if(chosen === 1){
        setDialogue(4)
       }
       if(chosen === 2){
        setDialogue(4)

       }
    }


    
  
  };



 
  return (
    
    <div className="overallContainer">
        <img src= "../Images/Bingus.jpg" alt="Image" className= "Bingus" />

    <div className="container">

      
      <div className="label">{currentDialogue.labelText}</div>
      <div className="button-container">


        {currentDialogue.buttonText.map((buttonText, i) => (

          //each button has a key prop set to the index of the button in the array
          <button key={i} className="dialogue" type="submit" onClick={() => handleDialogue(i)}>
            {buttonText}
          </button>
        ))}
    

      </div>
    </div>
  </div>
  );
};

export default Brief;
