import React, { useState } from "react";
import './Textbox.css';

const TextBox: React.FC = () => {
  
  //uses the useState hook to create a state variable called dialogueIndex and a function to update it called setDialogue
  const [dialogueIndex, setDialogue] = useState<number>(0);
  
  //check if triggered is true or false
  //const [triggered, setTriggered] = useState<boolean>(false); 

 // const [currentOptions, setCurrentOptions] = useState<string[]>([]); 
 /*
 const setVisible = () => {
  if (triggered===false){
  setTriggered(true);
  }else{
    setTriggered(false);
  }
   // Update trigger status to true


};
*/

 //array of dialogues, each dialogue is an object with a label text and an array of button texts
 const dialogues = [
  { buttonText: ["Hello", "Pull out the I am a good person card", "Cry inside"], labelText: "Garfield: Why are you like this"},
  { buttonText: ["yes", "wrong", "arcnae"], labelText: "Hello"},
  { buttonText: ["yes", "no", "no"], labelText: "Garfield:Are you tho" },
  { buttonText: ["alrighty", "i apologize", "Ive got to go"], labelText: "Garfield: fine, goodbye" },
  { buttonText: ["Really?", "Who is it", "Watson?"], labelText: "Detective Gerbils: Thats It, I have cracked the case." },

];

const currentDialogue = dialogues[dialogueIndex];


  //handle dialogue function that updates the dialogueIndex state variable
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
        <img src="src/Images/Bingus.jpg" alt="Image" className= "Bingus" />

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
}

export default TextBox;
