import { useEffect, useState } from "react";
import ResultsTable from "./ResultsTable";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tab } from "./Navbar";
import { SupabaseClient } from "@supabase/supabase-js";
import { getPlayerId } from "@/utils/databaseUtils";
import sqlQueries from "../assets/scripts/sqlQueries.json";

interface Props {
  supabase: SupabaseClient;
  db: any;
  dialogueId: string;
  setActiveTab: (tab: Tab) => void;
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */

const SqlEditorInput: React.FC<Props> = ({ supabase, db, dialogueId, setActiveTab }) => {
  const [error, setError] = useState<null | string>(null);
  const [command, setCommand] = useState<null | string>(null);
  const [results, setResults] = useState<[] | Array<string>>([]);
  const [nextDialogueId, setNextDialogueId] = useState<string>(dialogueId);
  const [gotAnswer, setGotAnswer] = useState<boolean>(false);
  const playerId = getPlayerId();

  useEffect(() => {
    setNextDialogueId(dialogueId);
    const getNextDialogueId = () => {
    const index = sqlQueries.findIndex(field => field.id === dialogueId);
    if (index != -1) {
      setNextDialogueId(sqlQueries[index].nextDialogueId);
    }
  }
  getNextDialogueId();
  }, [dialogueId]); 

  // Function to update local storage with the current database state
  const updateLocalStorage = (database: any) => {
    try {
      // Serialize the database and store it in local storage
      const serializedDb = JSON.stringify(Array.from(database.export()));
      localStorage.setItem("userLocalDatabase", serializedDb);
    } catch (error) {
      console.error("Error updating local storage:", error);
      // Handle the error as needed
    }
  }

  const handleExec = () => {
    try {
      // Handle validation of SQL statement per dialogueId
      let isCorrectCommand = false;
      isCorrectCommand = handleCommand(dialogueId, command);
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead
      setResults(db.exec(command)); // an array of objects is returned
      setError(null);
      if (isCorrectCommand) {
        if (playerId){
          // Update the dialogue_id in the players table
          supabase.from("players")
          .update({ dialogue_id: nextDialogueId })
          .eq('player_id', playerId)
          .then(() => {
            console.log("Dialogue updated successfully: ", nextDialogueId);
          });
        }
        else {
          //Update local storage with new index
          localStorage.setItem('guestDialogueIndex', nextDialogueId);
        }
        setGotAnswer(true);
      }
      // Update local storage with the current database state
      updateLocalStorage(db);
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
      setError(err as string);
      setResults([]);
      setGotAnswer(false);
    }
  }

  // this function will lex/parse the SQL statement based off of the input paramater for where in the story the player is
  const handleCommand = (crosscheck: string, command: string | null) => {
    if (!command?.endsWith(";")) {
      throw new Error("Commands must end with a semicolon!");
    }

    const str = command.toLowerCase();
    const regex = /([a-z0-9\*=]+)|(\"[a-z]+\")/g;
    const array = [...str.matchAll(regex)];
    
    const isSelectAllCommand = selectAllCheck2(array, ['suspects', 'inventory', 'supermarket']);

    if (isSelectAllCommand) {
      setGotAnswer(false);
      return false;
    } else {
    // Check that each component of array is correct (parsing)
    switch(crosscheck) {
      // case 1.0:
      //   // SELECT * FROM Inventory;
      //   selectAllCheck(array, 'inventory');
      //   break;
      case "1.0.1":
        // SELECT Type FROM Inventory WHERE Type = "phone";
        console.log("array:", array.length);
        if (array.length < 8) {
          throw new Error("Hint: missing clauses");
        }
        if (array[0][0] != 'select')       throw new Error("Hint: use the SELECT statement.");
        if (array[1][0] != 'type')         throw new Error("Hint: we want to select a type from our inventory.");
        if (array[2][0] != 'from')         throw new Error("Hint: use the FROM clause when trying to grab data from a table");
        if (array[3][0] != 'inventory')    throw new Error("Hint: we are trying to look through our 'inventory'");
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'type', '\"phone\"', 5);
        break;
      case "1.4.1":
        // SELECT * FROM Inventory ORDER BY size DESC LIMIT 5;
        if (array.length < 10) {
          throw new Error("Hint: missing clauses");
        }
        selectAllCheck(array, 'inventory');
        if (array[4][0] != 'order' && 
            array[5][0] != 'by')           throw new Error("Hint: we need to ORDER BY");
        if (array[6][0] != 'size')         throw new Error("Incorrect");
        if (array[7][0] != 'desc')         throw new Error("Hint: sort by descending order");
        if (array[8][0] != 'limit')        throw new Error("Hint: use the LIMIT clause");
        if (array[9][0] != '5')            throw new Error("Hint: Limit 5");
        break;
      case "2.4.1":
        // SELECT * FROM suspects WHERE notes = "poptarts" OR notes = "rainbows";
        if (array.length < 12) {
          throw new Error("Hint: missing clauses");
        }
        selectAllCheck(array, 'suspects');
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'notes', '\"poptarts\"', 5);
        if (array[8][0] != 'or')           throw new Error("Incorrect-OR");
        filterCheck(array, 'notes', '\"rainbows\"', 9);
        break;
      case "3.3.1":
        // SELECT * FROM suspects WHERE notes="meowfia";
        if (array.length < 8) {
          throw new Error("Hint: missing clauses");
        }
        selectAllCheck(array, 'suspects');
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'notes', '\"meowfia\"', 5);
        break;
      case "4.6.1":
        // SELECT item, shipmentTime FROM supermarket WHERE item ="poptart";
        if (array.length < 8) {
          throw new Error("Hint: missing clauses");
        }
        console.log("array:", array);
        if (array[0][0] != 'select')       throw new Error("Hint: use the SELECT statement.");
        if (array[1][0] != 'item')         throw new Error("Hint: we want to select an item and shipment time from the supermarket.");
        if (array[2][0] != 'shipmenttime') throw new Error("Hint: we want to select an item and shipment time from the supermarket.")
        if (array[3][0] != 'from')         throw new Error("Hint: use the FROM clause when trying to grab data from a table");
        if (array[4][0] != 'supermarket')  throw new Error("Hint: we are trying to look through our 'inventory'");
        if (array[5][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'item', '\"poptart\"', 6);
        break;
      default:
        setGotAnswer(false);
        // selectAllCheck2(array, ['suspects', 'inventory', 'supermarket']);
        return false;
    }
  }
    return true;
    
  }

