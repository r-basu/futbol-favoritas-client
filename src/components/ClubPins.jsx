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
  <div className="lg:flex bg-light-green lg:p-4 lg:justify-center lg:w-2/5 min-width-10">
    <div className="overflow-y-auto max-h-80 pr-10">
      <table className="text-center w-auto">
        <thead>
          <tr>
            <div className="text-2xl"></div>
          </tr>
        </thead>
        <tbody>
          {clubsData.map((club) => (
            <tr key={club.dbClubId}>
              <td className="p-4">
                <Link
                  to={`/clubs/${club.dbClubId}/${club.dbCompetitionId}`}
                  className="text-lg font-medium text-black hover:text-white-green"
                >
                  {club.dbClubName}
                </Link>
              </td>
              <td className="p-4 pl-20">
                <button
                  className="bg-dark-green hover:bg-black-green text-white-green font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(club.dbClubId)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)};