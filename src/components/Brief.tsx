import '../styles/Textbox.css';

import FileContainer from "./FileContainer";
import dialogues from "../assets/scripts/dialogue.json";
import Doge from '../assets/images/Doge.jpg';
import Bingus from '../assets/images/Bingus.jpg';
import Camp from '../assets/images/Camp.jpg';
import { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Tab } from "./Navbar";

interface Props {
  supabase: SupabaseClient;
  setActiveTab: (tab: Tab) => void;
}

const Brief: React.FC<Props> = ({ supabase, setActiveTab }) => {
  // const [currentDialogue, setCurrentDialogue] = useState<Dialogue>(dialogues[0]);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const authToken = localStorage.getItem("sb-lynhjymnmasejyhzbhwv-auth-token");
  if (!authToken) {
    throw new Error("Authentication token not found in local storage");
  }
  const user = JSON.parse(authToken).user;
  const playerId = user.id;
  
  // const { data, error } = await supabase
  // .from("players")
  // .update({ player_database: userLocalDatabase })
  // .eq("player_id", playerId);

  useEffect(() => {
    //use effect hook to fetch data from the database
    async function fetchData() {
      try {
        // const currentDialogueIndex = await getDialouge();
        // const currentDialogue = dialogues[currentDialogueIndex];
        // setCurrentDialogue(currentDialogue);
        setDialogueIndex(await getDialogueIndex());
      } catch (error) {
        console.error("Error fetching dialogue:", error);
      }
    }
    fetchData();
  }, []);

  async function getDialogueIndex() {
    try {
      // Fetch dialogue index from Supabase database
      const { data } = await supabase.from("players")
        .select("DialogueIndex")
        .eq('player_id', playerId)
        .single();
        console.log("Data:", data?.DialogueIndex);
        return data?.DialogueIndex
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleButtonClick = async () => {
    if (dialogues[dialogueIndex].sqlEditorFlag) {
      console.log("SQL Editor flag is true");
      try {
        const nextDialogue = dialogueIndex + 1;
        const {} = await supabase.from("players")
        .update({ DialogueIndex: nextDialogue })
        .eq('player_id', playerId);
      } catch (updateError) {
        console.error("Error:", updateError);
      }

      setActiveTab(Tab.SQL);
    }
    else {
      console.log("SQL flag not true; Continue dialogue");
    }
    setDialogueIndex(dialogueIndex+1);
  }

  return (
    <FileContainer>
      <img src= {Camp} alt="Image" className= "Camp" />
      <div className="overallContainer">
          <img src= {Bingus} alt="Image" className= "Bingus" />
          <img src= {Doge} alt="Image" className= "NPC2" />
      <div className="textContainer">
        <div className="label">{dialogues[dialogueIndex].text}</div>
        <div className="button-container">
          {dialogues[dialogueIndex] && dialogues[dialogueIndex].responseOptions.map((buttonText: string, i: number) => (
            //each button has a key prop set to the index of the button in the array
            <button key={i} className="dialogue" type="submit" onClick={() => handleButtonClick()}>
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