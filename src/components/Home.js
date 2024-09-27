import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const drugs = [
  { id: 1, name: 'Pharma Covigilance Officer', path: '/pv-agent' },
  { id: 2, name: 'Quality Review Associate', path: '/company-agent' },
  { id: 3, name: 'Medical Reviewer Officer', path: '/reviewer' },
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="video-background">
      <video autoPlay loop muted>
          <source src="/homepage_latest.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="company-name">
      <h1 className="company-name-title">ProcDNA</h1>
      <h2 className="company-name-subtitle">Pharmaceuticals</h2>
      </div>
      <div className="card-container">
      {drugs.map(drug => (
          <Link to={drug.path} key={drug.id} className="card">
            <h3>{drug.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
