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

const SqlEditorInput: React.FC<Props> = ({ supabase, db, dialogueId }) => {
  const [error, setError] = useState<null | string>(null);
  const [command, setCommand] = useState<null | string>(null);
  const [results, setResults] = useState<[] | Array<string>>([]);
  const [nextDialogueId, setNextDialogueId] = useState<string>("0.0");
  const playerId = getPlayerId();
  // const theme = useState<Theme>(
  //   () => (localStorage.getItem("vite-ui-theme") as Theme) || "system"
  // )

  useEffect(() => {
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
      const isCorrectCommand = handleCommand(dialogueId, command);
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead
<<<<<<< HEAD

      handleCommand(0, command);

=======
>>>>>>> b32bb81bd6f781632b7af6056caaba02e5a56f43
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
        else{
          //Update local storage with new index
          localStorage.setItem('guestDialogueIndex', nextDialogueId);

        }
        

          

          // Set active tab to Brief
          // setActiveTab(Tab.BRIEF);
      }

      // Update local storage with the current database state
      updateLocalStorage(db);
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
      setError(err as string);
      setResults([]);
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

    // console.log(crosscheck);

    // Check that each component of array is correct (parsing)
    switch(crosscheck) {
      // case 1.0:
      //   // SELECT * FROM Inventory;
      //   selectAllCheck(array, 'inventory');
      //   break;
      case "1.0":
        // SELECT Type FROM Inventory WHERE Type = "phone";
        if (array[0][0] != 'select')       throw new Error("Hint: use the SELECT statement.");
        if (array[1][0] != 'type')         throw new Error("Hint: we want to select a type from our inventory.");
        if (array[2][0] != 'from')         throw new Error("Hint: use the FROM clause when trying to grab data from a table");
        if (array[3][0] != 'inventory')    throw new Error("Hint: we are trying to look through our 'inventory'");
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'type', '\"phone\"', 5);
        break;
      case "1.4":
        // SELECT * FROM Inventory ORDER BY size DESC LIMIT 5;
        selectAllCheck(array, 'inventory');
        if (array[4][0] != 'order' && 
            array[5][0] != 'by')           throw new Error("Hint: we need to ORDER BY");
        if (array[6][0] != 'size')         throw new Error("Incorrect");
        if (array[7][0] != 'desc')         throw new Error("Hint: sort by descending order");
        if (array[8][0] != 'limit')        throw new Error("Hint: use the LIMIT clause");
        if (array[9][0] != '5')            throw new Error("Hint: Limit 5");
        break;
      case "2.4":
        // SELECT * FROM suspects WHERE notes = "poptarts" OR notes = "rainbows";
        selectAllCheck(array, 'suspects');
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'notes', '\"poptarts\"', 5);
        if (array[8][0] != 'or')           throw new Error("Incorrect-OR");
        filterCheck(array, 'notes', '\"rainbows\"', 9);
        break;
      case "3.3":
        // SELECT * FROM suspects WHERE notes="meowfia";
        selectAllCheck(array, 'suspects');
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'notes', '\"meowfia\"', 5);
        break;
      case "4.6":
        // SELECT item, shipmentTime FROM supermarket WHERE item ="poptart";
        console.log("array:", array);
        if (array[0][0] != 'select')       throw new Error("Hint: use the SELECT statement.");
        if (array[1][0] != 'item')         throw new Error("Hint: we want to select an item and shipment time from the supermarket.");
        if (array[2][0] != 'shipmenttime') throw new Error("Hint: we want to select an item and shipment time from the supermarket.")
        if (array[3][0] != 'from')         throw new Error("Hint: use the FROM clause when trying to grab data from a table");
        if (array[4][0] != 'supermarket')  throw new Error("Hint: we are trying to look through our 'inventory'");
        if (array[5][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'item', '\"poptart\"', 6);
        break;
    }
    return true;
  }

  const selectAllCheck = (array: any, table: String) => {
    if (array[0][0] != 'select') throw new Error("Hint: use the SELECT statement.");
    if (array[1][0] != '*')      throw new Error("Hint: use the '*' character to select all.");
    if (array[2][0] != 'from')   throw new Error("Hint: use the FROM statement when trying to grab data from a table");
    if (array[3][0] != table)    throw new Error("Hint: we are trying to look through the " + table);
  }

  const filterCheck = (array: any, column: String, name: String, index: number) => {
    if (array[index++][0] != column) throw new Error("Incorrect");
    if (array[index++][0] != '=')    throw new Error("Incorrect");
    if (array[index][0] != name)     throw new Error("Incorrect");
  }

  return (
    <div>
      <div className="sqlEditorInputContainer">
        <Textarea
<<<<<<< HEAD
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter some SQL. Not sure? Try “select * from clues.”"
          cols={80}
          rows={10}
          id="sql-input"></Textarea>
=======
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
>>>>>>> b32bb81bd6f781632b7af6056caaba02e5a56f43
      </div>
      <div>
        <Button className="mt-5" id="execute-sql" onClick={handleExec}>
          Execute
        </Button>
      </div>
<<<<<<< HEAD

      <pre className="error">{(error || "").toString()}</pre>

      <pre>
        {
          // results contains one object per select statement in the query
          (results as Array<{ columns: string[]; values: any[][] }>).map(
            ({ columns, values }, i) => (
              <ResultsTable key={i} columns={columns} values={values} />
=======
      <div className="grayText" style={{ margin: "10px 0 0 0"}}>
        <p>
          <strong>Tip:</strong> You can use "SHIFT + ENTER" to execute your command.
        </p>
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
>>>>>>> b32bb81bd6f781632b7af6056caaba02e5a56f43
            )
          )
        }
      </pre>
    </div>
  );
}

export default SqlEditorInput;
