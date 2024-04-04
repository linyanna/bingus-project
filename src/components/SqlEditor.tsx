import { useEffect, useState } from "react";
import { deserializeDatabaseFromLocalStorage, serializeDatabaseToLocalStorage } from "../utils/databaseUtils";
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import initSqlJs from "sql.js";
import sqlWasm from "../../node_modules/sql.js/dist/sql-wasm.wasm?url"; // Required to let webpack 4 know it needs to copy the wasm file to our assets
import SqlEditorInput from "./SqlEditorInput";
import SqlEditorBrief from "./SqlEditorBrief";
import SqlEditorCommands from "./SqlEditorCommands";
import "../styles/sqlEditor.css";

// Database type from sql.js
// TODO: define interface with methods
type Database = any;

function SqlEditor() {
  const [db, setDb] = useState<null | Database>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchSqlData = async () => {
      // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
      // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
      // see ../craco.config.js
      try {
        // Check if serialized database exists in local storage
        const serializedDb = localStorage.getItem("userLocalDatabase");

      if (serializedDb) {
        console.log("Database is serialized");
        try {
          // Deserialize and use the existing database from local storage
          const sqlDb = await deserializeDatabaseFromLocalStorage();
          setDb(sqlDb);
        } catch (error) {
          console.error("Error deserializing database:", error);
          // Handle the error as needed
        }
      } 
      else {
        console.log("database is not serialized")
          const sqlPromise = await initSqlJs({ locateFile: () => sqlWasm });
          // Using a dummy database from: https://www.sqlitetutorial.net/sqlite-sample-database/
          // ex table names include playlists, artists, customers
          const dataPromise = fetch(
            "https://lynhjymnmasejyhzbhwv.supabase.co/storage/v1/object/public/game_data/game_data.db"
          ).then((res) => res.arrayBuffer());
          const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
          setDb(new SQL.Database(new Uint8Array(buf)));
        }
      } catch (err) {
        setError(err as string);
      }
    };
    fetchSqlData();
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
