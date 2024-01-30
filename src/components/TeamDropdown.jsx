import React, { useState, useEffect, useContext } from "react";
import { CompetitionDropdown } from "./CompetitionDropdown"

export default function TeamDropdown() {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");

  const { selectedCompetition } = useContext(CompetitionDropdown)

  useEffect(() => {
    fetchCompetitionTeams();
  }, [selectedCompetition]);

  const fetchCompetitionTeams = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/clubs/competitionTeams/${selectedCompetition}`);
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.log("Error fetching clubs:", error);
    }
  };

  const handleClubChange = async (event) => {
    setSelectedClub(event.target.value);
    try {
      const response = await fetch("http://localhost:3000/api/clubs/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
        body: JSON.stringify({ selectedClub: event.target.value }),
      });
      const data = await response.json();
      console.log("Result:", data);
      // Handle the response from the backend as needed
    } catch (error) {
      console.log("Error creating club:", error);
    }
  };

  return (
    <div>
      <label htmlFor="club">Select a club to pin:</label>
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
