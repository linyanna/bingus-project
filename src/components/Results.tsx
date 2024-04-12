import React, { useState, useEffect } from "react";
import CustomTable from "./CustomTable";
import Modal from "react-modal";
import { fetchTableNames, fetchTableSchemaFromSQL } from "../utils/databaseUtils"; // Import function to fetch table names and schema
import "../styles/results.css"; // Import the CSS file

const Results: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [tableData, setTableData] = useState<any>({ nodes: [] });
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [tableSchema, setTableSchema] = useState<any>(null);

  const [stringList, setStringList] = useState<string[]>([]);
  const [integerRange, setIntegerRange] = useState<number>(5);

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
        strings.push("Clues", "Suspects", "Inventory");
      }
      if (i >= 2) {
        strings.push("Location", "Police_List");
      }
      // Add more conditions for each integer increase if needed
      stringLists.push(strings);
    }
    return stringLists.flat(); // Flatten the array of arrays
  }

  useEffect(() => {
    fetchAndPrintTableNames(); // Fetch and print table names when component mounts
    fetchAndPrintTableSchema(); // Fetch and print table schema when component mounts
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
        value: selectedTable.types[index] // Use the corresponding type from types list
      }));
      setTableData({ nodes });
    } else {
      setTableData({ nodes: [] });
    }
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchAndPrintTableNames = async () => {
    try {
      const tableNames = await fetchTableNames(); // Fetch table names from Supabase
      console.log("Table Names:", tableNames); // Print table names to console
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

  const COLUMNS = [
    { label: "Name", renderCell: (item: any) => item.name },
    { label: "Value", renderCell: (item: any) => item.value },
  ];

  return (
    <div className="container">
      <div className="left-side">
        <div className="title">
          <h2>{selectedOption ? `${selectedOption}` : "No Option Selected"}</h2>
        </div>
        <div className="table-container">
          <CustomTable columns={COLUMNS} data={tableData}/>
        </div>
      </div>
      <div className="right-side">
        <div className="dropdown-container">
          <select className="dropdown" value={selectedOption} onChange={handleDropdownChange}>
            <option value="">Select Option</option>
            {tableSchema && tableSchema.tables
              .filter((table: any) => {
                // Check if table name is equal to any string in the list
                return stringList.includes(table.name);
              })
              .map((table: any) => (
                <option key={table.name} value={table.name}>{table.name}</option>
              ))}
          </select>
        </div>
        <div className="static-picture">
          <img src="https://via.placeholder.com/300x200" alt="Static Picture" onClick={openModal} />
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <img src="https://via.placeholder.com/600x400" alt="Expanded Picture" />
            <button onClick={closeModal}>Close</button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Results;
