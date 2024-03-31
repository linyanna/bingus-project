import '../styles/Textbox.css';

import FileContainer from "./FileContainer";
import dialogues from "../Dialouge/dialouge.json";
//import { createStore } from 'redux';
//import rootReducer from "../reducers";
import Doge from '../Images/Doge.jpg';
import Bingus from '../Images/Bingus.jpg';
import Camp from '../Images/Camp.jpg';
import { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';


interface Props {
  supabase: SupabaseClient;
}



const Brief: React.FC<Props> = ({ supabase }) => {
 // const [campVisibility, setCampVisibility] = useState<boolean>(true);
 // const [bingusVisibility, setBingusVisibility] = useState<boolean>(true); 
  const [visibility, setVisibility] = useState<number>(1);

  //visibiility 0 is hidden, 1 is visible, 2 is visible but only for one button

  

    let authToken = localStorage.getItem("sb-lynhjymnmasejyhzbhwv-auth-token");
  if (!authToken) {
    throw new Error("Authentication token not found in local storage");
  }
  const user = JSON.parse(authToken).user;
  const playerId = user.id;
  
  /*      const { data, error } = await supabase
        .from("players")
        .update({ player_database: userLocalDatabase })
        .eq("player_id", playerId);*/ 



   const [currentDialogue, setCurrentDialogue] = useState<any>(0);

 // const [dialogueIndex, setDialogue] = useState<number>(0);
 useEffect(() => {

  //use effect hook to fetch data from the database
  async function fetchData() {
    try {
      const currentDialogueIndex = await getDialouge();
      const currentDialogue = dialogues[currentDialogueIndex];
      setCurrentDialogue(currentDialogue);


    } catch (error) {
      console.error("Error fetching dialogue:", error);
    }
  }

  fetchData();
}, []);

        
  async function getDialouge() {

    try {
      // Fetch dialogue index from Supabase database
      const { data } = await supabase.from("players")
        .select("DialogueIndex")
        .eq('player_id', playerId)
        .single();
   
        return data?.DialogueIndex
    } catch (error) {
      console.error("Error:", error);
    }

  }
  const updateDialogue= async (dir: number) => {
    try {
      const newDialogue = dir
      const { error: updateError } = await supabase.from("players")
      .update({ DialogueIndex: newDialogue })
      .eq('player_id', playerId);
      setCurrentDialogue(dialogues[dir])

    } catch (updateError) {
      console.error("Error:", updateError);
    }

  }

        
  const handleDialogue = async  (chosen: number) => {
//gets the index of the button clicked and sets the dialogue to the next one
    
    var dialogueIndex = await getDialouge()


    if(dialogueIndex === 0){
//visibility of 1 is0
      updateDialogue(1)

    //  setVisibility(1)

    }
    else if(dialogueIndex === 1){
      if(chosen === 0){
        updateDialogue(2)
      }
      if(chosen === 1){
        updateDialogue(3)
       }
       if(chosen === 2){
        updateDialogue(4)

       }
    }   else if(dialogueIndex === 2 || dialogueIndex === 3 || dialogueIndex === 4){
      if(chosen === 0){
       updateDialogue(5) 
       
      }
      if(chosen === 1){
        updateDialogue(5)
       }
       if(chosen === 2){
        updateDialogue(5)

       }
    }else if(dialogueIndex === 5){
    //  setVisibility(0)
      
    }


    console.log("run");

   // await getDialouge(playerId);
  };
 

 
  return (
    <FileContainer>
              <img src= {Camp} alt="Image" className= "Camp" />

    <div className="overallContainer">
        <img src= {Bingus} alt="Image" className= "Bingus" />
        <img src= {Doge} alt="Image" className= "NPC2" />


    <div className="textContainer">

      
      <div className="label">{currentDialogue.labelText}</div>
      <div className="button-container">


      {currentDialogue && currentDialogue.buttonText.map((buttonText: string, i: number) => (

          //each button has a key prop set to the index of the button in the array
          <button key={i} className="dialogue" type="submit" onClick={() => { handleDialogue(i); }}  
          style={{
            display: visibility === 0 ? 'none' : (visibility === 1 ? 'inline-block' : (visibility === 2 && i === 1 ? 'inline-block' : 'none')),

        }}>
            {buttonText}
          </button>
        ))}
    

      </div>
    </div>
  </div>
  </FileContainer>
  );
};

export default Brief;
