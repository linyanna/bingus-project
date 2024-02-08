import { useEffect, useState } from 'react'
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import initSqlJs from "sql.js";
import sqlWasm from "../../../node_modules/sql.js/dist/sql-wasm.wasm?url"; // Required to let webpack 4 know it needs to copy the wasm file to our assets
import SqlRepl from './SqlRepl';

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
        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        setDb(new SQL.Database());
      } catch (err) {
        setError(err as string);
      }
    };
    fetchSqlData();
  }, []);

  if (error) return <pre>{error.toString()}</pre>;
  else if (!db) return <pre>Loading...</pre>;
  else return <SqlRepl db={db} />;
}

export default SqlEditor;