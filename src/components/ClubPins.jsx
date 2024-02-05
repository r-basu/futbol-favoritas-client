import { useEffect, useState } from "react";
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

  const handleDelete = async (clubId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/clubs/pins/club/${clubId}`,
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
    <div className="flex bg-green-200 p-4">
      <table className="text-center">
        <thead>
          <tr>
            <th className="text-2xl">Pinned Clubs:</th>
          </tr>
        </thead>
        <tbody>
          {clubsData.map((club) => (
            <tr key={club.dbClubId}>
              <td class="p-4">
                <Link to={`/clubs/${club.dbClubId}`} className="text-lg font-medium">
                  {club.dbClubName}
                </Link>
              </td>
              <td class="p-4">
                <button
                  onClick={() => handleDelete(club.dbClubId)}
                  className="text-lg border-2 border-black w-10 bg-red-600 text-white rounded-xl"
                >-
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
