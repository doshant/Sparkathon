import React from 'react';
import { useParams } from 'react-router-dom';

const DrugDashboard = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h2>Drug Dashboard for Drug ID: {id}</h2>
      {/* Display drug data here */}
    </div>
  );
};

export default DrugDashboard;
