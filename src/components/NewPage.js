import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NewPage.css'; // Import CSS file for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import handimg from './assets/handwriting.jpg';

const NewPage = () => {
  const location = useLocation();
  const { caseId, productName, fileName, fileType } = location.state || {};

  // Example dummy data for extracted adverse effects
  const [extractedAdvEff, setExtractedAdvEff] = useState([
    "bleeding", 
    "Gastro Bleeding", 
    "Bruising", 
    "Epistaxis", 
    "Nausea",
    "Vomitting",
    "Abdominal Discomfort",
    "Dizziness",
    "Headaches",
    "Mild Rash",
  ]);

  // Handle case where no data is available
  if (!location.state) {
    return <div>No data available</div>;
  }

  // Function to remove an adverse effect by index
  const handleRemoveAdvEff = (index) => {
    setExtractedAdvEff((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = () => {
    toast.success("Submitted successfully!"); // Show success message
  };

  return (
    <div className="new-page-container">
      <h1>Case Information</h1>
      <table className="info-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Product Name</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Extracted Adverse Effects</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{caseId}</td>
            <td>{productName}</td>
            <td>{fileName}</td>
            <td>{fileType}</td>
            <td>
            <div className="adv-eff-container">
  {extractedAdvEff.map((effect, index) => (
    <div className="adv-eff-item" key={index}>
      <div className="adv-eff-box">
        <span className="adv-eff-text">{effect}</span>
        <span className="remove-cross" onClick={() => handleRemoveAdvEff(index)}>×</span>
      </div>
    </div>
  ))}
</div>

            </td>
          </tr>
        </tbody>
      </table>
      <div className="button-container">
        <button className="review-submit-button" onClick={handleSubmit}>Review and Submit</button>
      </div>
      <div className='imgsa'>
      <img src={handimg} alt="Upload File" style={{ width: '1000px', height: '500px' , border: "10px solid grey"}} />
      </div>
      <ToastContainer /> {/* Toast Container for notifications */}
    </div>
    
    
  );
};

export default NewPage;





