import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ClubPage(props) {
  const [clubsData, setClubsData] = useState([]);
  const [showAllClubs, setShowAllClubs] = useState(false);

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

  const toggleShowAllClubs = () => {
    setShowAllClubs(!showAllClubs);
  };

 return (
  <div className="flex bg-green-200 p-4">
    <table className="text-center">
      <thead>
        <tr>
          <th className="flex items-center justify-between">
            <div className="text-2xl">Pinned Clubs:</div>
            {clubsData.length > 3 && (
              <button
                onClick={toggleShowAllClubs}
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {showAllClubs ? "Show Less Clubs" : "Show All Clubs"}
              </button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {clubsData
          .slice(0, showAllClubs ? clubsData.length : 3)
          .map((club) => (
            <tr key={club.dbClubId}>
              <td className="p-4">
                <Link
                  to={`/clubs/${club.dbClubId}/${club.dbCompetitionId}`}
                  className="text-lg font-medium text-blue-500 hover:text-blue-700"
                >
                  {club.dbClubName}
                </Link>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDelete(club.dbClubId)}
                  className="text-lg border-2 border-black w-10 bg-red-600 text-white rounded-xl"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)}