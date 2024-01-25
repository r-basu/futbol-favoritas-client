import LogoutButton from "../../components/LogoutButton";
import CompetitionSearch from "./components/CompetitionSearch";

export default function HomePageLogout() {
    <div>
    <header>
      <LogoutButton />
      <h1>Futbol Favoritas</h1>
    </header>
      <p>Favorites</p>
      <div>
        <h2>Pinned Players</h2> 
        <div>
           Items here:
           <ul>
           </ul>
        </div>
        <input type="text" placeholder="Player Search"></input>
      </div>
      <div>
        <h2>Pinned Clubs</h2> 
        <div>
           Items here:
           <ul>
           </ul>
        </div>
        <input type="text" placeholder="Club Search"></input>
      </div>
      <div>
        <h2>Feed:</h2>
      </div>
      <div>
        <h2>Upcoming Games:</h2>
      </div>
      <CompetitionSearch />
  </div>
};