import React, { useState, useEffect } from "react";

export default function CompetitionDropdown() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState("");

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/clubs/competitions"
      );
      const data = await response.json();
      setCompetitions(data);
    } catch (error) {
      console.log("Error fetching clubs:", error);
    }
  };

  const handleCompetitionChange = async (event) => {
    setSelectedCompetition(event.target.value);
  };

  return (
    <div>
      <label htmlFor="competition">
        Select a competition to choose your team from to pin:
      </label>
      <select
        id="competition"
        value={selectedCompetition}
        onChange={handleCompetitionChange}
      >
        <option value="">Select</option>
        {competitions.map((competition) => (
          <option
            key={competition.apiCompetitionId}
            value={competition.apiCompetitionId}
          >
            {competition.apiCompetitionName}
          </option>
        ))}
      </select>
    </div>
  );
}
