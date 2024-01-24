import React, { useEffect, useState } from 'react';

const ClubPage = () => {
  const [clubsData, setClubsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clubs/pins');
        const data = await response.json();
        setClubsData(data);
      } catch (error) {
        console.log('Error fetching club data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Club Page</h1>
      {clubsData.map((club, index) => (
        <div key={index}>
          <h2>{club.name}</h2>
          <p>Founded: {club.founded}</p>
          <p>Stadium: {club.venue}</p>
          {/* Add more club data as needed */}
        </div>
      ))}
    </div>
  );
};

export default ClubPage;
