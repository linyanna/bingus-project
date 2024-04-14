import { useEffect, useState } from "react";
import { serializeDatabaseToLocalStorage, fetchSqlData  } from "../utils/databaseUtils";
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import SqlEditorInput from "./SqlEditorInput";
import SqlEditorBrief from "./SqlEditorBrief";
import SqlEditorCommands from "./SqlEditorCommands";
import "../styles/sqlEditor.css";

// Database type from sql.js
// TODO: define interface with methods
type Database = any;

const SqlEditor: React.FC = () => {
  const [db, setDb] = useState<null | Database>(null);
  const [error, setError] = useState<null | string>(null);

  //Intial pull of user database
  useEffect(() => {
    fetchSqlData(setDb, setError);
  }, []);

  // Serialize and store the database in local storage whenever it changes
  useEffect(() => {
    if (db) {
      serializeDatabaseToLocalStorage(db);
    }
  }, [db]);

  if (error)
    return (
      <div className="sqlEditor">
        <pre>{error.toString()}</pre>
      </div>
    );
  else if (!db)
    return (
      <div className="sqlEditor">
        <pre>Loading...</pre>
      </div>
    );
  else
    return (
      <div className="sqlEditor">
        <div className="sqlEditor.left">
          <SqlEditorBrief />
          <SqlEditorCommands />
        </div>
        <div className="sqlEditor.right">
          <SqlEditorInput db={db} />
        </div>
      </div>
    );
}

export default SqlEditor;
