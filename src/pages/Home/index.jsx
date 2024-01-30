import ClubPins from "../../components/ClubPins";
import CompetitionDropdown from "../../components/CompetitionDropdown";
import TeamDropdown from "../../components/TeamDropdown";
import { useState, useEffect } from "react";

export default function Home(props) {
  // COMPETITIONS STATE
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

  //CLUB STATE
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");

  useEffect(() => {
    fetchCompetitionTeams();
  }, [selectedCompetition]);

  const fetchCompetitionTeams = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/clubs/competitionTeams/${selectedCompetition}`
      );
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.log("Error fetching clubs:", error);
    }
  };

  const handleClubChange = async (event) => {
    setSelectedClub(event.target.value);
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedClubName = selectedOption.textContent;
    try {
      const response = await fetch("http://localhost:3000/api/clubs/dbClubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
        body: JSON.stringify({
          selectedClubId: event.target.value,
          selectedClubName: selectedClubName,
        }),
      });
      const data = await response.json();
      console.log("Result:", data);
      // Handle the response from the backend as needed
    } catch (error) {
      console.log("Error creating club:", error);
    }
  };

  const handleCompetitionChange = async (event) => {
    setSelectedCompetition(event.target.value);
  };
  return (
    <div>
      <h1>Home Page</h1>
      <ClubPins selectedClub={selectedClub} />
      <CompetitionDropdown
        competitions={competitions}
        selectedCompetition={selectedCompetition}
        handleCompetitionChange={handleCompetitionChange}
      />
      <TeamDropdown
        selectedCompetition={selectedCompetition}
        clubs={clubs}
        selectedClub={selectedClub}
        handleClubChange={handleClubChange}
      />
    </div>
  );
}
