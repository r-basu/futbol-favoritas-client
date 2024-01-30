import ClubPins from "../../components/ClubPins";
import CompetitionDropdown from "../../components/CompetitionDropdown";
import TeamDropdown from "../../components/TeamDropdown";

export default function Home(props) {
  return (
    <div>
      <h1>Home Page</h1>
      <ClubPins />
      <CompetitionDropdown />
      <TeamDropdown />
    </div>
  );
}
