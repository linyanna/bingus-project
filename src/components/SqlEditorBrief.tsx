import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import sqlQueries from "../assets/scripts/sqlQueries.json";
import { Button } from "./ui/button";

interface Props {
  dialogueId: string;
}

const SqlEditorBrief: React.FC<Props> = ({ dialogueId }) => {
  const [directions, setDirections] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [seeAnswer, setSeeAnswer] = useState<boolean>(false);

  // Update the brief directions whenever the dialogueId changes
  useEffect(() => {
    const index = sqlQueries.findIndex(field => field.id === dialogueId);
    if (index != -1) {
      setDirections(sqlQueries[index].briefDirection);
      setAnswer(sqlQueries[index].answer);
    }
  }, [dialogueId]);

  const handleSeeAnswer = () => {
    setSeeAnswer(!seeAnswer);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Directions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{directions}</p>
        </CardContent>
      </Card>
      <div style={{margin: "1rem 0"}}>
        <Button onClick={handleSeeAnswer} style={{width: "110px"}}>
          {seeAnswer ? <p>Hide Answer</p> : <p>See Answer</p>}
        </Button>
      </div>
          {/* {seeAnswer ? <p>{answer}</p> : `See Answer`} */}
          {seeAnswer ? <div><strong>Answer: </strong>{answer}</div> : ``}
    </div>
  );
}

export default SqlEditorBrief;