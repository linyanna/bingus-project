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

function SqlEditorInput({ db }: { db: Database }) {
  const [error, setError] = useState<null | string>(null);
  const [command, setCommand] = useState<null | string>(null);
  const [results, setResults] = useState<[] | Array<string>>([]);

  function handleExec() {
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead

      handleCommand(1, command);

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
  function handleCommand(crosscheck: number, command: String | null) {
    if (!command?.endsWith(";")) {
      throw new Error("Commands must end with a semicolon!");
    }

    const str = command.toLowerCase();
    const regex = /([a-z0-9\*=]+)|(\"[a-z]+\")/g;
    const array = [...str.matchAll(regex)];

    // Check that each component of array is correct (parsing)
    switch(crosscheck) {
      case 0:
        // SELECT * FROM Inventory;
        selectAllCheck(array, 'inventory');
        break;
      case 1:
        // SELECT Type FROM Inventory WHERE Type = "phone";
        if (array[0][0] != 'select')       throw new Error("Hint: use the SELECT statement.");
        if (array[1][0] != 'type')         throw new Error("Hint: we want to select a type from our inventory.");
        if (array[2][0] != 'from')         throw new Error("Hint: use the FROM clause when trying to grab data from a table");
        if (array[3][0] != 'inventory')    throw new Error("Hint: we are trying to look through our 'inventory'");
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'type', '\"phone\"', 5);
        break;
      case 2:
        selectAllCheck(array, 'inventory');
        if (array[4][0] != 'order' && 
            array[5][0] != 'by')           throw new Error("Hint: we need to ORDER BY");
        if (array[6][0] != 'size')         throw new Error("Incorrect");
        if (array[7][0] != 'desc')         throw new Error("Hint: sort by descending order");
        if (array[8][0] != 'limit')        throw new Error("Hint: use the LIMIT clause");
        if (array[9][0] != '5')            throw new Error("Hint: Limit 5");
        break;
      case 3:
        selectAllCheck(array, 'suspects');
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'notes', '\"poptarts\"', 5);
        if (array[8][0] != 'OR')           throw new Error("Incorrect");
        filterCheck(array, 'notes', '\"rainbows\"', 9);
        break;
      case 4:
        selectAllCheck(array, 'suspects');
        if (array[4][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'notes', '\"meowfia\"', 5);
        break;
      case 5:
        if (array[0][0] != 'select')       throw new Error("Hint: use the SELECT statement.");
        if (array[1][0] != 'item')         throw new Error("Hint: we want to select an item and shipment time from the supermarket.");
        if (array[2][0] != ',')            throw new Error("Hint: delimit column names with a comma");
        if (array[3][0] != 'shipmentTime') throw new Error("Hint: we want to select an item and shipment time from the supermarket.")
        if (array[4][0] != 'from')         throw new Error("Hint: use the FROM clause when trying to grab data from a table");
        if (array[5][0] != 'supermarket')  throw new Error("Hint: we are trying to look through our 'inventory'");
        if (array[6][0] != 'where')        throw new Error("Hint: use the WHERE clause when trying to filter rows");
        filterCheck(array, 'item', '\"poptart\"', 7);
        break;
    }
  }

  function selectAllCheck(array: any, table: String) {
    if (array[0][0] != 'select') throw new Error("Hint: use the SELECT statement.");
    if (array[1][0] != '*')      throw new Error("Hint: use the '*' character to select all.");
    if (array[2][0] != 'from')   throw new Error("Hint: use the FROM statement when trying to grab data from a table");
    if (array[3][0] != table)    throw new Error("Hint: we are trying to look through the " + table);
  }

  function filterCheck(array: any, column: String, name: String, index: number) {
    if (array[index++][0] != column) throw new Error("Incorrect");
    if (array[index++][0] != '=')    throw new Error("Incorrect");
    if (array[index][0] != name)     throw new Error("Incorrect");
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

export default SqlEditorInput;
