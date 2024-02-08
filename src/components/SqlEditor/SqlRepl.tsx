import { useState } from 'react'
import ResultsTable from './ResultsTable';

type Database = any;

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */

function SqlRepl({ db }: { db: Database }) {
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
    <div>
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

export default SqlRepl;