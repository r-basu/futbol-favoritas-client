import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ClubPage(props) {
  const [clubsData, setClubsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://futbol-favoritas-server-9958536b1fa0.herokuapp.com/api/clubs/pins", {
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
        const response = await fetch("https://futbol-favoritas-server-9958536b1fa0.herokuapp.com/api/clubs/pins", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          },
        });
        const data = await response.json();
        setClubsData(data);
      } catch (error) {
        console.log("Error fetching updated club data:", error);
      }
    };

    const interval = setInterval(() => {
      fetchUpdatedData();
    }, 1000); // Fetch updated data every 1 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (clubId) => {
    try {
      const response = await fetch(
        `https://futbol-favoritas-server-9958536b1fa0.herokuapp.com/api/clubs/pins/club/${clubId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          },
        }
      );
      if (response.ok) {
        // Remove the deleted club from the clubsData state
        setClubsData(clubsData.filter((club) => club.dbClubId !== clubId));
      } else {
        console.log("Error deleting club:", response.status);
      }
    } catch (error) {
      console.log("Error deleting club:", error);
    }
  };

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
              <td>
                <button onClick={() => handleDelete(club.dbClubId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
