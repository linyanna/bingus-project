import { useState } from "react";
import ResultsTable from "./ResultsTable";
import { Textarea } from "@/components/ui/textarea";

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
        <button id="execute-sql" onClick={handleExec}>
          Execute
        </button>
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
