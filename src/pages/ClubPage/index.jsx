import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./style.css";

export default function ClubPage() {
  const { clubId, competitionId } = useParams();
  const [clubData, setClubData] = useState(null);
  const [clubStandings, setClubStandings] = useState();
  const [clubSched, setClubSched] = useState(null);
  const [clubSchedLast, setClubSchedLast] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/clubs/club/${clubId}/${competitionId}`
        );
        const { apiClubData, apiStandingsData } = await response.json();
        setClubData(apiClubData);
        setClubStandings(apiStandingsData);
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

  if (!clubData || !clubStandings || !clubSched || !clubSchedLast) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '1000px',
        }}
      >
        <i
          className="fas fa-futbol"
          style={{
            animation: 'spin 2s infinite linear',
            fontSize: '5rem',
          }}
        ></i>
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    );
  }

  // STANDINGS DATA
  const standingsTableData = clubStandings.standings[0].table;

  const tableRows = standingsTableData.map((row) => {
    const position = row.position;
    const teamIcon = row.team.crest;
    const teamName = row.team.tla;
    const points = row.points;
    const playedGames = row.playedGames;
    const won = row.won;
    const lost = row.lost;
    const draw = row.draw;
    const goalsFor = row.goalsFor;
    const goalsAgainst = row.goalsAgainst;
    const goalDifference = row.goalDifference;

    return (
      <tr key={position}>
        <td>{position}</td>
        <td>
          <img
            src={teamIcon}
            alt={teamName}
            style={{ width: "50px", height: "50px" }}
          />{" "}
          {teamName}
        </td>
        <td>{points}</td>
        <td>{playedGames}</td>
        <td>{won}</td>
        <td>{lost}</td>
        <td>{draw}</td>
        <td>{goalsFor}</td>
        <td>{goalsAgainst}</td>
        <td>{goalDifference}</td>
      </tr>
    );
  });

  return (
  <div>
    <div className="justify-center">
      <img src={clubData.crest} alt="Club Crest" />
    </div>
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
          <img src={match.competition.emblem} alt="Competition Emblem" /> -{" "}
          {moment.utc(match.utcDate).local().format("YYYY-MM-DD")} - Home:{" "}
          {match.homeTeam.name}:{match.score.fullTime.home} Away:{" "}
          {match.awayTeam.name}:{match.score.fullTime.away}{" "}
        </li>
      ))}
    </ul>
    <p>Upcoming Matches:</p>
    <ul>
      {clubSched.matches.map((match) => (
        <li key={match.id}>
          <img src={match.competition.emblem} alt="Competition Emblem" /> -{" "}
          {moment.utc(match.utcDate).local().format("YYYY-MM-DD")}- Home:{" "}
          {match.homeTeam.name} Away: {match.awayTeam.name}
        </li>
      ))}
    </ul>
    {/* STANDINGS TABLE */}
    <h1>Standings:</h1>
    <p>Current Matchday: {clubStandings.season.currentMatchday}</p>
    <table>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Club</th>
          <th>Pts</th>
          <th>PG</th>
          <th>W</th>
          <th>L</th>
          <th>D</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  </div>
)};