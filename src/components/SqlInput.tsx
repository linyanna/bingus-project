import { useState } from "react";
import ResultsTable from "./ResultsTable";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Database = any;

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
*/

// Function to update local storage with the current database state
function updateLocalStorage(database: Database) {
  try {
    // Serialize the database and store it in local storage
    const serializedDb = JSON.stringify(Array.from(database.export()));
    localStorage.setItem("userLocalDatabase", serializedDb);
  } catch (error) {
    console.error("Error updating local storage:", error);
    // Handle the error as needed
  }
}

function SqlInput({ db }: { db: Database }) {
  const [error, setError] = useState<null | string>(null);
  const [command, setCommand] = useState<null | string>(null);
  const [results, setResults] = useState<[] | Array<string>>([]);

  function handleExec() {
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead

      handleCommand(0, command);

      setResults(db.exec(command)); // an array of objects is returned
      setError(null);

      // Update local storage with the current database state
      updateLocalStorage(db);
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
      setError(err as string);
      setResults([]);
    }
  }

  // this function will lex/parse the SQL statement based off of the input paramater for where in the story the player is
  function handleCommand(crosscheck: number, command: any) {
    try {
      if (!command?.endsWith(";")) {
        throw new Error("Commands must end with a semicolon!");
      }
  
      const str = command.toLowerCase();

      // crosscheck is 0 -> check for first command (SELECT * FROM inventory;)
      if (crosscheck == 0) {
        const regex = /([a-z\*]+)/g;
        const array = [...str.matchAll(regex)];
    
        // Check that each component of array is correct (parsing)
        if (array[0][0] != 'select') throw new Error("Hint: use the SELECT statement.");
        if (array[1][0] != '*') throw new Error("Hint: use the '*' character to select all.");
        if (array[2][0] != 'from') throw new Error("Hint: use the FROM statement when trying to grab data from a table");
        if (array[3][0] != 'inventory') throw new Error("Hint: we are trying to look through our 'inventory'");
      }
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
      setError(err as string);
      setResults([]);
    }
  }

  return (
    <div>
      <div>
        <Textarea
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter some SQL. Not sure? Try “select * from clues.”"
          cols={80}
          rows={10}
          id="sql-input"></Textarea>
      </div>
      <div>
        <Button className="mt-5" id="execute-sql" onClick={handleExec}>
          Execute
        </Button>
      </div>

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
  );
}

export default SqlInput;
