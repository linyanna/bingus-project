import React, { useState, useEffect } from "react";
import CustomTable from "./CustomTable";
import Modal from "react-modal";
import "../styles/results.css"; // Import the CSS file

const Results: React.FC = () => {
  // Define state variables
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [tableData, setTableData] = useState<any>({ nodes: [] }); // Initialize with empty nodes array
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Generate initial data
    generateData(selectedOption);
  }, [selectedOption]);

  const generateData = (selectedOption: string) => {
    // Your logic to generate data dynamically based on the selected option
    let nodes: any[] = [];

    if (selectedOption === "Suspects") {
      // Example data for Suspects
      nodes = [
        { name: "id", value: 'Int' },
        { name: "Name", value: 'String' },
        { name: "Age", value: 'Int' },
        { name: "Occupation", value: 'String' },
      ];
    } else if (selectedOption === "Clues") {
      // Example data for Clues
      nodes = [
        { name: "id", value: 'Int' },
        { name: "Description", value: 'String' },
        { name: "Location", value: 'String' },
        { name: "Type", value: 'String' },
      ];
    }

    setTableData({ nodes });
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

  // Define columns for the table
  const COLUMNS = [
    { label: "Name", renderCell: (item: any) => item.name },
    { label: "Value", renderCell: (item: any) => item.value },
  ];

  return (
    <div className="container2">
      <div className="left-side">
        {/* Title */}
        <div className="title">
          <h2>{selectedOption ? `${selectedOption}` : "No Option Selected"}</h2>
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
          <select className="dropdown" value={selectedOption} onChange={handleDropdownChange}>
            <option value="">Select Option</option>
            <option value="Suspects">Suspects</option>
            <option value="Clues">Clues</option>
          </select>
        </div>
        <div className="static-picture">
          {/* Placeholder Image Will be an expandable image for the initial database schema*/}
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
