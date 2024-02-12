import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./style.css";
import ScrollToTop from 'react-scroll-to-top';

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
      <tr key={position} className={teamIcon === clubData.crest ? "bg-yellow-200" : ""}>
        <td>{position}</td>
        <td>
          <img
            src={teamIcon}
            alt={teamName}
            style={{ "min-width": "50px", "min-height": "50px" }}
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
<div className="mt-5">
  <div className="flex justify-center">
    <img src={clubData.crest} alt="Club Crest" className="w-30 h-30" />
    <ScrollToTop
        smooth
        color="#000"
        top={100}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '@media (min-width: 320px)': {
            justifyContent: 'flex-start',
            paddingLeft: '10px', 
          },
          animation: 'bounce 1s infinite alternate',
          '@keyframes bounce': {
            '0%': { transform: 'translateY(-5px)' },
            '100%': { transform: 'translateY(5px)' },
          },
        }}
       
      />
  </div>
  <h1 className="text-xl text-center">{clubData.name}</h1>
  <p className="text-center">Founded: {clubData.founded}</p>
  <p className="text-center">Stadium: {clubData.venue}</p>
  <div className="lg:flex lg:justify-center lg:items-start lg:flex-row sm:flex sm:flex-col sm:justify-center sm:items-center">
  <table className="lg:w-1/4 sm:w-1/4 mb-4 sm:mb-0 mb:mx-auto lg:mx-10">
    <thead>
      <tr>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Position</th>
      </tr>
    </thead>
    <tbody>
      {clubData.squad.map((player) => (
        <tr key={player.id} className="text-center">
          <td className="border px-4 py-2">{player.name}</td>
          <td className="border px-4 py-2">{player.position}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div>
  <table className="lg:w-full sm:w-1/2 sm:mx-auto mb:w-1/4 mb:mx-auto lg:mx-10 mb:text-xs lg:text-lg">
    <caption className="text-center">Last 10 Matches</caption>
    <thead>
      <tr>
        <th>Date</th>
        <th>Competition</th>
        <th>Home Team</th>
        <th>Away Team</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {clubSchedLast.matches.map((match) => (
        <tr key={match.id}>
          <td>{moment.utc(match.utcDate).local().format("YYYY-MM-DD")}</td>
          <td><img src={match.competition.emblem} alt="Competition Emblem" className="lg:h-20 lg:w-20 mb:w-min-6 inline-block" /></td>
          <td>{match.homeTeam.name}</td>
          <td>{match.awayTeam.name}</td>
          <td>{match.score.fullTime.home} - {match.score.fullTime.away}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <table className="lg:w-full sm:w-1/2 mx-auto lg:mx-10 mt-4 mb:w-1/4 mb:text-xs lg:text-lg">
    <caption className="text-center">Upcoming Matches</caption>
    <thead>
      <tr>
        <th>Date</th>
        <th>Competition</th>
        <th>Home Team</th>
        <th>Away Team</th>
      </tr>
    </thead>
    <tbody>
      {clubSched.matches.map((match) => (
        <tr key={match.id}>
          <td>{moment.utc(match.utcDate).local().format("YYYY-MM-DD")}</td>
          <td><img src={match.competition.emblem} alt="Competition Emblem" className="lg:w-20 lg:h-20 mb:w-min-6 inline-block" /></td>
          <td>{match.homeTeam.name}</td>
          <td>{match.awayTeam.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  {/* STANDINGS TABLE */}
  <h1 className="lg:text-xl text-center">Standings:</h1>
  <p className="text-center">Current Matchday: {clubStandings.season.currentMatchday}</p>
  <table className="lg:text-lg mb:text-xs mx-auto mb:w-1/2">
    <thead>
      <tr>
        <th className="lg:px-4 lg:py-2">Pos</th>
        <th className="lg:px-4 lg:py-2">Club</th>
        <th className="lg:px-4 lg:py-2">Pts</th>
        <th className="lg:px-4 lg:py-2">PG</th>
        <th className="lg:px-4 lg:py-2">W</th>
        <th className="lg:px-4 lg:py-2">L</th>
        <th className="lg:px-4 lg:py-2">D</th>
        <th className="lg:px-4 lg:py-2">GF</th>
        <th className="lg:px-4 lg:py-2">GA</th>
        <th className="lg:px-4 lg:py-2">GD</th>
      </tr>
    </thead>
    <tbody>{tableRows}</tbody>
  </table>
</div>
)}