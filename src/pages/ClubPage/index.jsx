import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ClubPage() {
  const { clubId, competitionId } = useParams();
  const [clubData, setClubData] = useState(null);
  const [clubSched, setClubSched] = useState(null);
  const [clubSchedLast, setClubSchedLast] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/clubs/club/${clubId}/${competitionId}`
        );
        const { apiClubData } = await response.json();
        setClubData(apiClubData);
      } catch (error) {
        console.log("Error fetching club data:", error);
      }
    };

    fetchClubData();
  }, [clubId]);

  useEffect(() => {
    const fetchClubSched = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/clubs/clubSched/${clubId}`
        );
        const data = await response.json();
        setClubSched(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching club schedule:", error);
      }
    };

    fetchClubSched();
  }, [clubId]);

  useEffect(() => {
    const fetchClubSchedLast = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/clubs/clubSchedLast/${clubId}`
        );
        const data = await response.json();
        setClubSchedLast(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching club schedule:", error);
      }
    };

    fetchClubSchedLast();
  }, [clubId]);

  if (!clubData || !clubSched || !clubSchedLast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={clubData.crest} alt="Club Crest" />
      <h1>{clubData.name}</h1>
      <p>Founded: {clubData.founded}</p>
      <p>Stadium: {clubData.venue}</p>
    </div>
    //   <p>Squad:</p>
    //   <ul>
    //     {clubData.squad.map((player) => (
    //       <li key={player.id}>
    //         {player.name} - {player.position}
    //       </li>
    //     ))}
    //   </ul>
    //   <p>Last 10 Matches:</p>
    //   <ul>
    //     {clubSchedLast.matches.map((match) => (
    //       <li key={match.id}>{match.competition.name} - {moment.utc(match.utcDate).local().format('YYYY-MM-DD')}</li>
    //     ))}
    //   </ul>
    //   <p>Upcoming Matches:</p>
    //   <ul>
    //     {clubSched.matches.map((match) => (
    //       <li key={match.id}>{match.competition.name} - {moment.utc(match.utcDate).local().format('YYYY-MM-DD')}</li>
    //     ))}
    //   </ul>
    //   {/* Add more club data as needed */}
    // </div>
  );
}
