import '../styles/Textbox.css';
import dialogue from "../assets/scripts/dialogue.json";
import Doge from '../assets/images/Doge.jpg';
import Bingus from '../assets/images/Bingus.jpg';
import Nyan_Cat from '../assets/images/Nyan-Cat.png';
import MaoMao from '../assets/images/maomao.png';
//import Placeholder from '../assets/images/placeholder.png';
import Narrator from '../assets/images/hello_freeman.png'
import Mysterious_Voice from '../assets/images/Mysterious_Voice.png'
import { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Tab } from "./Navbar";
import { Button } from "@/components/ui/button";
import { getPlayerId } from "../utils/databaseUtils";

interface Props {
  supabase: SupabaseClient;
  setActiveTab: (tab: Tab) => void;
}

const Brief: React.FC<Props> = ({ supabase, setActiveTab }) => {
  const playerId = getPlayerId();
  const [dialogueId, setDialogueId] = useState<string>("0.0");
  const dialogueIndex = dialogue.findIndex(field => field.id === dialogueId);

  useEffect(() => {
    //use effect hook to fetch data from the database
    async function fetchData() {
      try {
        setDialogueId(await getDialogueId());
      } catch (error) {
        console.error("Error fetching story progress:", error);
      }
    }
    fetchData();
  }, []);

  async function getDialogueId() {
    try {
      // Fetch dialogue index from Supabase database
      const { data } = await supabase.from("players")
        .select("dialogue_id")
        .eq('player_id', playerId)
        .single();
        return data?.dialogue_id
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleButtonClick = async () => {
    if (dialogue[dialogueIndex].sqlEditorFlag) {
      console.log("SQL Editor flag is true");
      // TODO: store progress locally and if user is logged in, update to supabase
      try {
        // const nextDialogue = dialogueIndex + 1;
        // const nextDialogueId = dialogue[dialogueIndex+1].id;
        await supabase.from("players")
        .update({ dialogue_id: dialogueId })
        .eq('player_id', playerId);
        console.log("Dialogue updated successfully: ", dialogueId);
        setActiveTab(Tab.SQL);
      } catch (updateError) {
        console.error("Error:", updateError);
      }
    }
    else if (dialogueIndex === dialogue.length - 1) {
      console.error("End of dialogue reached");
      try {
        // const nextDialogue = dialogueIndex + 1;
        // const nextDialogueId = dialogue[dialogueIndex+1].id;
        await supabase.from("players")
        .update({ dialogue_id: dialogueId })
        .eq('player_id', playerId);
        console.log("Dialogue updated successfully: ", dialogueId);
      } catch (updateError) {
        console.error("Error:", updateError);
      }
    }
    else {
      console.log("SQL flag not true; Continue dialogue");
      setDialogueId(dialogue[dialogueIndex+1].id);
    }
  }

  function getImage(character?: string): string {
    if (character === undefined) {
      const defaultImageUrl = 'default.jpg';
      console.error('Character is undefined.');
      return defaultImageUrl;
    }

    const imageMap: { [key: string]: string } = {
        'Officer Doge': Doge,
        'Narrator': Narrator,
        'MaoMao': MaoMao,
        'Nyan Cat': Nyan_Cat,
        'Detective Bingus': Bingus,
        'Mysterious voice': Mysterious_Voice
    };
    return imageMap[character] || ''; 
  }

  return (
      <div className="overallContainer">
          <img src= {getImage(dialogue[dialogueIndex].character)} alt="Image" className= "Speaker" />
      <div className="textContainer">
        <div className="label">{dialogue[dialogueIndex].text}</div>
        <div className="button-container">
          {dialogue[dialogueIndex] && dialogue[dialogueIndex].responseOptions.map((buttonText: string, i: number) => (
            //each button has a key prop set to the index of the button in the array
            <Button key={i} className="dialogue px-auto" type="submit" onClick={() => handleButtonClick()}>
              {buttonText}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brief;