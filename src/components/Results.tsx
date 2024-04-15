import React, { useState, useEffect } from "react";
import { fetchTableNames, fetchTableSchemaFromSQL } from "../utils/databaseUtils"; // Import function to fetch table names and schema
import "../styles/results.css"; // Import the CSS file
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "../components/ui/Select"
import {Dialog,DialogContent,DialogTrigger,} from "../components/ui/dialog"
import { TableCol, columns } from "../components/Columns"
import { DataTable } from "../components/DataTable"

const Results: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [tableData, setTableData] = useState<any>({ nodes: [] });
  const [tableSchema, setTableSchema] = useState<any>(null);

  const [stringList, setStringList] = useState<string[]>([]);
  const [integerRange, setIntegerRange] = useState<number>(1);

  useEffect(() => {
    updateStringList(integerRange);
  }, [integerRange]);

  const updateStringList = (range: number) => {
    const newStringList = generateStringList(range);
    setStringList(newStringList);
  }

  const generateStringList = (intRange: number) => {
    const stringLists = [];
    for (let i = 1; i <= intRange; i++) {
      const strings = [];
      if (i >= 1) {
        strings.push("Clues", "SUSPECT", "INVENTORY");
      }
      if (i >= 2) {
        strings.push("Location", "Police_List");
      }
      
      stringLists.push(strings);
    }
    return stringLists.flat(); // Flatten the array of arrays
  }

  useEffect(() => {
    fetchAndPrintTableNames(); 
    fetchAndPrintTableSchema(); 
  }, []);

  useEffect(() => {
    if (selectedOption && tableSchema) {
      generateData(selectedOption, tableSchema);
    }
  }, [selectedOption, tableSchema]);

  const generateData = (selectedOption: string, tableSchema: any) => {
    const selectedTable = tableSchema.tables.find((table: any) => table.name === selectedOption);
    
    if (selectedTable) {
      const nodes = selectedTable.columns.map((column: string, index: number) => ({
        name: column,
        type: selectedTable.types[index] // Use the corresponding type from types list
      }));
  
      // Convert nodes into the format expected by the DataTable component
      const data = nodes.map((node: { name: string; type: string; }, rowIndex: number) => ({
        id: rowIndex.toString(), // Assuming unique IDs for each row
        ...node // Spread the node object
      }));
  
      // Ensure tableData.nodes is set properly
      setTableData({ nodes: data });
    } else {
      // Ensure tableData.nodes is set properly even when no data is available
      setTableData({ nodes: [] });
    }
  };
  
  

  const fetchAndPrintTableNames = async () => {
    try {
      const tableNames = await fetchTableNames(); // Fetch table names from Supabase
      console.log("Table Names:", tableNames); // Print table names to console
      console.log("Available Tables:" + stringList);
    } catch (error) {
      console.error("Error fetching table names:", error);
    }
  };

  const fetchAndPrintTableSchema = async () => {
    try {
      const tableSchema = await fetchTableSchemaFromSQL(); // Fetch table schema from SQL.js database
      console.log("Table Schema:", tableSchema); // Print table schema to console
      setTableSchema(tableSchema);
    } catch (error) {
      console.error("Error fetching table schema:", error);
    }
  };

  const handleValueChange = (value: string) => {
    console.log(value);
    setSelectedOption(value);
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="title">
          <h2>{selectedOption ? `${selectedOption}` : "No Option Selected"}</h2>
        </div>

        <div className="table-container">
          <DataTable columns={columns} data={tableData.nodes} />
        </div>

      </div>
      <div className="right-side">
        <div className="dropdown-container">
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Option" />
            </SelectTrigger>
            <SelectContent>
              {tableSchema && tableSchema.tables.map((table: any) => (
                <SelectItem
                  key={table.name}
                  value={table.name}
                >
                  {table.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="static-picture">
          <Dialog>
            <DialogTrigger>
              <img src="https://via.placeholder.com/300x200" alt="Static Picture" />
            </DialogTrigger>
            <DialogContent>
              <img src="https://via.placeholder.com/800x800" alt="Static Picture" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Results;