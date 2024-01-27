import React, { useEffect, useState } from 'react';

export default function ClubPage(props) {
  const [clubsData, setClubsData] = useState([]);
  console.log(props)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clubs/pins', {
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('id_token')}`
          }
        });
        console.log(localStorage.getItem('id_token'))
        console.log("token from clubpage")
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
      <h1>Pinned Clubs:</h1>
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


