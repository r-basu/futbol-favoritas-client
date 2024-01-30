import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ClubPage(props) {
  const [clubsData, setClubsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clubs/pins", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          },
        });
        console.log(localStorage.getItem("id_token"));
        console.log("token from localstorage");
        const data = await response.json();
        setClubsData(data);
      } catch (error) {
        console.log("Error fetching club data:", error);
      }
    };

    fetchData();
  }, [props.selectedClub]);

  useEffect(() => {
    const fetchUpdatedData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/clubs/pins",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("id_token")}`,
            },
          }
        );
        const data = await response.json();
        setClubsData(data);
      } catch (error) {
        console.log("Error fetching updated club data:", error);
      }
    };

    const interval = setInterval(() => {
      fetchUpdatedData();
    }, 1000); // Fetch updated data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pinned Clubs:</th>
          </tr>
        </thead>
        <tbody>
          {clubsData.map((club) => (
            <tr key={club.dbClubId}>
              <td>
                <Link to={`/clubs/${club.dbClubId}`}>{club.dbClubName}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
