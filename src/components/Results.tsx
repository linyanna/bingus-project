import React, { useState, useEffect } from "react";
import CustomTable from "./CustomTable";
import "../styles/results.css"; // Import the CSS file



const Results: React.FC = () => {
  // Define state variables
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<any>({ nodes: [] }); // Initialize with empty nodes array

  useEffect(() => {
    const generatedData = generateData();
    setTableData(generatedData);
  }, []);

  const generateData = () => {
    // Your logic to generate data dynamically
    const nodes: any[] = [
      {name: "Item 1", value: 10 },
      {name: "Item 2", value: 20 },
      {name: "Item 3", value: 30 },
    ];

    return { nodes };
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTableName = event.target.value;
    setSelectedTable(selectedTableName);
  };


  // Define columns for the table
  const COLUMNS = [
    { label: "Name", renderCell: (item: any) => item.name },
    { label: "Value", renderCell: (item: any) => item.value },
  ];

  return (
    <div className="container">
      <div className="left-side">
        {/* Title */}
        <div className="title">
          <h2>{selectedTable ? `Table: ${selectedTable}` : "No Table Selected"}</h2>
        </div>

        {/* Table */}
        <div className="table-container">
          {/* Use CustomTable component */}
          <CustomTable columns={COLUMNS} data={tableData}/>
        </div>
      </div>

      {/* Right side */}
      <div className="right-side">
        <div className="dropdown-container">
          {/* Dropdown */}
          <select className="dropdown" value={selectedTable} onChange={handleDropdownChange}>
            <option value="">Select Table</option>
            <option value="Table1">Table 1</option>
            <option value="Table2">Table 2</option>

          </select>
        </div>
        <div className="static-picture">
          {/* Placeholder Image Will be an expandable image for the initial database schema*/}
          <img src="https://via.placeholder.com/300x200" alt="Static Picture" />
        </div>
      </div>
    </div>
  );
};

export default Results;
