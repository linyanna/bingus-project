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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Initialize guestDialougeIndex if it doesn't exist already
    if (!localStorage.getItem('guestDialogueIndex')) {
      localStorage.setItem('guestDialogueIndex', '0.0');
    }

    if (playerId != null){
      fetchData();
    }
    else{
      const guestIndex = localStorage.getItem('guestDialogueIndex');
      setDialogueId(guestIndex ? guestIndex : "0.0");
      setLoading(false);
    }
    
    console.log("Dialouge Id:    " + dialogueId);
    console.log("Dialouge Index: " + dialogueIndex)
    
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
      console.error("Error fetching dialogue:", error);
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      setDialogueId(await getDialogueId());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching story progress:", error);
    }
  }

  const handleButtonClick = async () => {
    if (dialogue[dialogueIndex].sqlEditorFlag) {
      console.log("SQL Editor flag is true");
      localStorage.setItem('guestDialogueIndex', dialogueId);

      // TODO: store progress locally and if user is logged in, update to supabase
      try {
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
//function to get the image of the character speaking
  function getImage(character?: string): string {
    if (character === undefined) {
      const defaultImageUrl = 'default.jpg';
      console.error('Character is undefined.');
      return defaultImageUrl;
    }
//inctroduce images to each characters to be able to switch
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

  if (loading) {
    return;
  } else {
    return (
      <div className="overallContainer">
        <img src= {getImage(dialogue[dialogueIndex].character)} alt="Image" className= "Speaker" />
        <div className="textContainer">
          <div className="nameBox">{dialogue[dialogueIndex].character}</div>
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
  }
};

export default Brief;