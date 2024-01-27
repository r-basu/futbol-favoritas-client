import ClubPins from "../../components/ClubPins";
import CompetitionDropdownForm from "../../components/CompetitionSearch";
import DropdownForm from "../../components/DropdownForm";

export default function Home(props) {
  return (
    <div>
      <h1>Home Page</h1>
      <ClubPins />
      <CompetitionDropdownForm />
      <DropdownForm />
    </div>
  );
}
