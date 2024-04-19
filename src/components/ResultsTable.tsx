/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */
function ResultsTable({ columns, values }: { columns: string[], values: any[][] }) {
  return (
    <div>
      <div style={{marginBottom:".5rem"}}><strong>Results Table</strong></div>
      <table>
        <thead>
          <tr>
              {columns.map((columnName, i) => (
              <td key={i}><strong>{columnName}</strong></td>
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
    </div>
  );
}

export default ResultsTable;
