import React, { useState, useEffect } from 'react';

function DropdownForm() {
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState('');
  
    useEffect(() => {
      fetchClubs();
    }, []);
  
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clubs');
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.log('Error fetching clubs:', error);
      }
    };
  
    const handleClubChange = (event) => {
      setSelectedClub(event.target.value);
    };
  
    return (
      <div>
        <label htmlFor="club">Select a club:</label>
        <select id="club" value={selectedClub} onChange={handleClubChange}>
          <option value="">Select</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  export default DropdownForm;