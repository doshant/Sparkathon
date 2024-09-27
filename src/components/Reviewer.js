import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ToastContainer, toast } from 'react-toastify'; // Importing toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

// Initialize the toast notifications

const drugs = ["Eliquis", "Pomalyst", "Revlimid", "Opdivo"];
const severities = ["Serious", "Non-Serious"];
const effectsList = {
  Eliquis: ["Bleeding", "Nausea", "Dizziness", "Allergy"],
  Pomalyst: ["Fatigue", "Diarrhea", "Rash"],
  Revlimid: ["Constipation", "Weakness", "Infection"],
  Opdivo: ["Cough", "Itching", "Fever"],
};

// Function to generate random data
const generateRandomData = (numRows) => {
  const data = [];
  for (let i = 0; i < numRows; i++) {
    const drug = drugs[Math.floor(Math.random() * drugs.length)];
    const randomEffects = generateRandomEffects(drug);
    data.push({
      Drug: drug,
      Case: `Case ${i + 1}`,
      Date_Submitted: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      Severity: severities[Math.floor(Math.random() * severities.length)],
      Effects: randomEffects,
      Selected: false, // Initialize Selected field
    });
  }
  return data;
};

// Function to generate random effects for a specific drug
const generateRandomEffects = (drug) => {
  const effects = effectsList[drug];
  const randomEffects = new Set();
  const numEffects = Math.floor(Math.random() * effects.length) + 1;

  while (randomEffects.size < numEffects) {
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffects.add(randomEffect);
  }

  return Array.from(randomEffects).join(", ");
};

const Reviewer = () => {
  const [rowData, setRowData] = useState([]);
  const [view, setView] = useState("all");

  // Fetch data on mount
  useEffect(() => {
    setRowData(generateRandomData(50)); // Generate initial random data
  }, []);

  // Function to filter row data based on view selection
  const getFilteredRowData = () => {
    const today = new Date();
    const fifteenDaysAgo = new Date(today.setDate(today.getDate() - 15));
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    switch (view) {
      case "15_days":
        return rowData.filter(row => new Date(row.Date_Submitted) >= fifteenDaysAgo && row.Severity === "Serious");
      case "30_days":
        return rowData
          .filter(row => new Date(row.Date_Submitted) >= thirtyDaysAgo)
          .slice(0, 10); // Top 10 recent entries
      case "all":
      default:
        return rowData;
    }
  };

  const filteredRowData = getFilteredRowData();

  // Column Definitions
  const colDefs = [
    { field: "Drug" },
    { field: "Case" },
    { field: "Date_Submitted" , headerName: "Date Submitted" },
    { field: "Severity" },
    { field: "Effects" , headerName: "Adverse Effects",  flex: 1, },
    {
      field: "Add To Application",
      headerCheckboxSelection: true, // Adds a checkbox in the header
      checkboxSelection: true, // Adds a checkbox in each row
      editable: true, // Make it editable
      cellRenderer: 'agGroupCellRenderer', // Render checkboxes
    },
  ];

  // Function to handle the "Add to FDA Application" button click
  const handleAddToFDA = () => {
   
      toast.success('Successfully added to the FDA application!');
   

  };

  return (
    <div style={{ marginTop: 10, marginBottom: 20 }}>
      <nav style={{ margin: 10 }}>
        <button style={{ marginLeft: 10 }} onClick={() => setView("15_days")}>15 Days</button>
        <button style={{ marginLeft: 20 }} onClick={() => setView("30_days")}>30 Days</button>
        <button style={{ marginLeft: 20 }} onClick={() => setView("all")}>All Reviewed Data</button>
        <button onClick={handleAddToFDA} style={{ marginLeft: 1210 }}>
        Generate FDA Application
      </button>
      </nav>

      <div className="ag-theme-quartz" style={{}}>
        <AgGridReact
          rowData={filteredRowData}
          columnDefs={colDefs}
          domLayout='autoHeight'
        />
      </div>

      
      <ToastContainer /> 
    </div>
  );
};

export default Reviewer;
