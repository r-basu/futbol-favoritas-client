import LoginButton from "../../../components/LoginButton";
import CompetitionSearch from "./components/CompetitionSearch";

export default function CompetitionPageLogin() {
    <div>
    <header>
      <LoginButton />
      <h1>Competition Name</h1>
    </header>
      <div>
        <h2>Matches Remaining:</h2> 
        <div>
           Items here:
           <ul>
           </ul>
        </div>
      </div>
      <div>
        <h2>League Table:</h2>
        <div>
           Items here:
           <ul>
           </ul>
        </div>
      </div>
      <div>
        <h2>Upcoming Games:</h2>
        <div>
           Items here:
           <ul>
           </ul>
        </div>
      </div>
      <CompetitionSearch />
  </div>
};