import LoginButton from "../../../components/LoginButton";
import CompetitionSearch from "./components/CompetitionSearch";

export default function HomePageLogin() {
    <div>
    <header>
      <LoginButton />
      <h1>Futbol Favoritas</h1>
    </header>
      <div>
        <h2>Top Players</h2> 
        <div>
           Items here:
           <ul>
           </ul>
        </div>
        <input type="text" placeholder="Player Search"></input>
      </div>
      <div>
        <h2>Top Clubs</h2> 
        <div>
           Items here:
           <ul>
           </ul>
        </div>
        <input type="text" placeholder="Club Search"></input>
      </div>
      <CompetitionSearch />
  </div>
};