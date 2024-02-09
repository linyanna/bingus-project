import { useEffect, useState } from "react";
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import initSqlJs from "sql.js";
import sqlWasm from "../../node_modules/sql.js/dist/sql-wasm.wasm?url"; // Required to let webpack 4 know it needs to copy the wasm file to our assets
import SqlRepl from "./SqlRepl";
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
        const sqlPromise = await initSqlJs({ locateFile: () => sqlWasm });
        // Using a dummy database from: https://www.sqlitetutorial.net/sqlite-sample-database/
        // ex table names include playlists, artists, customers
        const dataPromise = fetch(
          "https://lynhjymnmasejyhzbhwv.supabase.co/storage/v1/object/public/chinook_db/chinook.db?t=2024-02-08T08%3A17%3A41.783Z"
        ).then((res) => res.arrayBuffer());
        const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
        setDb(new SQL.Database(new Uint8Array(buf)));
      } catch (err) {
        setError(err as string);
      }
    };
    fetchSqlData();
  }, []);

  if (error)
    return (
      <div className='sqlEditor'>
        <pre>{error.toString()}</pre>
      </div>
    );
  else if (!db)
    return (
      <div className='sqlEditor'>
        <pre>Loading...</pre>
      </div>
    );
  else
    return (
      <div className='sqlEditor'>
        <SqlRepl db={db} />
      </div>
    );
}

export default SqlEditor;
