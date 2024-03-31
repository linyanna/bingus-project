import React, { useState } from "react";
import "../styles/Textbox.css";
import Bingus from "../Images/Bingus.jpg";
import FileContainer from "./FileContainer";
import { Button } from "@/components/ui/button";

const Brief: React.FC = () => {
  const [visibility, setVisibility] = useState<number>(2);

  const [dialogueIndex, setDialogue] = useState<number>(0);
  const dialogues = [
    {
      buttonText: ["", "Next", ""],
      labelText:
        "It's a beautiful day at the forest, where Detective Bingus is camping",
    },

    {
      buttonText: [
        "Hello",
        "Pull out the I am a good person card",
        "Cry inside",
      ],
      labelText: "Garfield: Why are you like this",
    },
    { buttonText: ["yes", "wrong", "arcnae"], labelText: "Hello" },
    { buttonText: ["yes", "no", "no"], labelText: "Garfield: Are you tho" },
    {
      buttonText: ["alrighty", "i apologize", "Ive got to go"],
      labelText: "Garfield: fine, goodbye",
    },
    {
      buttonText: ["Really?", "Who is it", "Watson?"],
      labelText: "Detective Gerbils: Thats It, I have cracked the case.",
    },
    {
      buttonText: ["1", "JACK?!", "1?"],
      labelText: "Detective Gerbils: The murderer.....is Jack",
    },
    {
      buttonText: ["", "", "1?"],
      labelText: "Detective Gerbils: Thats It, I have cracked the case.",
    },
  ];
  const currentDialogue = dialogues[dialogueIndex];

  const handleDialogue = (chosen: number) => {
    if (dialogueIndex === 0) {
      setDialogue(1);
      setVisibility(1);
    } else if (dialogueIndex === 1) {
      if (chosen === 0) {
        setDialogue(2);
      }
      if (chosen === 1) {
        setDialogue(3);
      }
      if (chosen === 2) {
        setDialogue(4);
      }
    } else if (
      dialogueIndex === 2 ||
      dialogueIndex === 3 ||
      dialogueIndex === 4
    ) {
      if (chosen === 0) {
        setDialogue(5);
      }
      if (chosen === 1) {
        setDialogue(5);
      }
      if (chosen === 2) {
        setDialogue(5);
      }
    } else if (dialogueIndex === 5) {
      setVisibility(0);
      setDialogue(1);
    }
  };

  return (
   
      <div className="overallContainer">
        <img src={Bingus} alt="Image" className="Bingus" />

        <div className="textContainer">
          <div className="label">{currentDialogue.labelText}</div>
          <div className="button-container">
            {currentDialogue.buttonText.map((buttonText, i) => (
              //each button has a key prop set to the index of the button in the array
              <Button
                key={i}
                className="dialogue"
                type="submit"
                onClick={() => handleDialogue(i)}
                style={{
                  display:
                    visibility === 0
                      ? "none"
                      : visibility === 1
                      ? "inline-block"
                      : visibility === 2 && i === 1
                      ? "inline-block"
                      : "none",
                }}>
                {buttonText}
              </Button>
            ))}
          </div>
        </div>
      </div>
   
  );
};

export default Brief;
