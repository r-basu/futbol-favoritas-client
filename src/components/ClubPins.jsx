import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

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
        console.log("token from clubpage");
        const data = await response.json();
        setClubsData(data);
      } catch (error) {
        console.log("Error fetching club data:", error);
      }
    };

    fetchData();
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
          {clubsData.map((club, index) => (
            <tr key={index}>
              <td>
                <Link to={`/clubs/${club.id}`}>{club.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
