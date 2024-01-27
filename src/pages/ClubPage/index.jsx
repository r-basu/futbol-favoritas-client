import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ClubPage() {
  const { id } = useParams();
  const [clubData, setClubData] = useState(null);
  console.log(id)

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/clubs/${id}`);
        const data = await response.json();
        setClubData(data);
      } catch (error) {
        console.log("Error fetching club data:", error);
      }
    };

    fetchClubData();
  }, [id]);

  if (!clubData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{clubData.name}</h1>
      <p>Founded: {clubData.founded}</p>
      <p>Stadium: {clubData.venue}</p>
      {/* Add more club data as needed */}
    </div>
  );
}
