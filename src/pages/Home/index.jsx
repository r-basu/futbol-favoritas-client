import ClubPins from "../../components/ClubPins";
import CompetitionDropdown from "../../components/CompetitionDropdown";
import TeamDropdown from "../../components/TeamDropdown";
import { useState, useEffect } from "react";

export default function Home(props) {
  // COMPETITIONS STATE
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState("");
  // CLUB STATE
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");

  // COMPETITION LOGIC
  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(
        "https://futbol-favoritas-server-9958536b1fa0.herokuapp.com/api/clubs/competitions"
      );
      const data = await response.json();
      setCompetitions(data);
    } catch (error) {
      console.log("Error fetching competitions:", error);
    }
  };

  // CLUB LOGIC
  useEffect(() => {
    fetchCompetitionTeams();
  }, [selectedCompetition]);

  const fetchCompetitionTeams = async () => {
    try {
      const response = await fetch(
        `https://futbol-favoritas-server-9958536b1fa0.herokuapp.com/api/clubs/competitionTeams/${selectedCompetition}`
      );
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.log("Error fetching clubs:", error);
    }
  };

  const handleClubChange = async (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedClubName = selectedOption.textContent;
    const selectedCompetitionId = selectedCompetition;
    const eTarget = event.target.value
    try {
      const response = await fetch("https://futbol-favoritas-server-9958536b1fa0.herokuapp.com/api/clubs/pins/club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
        body: JSON.stringify({
          selectedClubId: event.target.value,
          selectedClubName: selectedClubName,
          selectedCompetitionId: selectedCompetitionId
        }),
      });
      const data = await response.json();
      setSelectedClub(eTarget);
      console.log(eTarget)
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
    <div class="lg:flex lg:flex-row mb:flex mb:flex-col">
      <ClubPins selectedClub={selectedClub} />
      <div>
      <CompetitionDropdown
        competitions={competitions}
        selectedCompetition={selectedCompetition}
        handleCompetitionChange={handleCompetitionChange}
      />
       {selectedCompetition && (
        <TeamDropdown
          selectedCompetition={selectedCompetition}
          clubs={clubs}
          selectedClub={selectedClub}
          handleClubChange={handleClubChange}
        />
      )}
      </div>
    </div>
  );
}
