import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast

// Define drugs and effects
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
    const randomEffects = generateRandomEffects(drug); // Generate random effects based on the drug
    data.push({
      Drug: drug,
      Case: `Case ${i + 1}`,
      Date_Submitted: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      Severity: severities[Math.floor(Math.random() * severities.length)],
      Selected: false,
      Effects: randomEffects, // Store the generated effects
    });
  }
  return data;
};

// Function to generate random effects for a specific drug
const generateRandomEffects = (drug) => {
  const effects = effectsList[drug];
  const randomEffects = new Set();
  const numEffects = Math.floor(Math.random() * effects.length) + 1; // Random number of effects (1 to all)

  while (randomEffects.size < numEffects) {
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffects.add(randomEffect);
  }

  return Array.from(randomEffects).join(", "); // Return as a comma-separated string
};

const CompanyAgent = () => {
  const [rowData, setRowData] = useState(generateRandomData(100)); // Generate 100 random rows
  const [filteredDrug, setFilteredDrug] = useState("");
  const [dateRange, setDateRange] = useState("");

  // Function to check if the date matches the selected range
  const filterByDate = (dateSubmitted) => {
    const today = new Date();
    const submittedDate = new Date(dateSubmitted);
    const diffTime = Math.abs(today - submittedDate); // Calculate difference in time

    switch (dateRange) {
      case "15_days":
        return diffTime <= 15 * 24 * 60 * 60 * 1000; // Last 15 days
      case "30_days":
        return diffTime <= 30 * 24 * 60 * 60 * 1000; // Last 30 days
      case "60_days":
        return diffTime <= 60 * 24 * 60 * 60 * 1000; // Last 60 days
      case "90_days":
        return diffTime <= 90 * 24 * 60 * 60 * 1000; // Last 90 days
      case "1_year":
        return diffTime <= 365 * 24 * 60 * 60 * 1000; // Last 1 year
      default:
        return true; // No date filter applied
    }
  };

  // Filtered row data based on user input
  const filteredRowData = rowData.filter(row => {
    const matchesDrug = filteredDrug ? row.Drug === filteredDrug : true;
    const matchesDate = filterByDate(row.Date_Submitted); // Apply date filter
    return matchesDrug && matchesDate;
  });

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    { field: "Drug" },
    { field: "Case" },
    { field: "Date_Submitted" , headerName: "Date Submitted" },
    { field: "Severity" },
    {
      field: "Effects", // New column for effects
      headerName: "Adverse Effects", editable: true, // Ensure header name is set
      flex: 1, // To allow column to take available space
    },
    {
      field: "Selected",headerName: "Selected for Review", editable: true,
      cellRenderer: (params) => (
        <input
          type="checkbox"
          checked={params.data.Selected} // Accessing Selected from params.data
          onChange={() => handleToggleSelection(params.rowIndex)} // Correctly referencing row index
        />
      ),
    },
  ];

  // Function to toggle selection state
  const handleToggleSelection = (index) => {
    const updatedRowData = [...rowData];
    if (updatedRowData[index]) {
      updatedRowData[index].Selected = !updatedRowData[index].Selected; // Toggle selected state
      setRowData(updatedRowData); // Update the state with new row data
    }
  };

  // Function to handle drug filter change
  const handleDrugFilterChange = (event) => {
    setFilteredDrug(event.target.value);
  };

  // Function to handle date filter change
  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  // Function to show toast notification
  const showToast = () => {
    toast.success("Data submitted successfully!");
  };

  return (
    <div style={{ marginTop: 10, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: 10 }}>
        <select 
          value={filteredDrug} 
          onChange={handleDrugFilterChange}
          style={{ marginLeft: 10,padding: '8px', marginRight: '10px' }}
        >
          <option value="">All Drugs</option>
          {drugs.map((drug, index) => (
            <option key={index} value={drug}>{drug}</option>
          ))}
        </select>

        <select 
          value={dateRange} 
          onChange={handleDateRangeChange}
          style={{ marginLeft: 20,padding: '8px' }}
        >
          <option value="">All Dates</option>
          <option value="15_days">Last 15 Days</option>
          <option value="30_days">Last 30 Days</option>
          <option value="60_days">Last 60 Days</option>
          <option value="90_days">Last 90 Days</option>
          <option value="1_year">Last 1 Year</option>
        </select>
        
        {/* Show toast when data is "submitted" */}
        <button 
          onClick={showToast}
          style={{ marginLeft: 'auto', padding: '8px' , marginRight:20 }}
        >
          Submit Reviewed Application
        </button>
      </div>

      <div
        className="ag-theme-quartz" // Applying the Data Grid theme
        style={{ height: 500 }} // The Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={filteredRowData} // Use filtered row data
          columnDefs={colDefs}
          domLayout='autoHeight' // Adjusts height automatically based on row count
        />
      </div>
      <ToastContainer /> {/* Toast Container for notifications */}
    </div>
  );
};

export default CompanyAgent;
