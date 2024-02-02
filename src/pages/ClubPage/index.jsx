import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from 'moment';

export default function ClubPage() {
  const { id } = useParams();
  const [clubData, setClubData] = useState(null);
  const [clubSched, setClubSched] = useState(null);
  const [clubSchedLast, setClubSchedLast] = useState(null);


  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/clubs/club/${id}`
        );
        const data = await response.json();
        setClubData(data);
      } catch (error) {
        console.log("Error fetching club data:", error);
      }
    };

    fetchClubData();
  }, [id]);

  useEffect(() => {
    const fetchClubSched = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/clubs/clubSched/${id}`);
        const data = await response.json();
        setClubSched(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching club schedule:", error);
      }
    };

    fetchClubSched();
  }, [id]);

  useEffect(() => {
    const fetchClubSchedLast = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/clubs/clubSchedLast/${id}`);
        const data = await response.json();
        setClubSchedLast(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching club schedule:", error);
      }
    };

    fetchClubSchedLast();
  }, [id]);

  if (!clubData || !clubSched || !clubSchedLast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={clubData.crest} alt="Club Crest" />
      <h1>{clubData.name}</h1>
      <p>Founded: {clubData.founded}</p>
      <p>Stadium: {clubData.venue}</p>
      <p>Squad:</p>
      <ul>
        {clubData.squad.map((player) => (
          <li key={player.id}>
            {player.name} - {player.position}
          </li>
        ))}
      </ul>
      <p>Last 10 Matches:</p>
      <ul>
        {clubSchedLast.matches.map((match) => (
          <li key={match.id}>
            <img src ={match.competition.emblem}></img> - {moment.utc(match.utcDate).local().format('YYYY-MM-DD')} - Home: {match.homeTeam.name}:{match.score.fullTime.home} Away: {match.awayTeam.name}:{match.score.fullTime.away} </li>
        ))}
      </ul>
      <p>Upcoming Matches:</p>
      <ul>
        {clubSched.matches.map((match) => (
          <li key={match.id}> <img src ={match.competition.emblem}></img> - {moment.utc(match.utcDate).local().format('YYYY-MM-DD')}- Home: {match.homeTeam.name} Away: {match.awayTeam.name}</li>
        ))}
      </ul>
      {/* Add more club data as needed */}
    </div>
  );
}
