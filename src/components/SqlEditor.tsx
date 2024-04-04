import { useEffect, useState } from "react";
import { getLocalDatabase, getPlayerId } from "../utils/databaseUtils"; // Import function to fetch table names and schema
import { deserializeDatabaseFromLocalStorage, serializeDatabaseToLocalStorage } from "../utils/databaseUtils";
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import initSqlJs from "sql.js";
import sqlWasm from "../../node_modules/sql.js/dist/sql-wasm.wasm?url"; // Required to let webpack 4 know it needs to copy the wasm file to our assets
import SqlInput from "./SqlInput";
import "../styles/sqlEditor.css";
import { supabase } from "../App"; // Assuming the path to App.tsx is correct


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
            if (data) {
              const playerDatabase = data.player_database;
              const SQL = await initSqlJs({ locateFile: () => sqlWasm });
              const buf = new Uint8Array(JSON.parse(playerDatabase));
              setDb(new SQL.Database(buf));
            } else {
              console.log("No player data found for playerId:", playerId);
            }
          } 
          //3) Fetch database from game_data. (Start from scratch)
          else {
            console.log("User is not logged in, fetching from game_data.db");
            const sqlPromise = await initSqlJs({ locateFile: () => sqlWasm });
            const dataPromise = fetch(
              "https://lynhjymnmasejyhzbhwv.supabase.co/storage/v1/object/public/game_data/game_data.db"
            ).then((res) => res.arrayBuffer());
            const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
            setDb(new SQL.Database(new Uint8Array(buf)));
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
        <SqlInput db={db} />
      </div>
    );
}

export default SqlEditor;
