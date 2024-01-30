import ClubPins from "../../components/ClubPins";
import CompetitionDropdown from "../../components/CompetitionDropdown";
import TeamDropdown from "../../components/TeamDropdown";
import { useState, useEffect } from "react";

export default function Home(props) {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState("");

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/clubs/competitions"
      );
      const data = await response.json();
      setCompetitions(data);
    } catch (error) {
      console.log("Error fetching competitions:", error);
    }
  };

  const handleCompetitionChange = async (event) => {
    setSelectedCompetition(event.target.value);
  };
  return (
    <div>
      <h1>Home Page</h1>
      <ClubPins />
      <CompetitionDropdown
        competitions={competitions}
        selectedCompetition={selectedCompetition}
        handleCompetitionChange={handleCompetitionChange}
      />
      <TeamDropdown selectedCompetition={selectedCompetition}/>
    </div>
  );
}
