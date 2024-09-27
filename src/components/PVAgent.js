import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PVAgent.css'; // Import CSS file for styling
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadFileImage from './assets/document.png';
import uploadAudioImage from './assets/upload.png';
import uploadImageFile from './assets/photo.png';
import manualFormImage from './assets/registration.png';
import b1 from './assets/B1.png';
import b2 from './assets/B2.png';
import b3 from './assets/B3.jpg';
import b4 from './assets/B4.png';


const PVAgent = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [text, setText] = useState('');
  const toType = `Weelcome Pharma Covigilance Officer,\nPlease choose your product and the type of file.\nYour contribution is highly appreciated.\nThank You!`; // Text to type
  const typingSpeed = 50; // Speed of typing in ms
  const [selectedProduct, setSelectedProduct] = useState(''); // State for selected dropdown value
  const navigate = useNavigate();
  const cases = ['314141', '211412', '121313'];
  const [activeTile, setActiveTile] = useState(''); // State to track the active tile
  const productImages = {
    Eliquis: b1,
    Pomalyst: b2,
    Revlimid: b3,
    Opdivo: b4,
  };

  // Handle file uploads
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      type: file.type.split('/')[0] // Get the general file type (image, audio, etc.)
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Handle form submission for manual input
 
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < toType.length) {
        setText((prev) => prev + toType.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [toType]);

  const handleSubmit = () => {
    const fileName = uploadedFiles.length > 0 ? uploadedFiles[0].name : 'No file uploaded'; // Example logic for filename
    const fileType = uploadedFiles.length > 0 ? uploadedFiles[0].type : 'N/A';

    navigate('/Review', {
      state: {
        caseId: selectedProduct,  // Selected case ID from dropdown
        productName: activeTile,   // Use the active tile name
        fileName,
        fileType,
      },
    }); // Change the path to your new page
  };

  const handleTileClick = (product) => {
    setActiveTile(product); // Set the clicked tile as active
  };

  return (
    <div className='whole'>
      <ToastContainer /> {/* Add ToastContainer for notifications */}

      {/* Typing Animation Section */}
      <div className="typing-animation">
        <pre>{text}</pre> {/* pre tag will maintain line breaks */}
      </div>

      {/* Dropdown and Submit Section */}
      <div className="form-section">
        <div className="left-dropdown">
          <select onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct}>
            <option value="">Select an Existing Case ID</option> {/* Placeholder option */}
            {cases.map((caseId, index) => (
              <option key={index} value={caseId}>{caseId}</option>
            ))}
          </select>
          <input className="left-sub" type='text' name="fileName" placeholder='Enter New Case ID' />
        </div>
        <div className="right-submit">
          <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>Submit</button>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="upload-section">
        {/* Left Section with Named Tiles */}
        <div className="left-section">
          <h2 className="section-title">Choose Your Product</h2>
          <div className="left-tiles">
  {['Eliquis', 'Pomalyst', 'Revlimid', 'Opdivo'].map((product, index) => (
    <div
      className={`tile1 ${activeTile === product ? 'active' : ''}`} // Apply active class
      key={index}
      onClick={() => handleTileClick(product)}
    >
      <img src={productImages[product]} alt={product} className="product-image" />
      {/* Optionally add a hidden name for accessibility */}
      <span className="product-name">{product}</span>
    </div>
  ))}
</div>

        </div>

        {/* Right Section for Uploading Functionality */}
        <div className="right-section">
<h2 className="section-title">Upload Your Data</h2>
<div className="right-tiles">
<div className="tile" onClick={() => document.getElementById('fileUpload').click()}>
<input id="fileUpload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
<img src={uploadFileImage} alt="Upload File" style={{ width: '50px', height: '50px' }} />
<p>Upload File</p>
</div>
<div className="tile" onClick={() => document.getElementById('audioUpload').click()}>
<input id="audioUpload" type="file" accept="audio/*" onChange={handleFileUpload} style={{ display: 'none' }} />
<img src={uploadAudioImage} alt="Upload Audio" style={{ width: '50px', height: '50px' }} />
<p>Upload Audio File</p>
</div>
<div className="tile" onClick={() => document.getElementById('imageUpload').click()}>
<input id="imageUpload" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
<img src={uploadImageFile} alt="Upload Image" style={{ width: '50px', height: '50px' }} />
<p>Upload Image</p>
</div>
<div className="tile">
<img src={manualFormImage} alt="Manual Form" style={{ width: '50px', height: '50px', marginBottom: '8px' }} />
<p>Fill Manually</p>
</div>
          </div>
        </div>
      </div>

      {/* Uploaded Files Section */}
      <div className="uploaded-files">
        <h2>Uploaded Files:</h2>
        {uploadedFiles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Type</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default PVAgent;
