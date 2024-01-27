import React, { useState, useEffect } from "react";

function CompetitionDropdownForm() {
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

  //CREATE handleChange function and add to return

  return (
    <div>
      <label htmlFor="competition">
        Select a competition to choose your team from to pin:
      </label>
      <select id="competition" value={selectedCompetition}>
        <option value="">Select</option>
        {competitions.map((competition) => (
          <option key={competition.id} value={competition.id}>
            {competition.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CompetitionDropdownForm;
