import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";
import initSqlJs from "sql.js";

// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "../node_modules/sql.js/dist/sql-wasm.wasm?url";

// Supabase setup referenced from: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error('Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required');
}

const supabase = createClient(url, key);

// Database type from sql.js
// TODO: define interface with methods
type Database = any;

export default function App() {
  interface Country {
    name: string;
  }
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [db, setDb] = useState<null | Database>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    if (data) {
      setCountries(data);
    }
  }

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
  else return <SQLRepl db={db} />;


  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */

function SQLRepl({ db }: { db: Database }) {
  const [error, setError] = useState<null | string>(null);
  const [results, setResults] = useState<[] | Array<string>>([]);

  function exec(sql: string) {
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead
      setResults(db.exec(sql)); // an array of objects is returned
      setError(null);
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
      setError(err as string);
      setResults([]);
    }
  }

  return (
    <div className="App">
      <h1>React SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder="Enter some SQL. No inspiration ? Try “select sqlite_version()”"
      ></textarea>

      <pre className="error">{(error || "").toString()}</pre>

      <pre>
        {
          // results contains one object per select statement in the query
          (results as Array<{ columns: string[], values: any[][] }>).map(({ columns, values }, i) => (
            <ResultsTable key={i} columns={columns} values={values} />
          ))
        }
      </pre>
    </div>
  );
}

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */
function ResultsTable({ columns, values }: { columns: string[], values: any[][] }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((columnName, i) => (
            <td key={i}>{columnName}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {
          // values is an array of arrays representing the results of the query
          values.map((row, i) => (
            <tr key={i}>
              {row.map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