  const selectAllCheck = (array: any, table: String) => {
    if (array[0][0] != 'select') throw new Error("Hint: use the SELECT statement.");
    if (array[1][0] != '*')      throw new Error("Hint: use the '*' character to select all.");
    if (array[2][0] != 'from')   throw new Error("Hint: use the FROM statement when trying to grab data from a table");
    if (array[3][0] != table)    throw new Error("Hint: we are trying to look through the " + table);
  }

  // for assessing if query is a select * from [table name]
  const selectAllCheck2 = (array: any, table: String[]) => {
    let match = false;

    if (array.length > 4) {
      return match;
    }
    if (array[0][0] == 'select' && array[1][0] == '*' && array[2][0] == 'from') {
      console.log("table:", table);
      for (let i = 0; i < table.length - 1; i++) {
        if (array[3][0] == table[i]) {
          match = true;
          break;
        }
      }
    }
    return match;
  }

  const filterCheck = (array: any, column: string, name: string, index: number) => {
    if (array[index++][0] != column) throw new Error("Incorrect");
    if (array[index++][0] != '=')    throw new Error("Incorrect");
    if (array[index][0] != name)     throw new Error("Incorrect");
  }

  return (
    <div>
      <div className="sqlEditorInputContainer">
        <Textarea
          id="sql-input"
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter some SQL. Not sure? Try “select * from inventory.”"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              handleExec();
            }
          }}>
        </Textarea>
      </div>
      <div style={{ margin: "1rem 0"}}>
        {gotAnswer ? (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
          <div className="grayText">Correct!</div>
          <Button onClick={() => setActiveTab(Tab.BRIEF)} style={{width: "110px", marginLeft: "auto" }}>Back To Brief</Button>
        </div>
        ) : (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
          <div className="grayText">Execute your SQL query.</div>
          <Button id="execute-sql" onClick={handleExec} style={{width: "110px", marginLeft: "auto"}}>Execute</Button>
        </div>
        )}
      </div>
      <div className="grayText" style={{ margin: "20px 0 0 0"}}>
        <pre className="error">{(error || "").toString()}</pre>
        <pre>
          {
            // results contains one object per select statement in the query
            (results as Array<{ columns: string[]; values: any[][] }>).map(
              ({ columns, values }, i) => (
                <ResultsTable key={i} columns={columns} values={values} />
              )
            )
          }
        </pre>
      </div>
    </div>
  );
}

export default SqlEditorInput;
