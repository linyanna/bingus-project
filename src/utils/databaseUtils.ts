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

export const getPlayerId = () => {
  try {
    const authToken = localStorage.getItem("sb-lynhjymnmasejyhzbhwv-auth-token");
    if (!authToken) {
      throw new Error("Authentication token not found in local storage");
    }
    const user = JSON.parse(authToken).user;
    const playerId = user.id;
    return playerId;
  } 
  catch (error) {
    console.error("Error checking user login status:", error);
    return null;
  }
};

export const getLocalDatabase = () => {
  try {
    const userLocalDatabase = localStorage.getItem("userLocalDatabase");
    return userLocalDatabase;
  } 
  catch (error) {
    console.error("Error Getting Local Databse:", error);
    return null;
  }
};


// Define the data structure to hold table schema information
interface TableSchema {
  name: string;
  columns: string[];
  types: string[];
}

// Function to fetch table schema from SQL.js database
export const fetchTableSchemaFromSQL = async (): Promise<{ tables: TableSchema[] }> => {
  try {
    const db = await deserializeDatabaseFromLocalStorage();
    const tableNames = await fetchTableNames(); // Fetch table names from database
    const tables: TableSchema[] = [];

    for (const tableName of tableNames) {

      const columnsResult = db.exec(`PRAGMA table_info(${tableName});`);
      if (!columnsResult || !columnsResult.length) {
        throw new Error(`No columns found for table ${tableName}.`);
      }

      const columns: string[] = [];
      const types: string[] = [];

      columnsResult.forEach((tableColumnData: any) => {
        // Iterate over row.values in steps of six to extract name and type

        for (let i = 0; i < tableColumnData.values.length; i ++){
            const columnName = tableColumnData.values[i][1];
            const columnType = tableColumnData.values[i][2]; 
            columns.push(columnName);
            types.push(columnType);
        }
    });

      tables.push({ name: tableName, columns, types });
    }

    return { tables };
  } catch (error) {
    throw new Error(`Error fetching table schema: ${error}`);
  }
};
