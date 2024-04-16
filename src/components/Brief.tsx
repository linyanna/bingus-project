import '../styles/Textbox.css';
import dialogues from "../assets/scripts/dialogue.json";
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

interface Props {
  supabase: SupabaseClient;
  setActiveTab: (tab: Tab) => void;
}

const Brief: React.FC<Props> = ({ supabase, setActiveTab }) => {
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch dialogue index from Supabase database if user is authenticated
      const authToken = localStorage.getItem("sb-lynhjymnmasejyhzbhwv-auth-token");
      if (authToken) {
        const user = JSON.parse(authToken).user;
        const playerId = user.id;
        const { data } = await supabase.from("players")
          .select("DialogueIndex")
          .eq('player_id', playerId)
          .single();
        if (data) {
          setDialogueIndex(data.DialogueIndex);
        }
      } else {
        // Set a default dialogue index if user is not authenticated
        setDialogueIndex(0);
      }
    } catch (error) {
      console.error("Error fetching dialogue:", error);
    }
  }

  const handleButtonClick = async () => {
    if (dialogues[dialogueIndex].sqlEditorFlag) {
      try {
        const nextDialogue = dialogueIndex + 1;
        const authToken = localStorage.getItem("sb-lynhjymnmasejyhzbhwv-auth-token");
        if (authToken) {
          const user = JSON.parse(authToken).user;
          const playerId = user.id;
          await supabase.from("players")
            .update({ DialogueIndex: nextDialogue })
            .eq('player_id', playerId);
        }
      } catch (updateError) {
        console.error("Error:", updateError);
      }
      setActiveTab(Tab.SQL);
    }
    setDialogueIndex(dialogueIndex + 1);
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
    console.log(dialogueIndex);
    console.log("Character: " + character + " mapping to: " + imageMap[character]);
    return imageMap[character] || ''; 
}

  return (
      <div className="overallContainer">
          <img src= {getImage(dialogues[dialogueIndex].character)} alt="Image" className= "Speaker" />
      <div className="textContainer">
        <div className="label">{dialogues[dialogueIndex].text}</div>
        <div className="button-container">
          {dialogues[dialogueIndex] && dialogues[dialogueIndex].responseOptions.map((buttonText: string, i: number) => (
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