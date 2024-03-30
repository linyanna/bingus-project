import initSqlJs from "sql.js";
import sqlWasm from "../../node_modules/sql.js/dist/sql-wasm.wasm?url"; // Required to let webpack 4 know it needs to copy the wasm file to our assets

// Function to serialize the database and save it to local storage
export function serializeDatabaseToLocalStorage(db: any): void {
    try {
      const serializedDb = JSON.stringify(Array.from(db.export()));
      localStorage.setItem("userLocalDatabase", serializedDb);
      console.log("Database serialized and saved to local storage.");
    } catch (error) {
      console.error("Error serializing database:", error);
      throw error;
    }
  }

// Function to deserialize the database from local storage
export async function deserializeDatabaseFromLocalStorage(): Promise<any> {
  const serializedDb = localStorage.getItem("userLocalDatabase");
  if (serializedDb) {
    try {
      const buf = new Uint8Array(JSON.parse(serializedDb));
      const SQL = await initSqlJs({ locateFile: () => sqlWasm });
      return new SQL.Database(buf);
    } catch (error) {
      console.error("Error deserializing database:", error);
      throw error;
    }
  }
  return null;
}

// Function to execute a SQL query and return the result
export function executeSqlQuery(db: any, query: string): any[] {
  try {
    const result = db.exec(query);
    if (result && result.length > 0) {
      return result;
    }
    return [];
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error;
  }
}

// Function to fetch table names from the database
export async function fetchTableNames(): Promise<string[]> {
  try {
    const db = await deserializeDatabaseFromLocalStorage();
    const result = executeSqlQuery(db, "SELECT name FROM sqlite_master WHERE type='table'");
    if (result.length > 0 && result[0].values.length > 0) {
      return result[0].values.map((row: any) => row[0]);
    }
    return [];
  } catch (error) {
    console.error("Error fetching table names:", error);
    throw error;
  }
}
