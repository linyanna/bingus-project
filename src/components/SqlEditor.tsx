import { useEffect, useState } from "react";
import { getPlayerId } from "../utils/databaseUtils"; // Import function to fetch table names and schema
import { deserializeDatabaseFromLocalStorage, serializeDatabaseToLocalStorage, createDatabaseFromBucket  } from "../utils/databaseUtils";
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import initSqlJs from "sql.js";
import sqlWasm from "../../node_modules/sql.js/dist/sql-wasm.wasm?url"; // Required to let webpack 4 know it needs to copy the wasm file to our assets
import SqlEditorInput from "./SqlEditorInput";
import SqlEditorBrief from "./SqlEditorBrief";
import SqlEditorCommands from "./SqlEditorCommands";
import "../styles/sqlEditor.css";
import { supabase } from "../App"; // Assuming the path to App.tsx is correct
import { create } from "domain";


// Database type from sql.js
// TODO: define interface with methods
type Database = any;



function SqlEditor() {
  const [db, setDb] = useState<null | Database>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchSqlData = async () => {

      //Try to get database from 3 locations
      try {
        //1) database already in local storage
        const serializedDb = localStorage.getItem("userLocalDatabase");
        if (serializedDb) {
          console.log("Database is serialized");
          try {
            const sqlDb = await deserializeDatabaseFromLocalStorage();
            setDb(sqlDb);
          } catch (error) {
            console.error("Error deserializing database:", error);
          }
        } 
        else {
          const playerId = getPlayerId();
          //2) Fetch database from player save table
          if (playerId) {
            console.log("Player Logged in is: " + playerId);
            const { data, error } = await supabase
              .from("players")
              .select("player_database")
              .eq("player_id", playerId)
              .single();
            if (error) {
              throw error;
            }  
            const playerDatabase = data.player_database;
            const SQL = await initSqlJs({ locateFile: () => sqlWasm });
            const buf = new Uint8Array(JSON.parse(playerDatabase));
            console.log(playerDatabase)
            if (playerDatabase === null){
              console.log("Supabase DB in null")
              const db = await createDatabaseFromBucket();
              setDb(db);
              
            }
            else {
              setDb(new SQL.Database(buf));
              console.log("Player Data is not empty, setting LocalDB = SupabaseDB", playerId);
            }
          } 
          //3) Fetch database from game_data. (Start from scratch)
          else {
            const db = await createDatabaseFromBucket();
            setDb(db);
          }
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
