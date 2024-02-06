export default function TeamDropdown(props) {
  return (
    <div class="p-4">
      <label htmlFor="club">Select a club to pin:</label>
      <select
        id="club"
        value={props.selectedClub}
        onChange={props.handleClubChange}
      >
        <option value="">Select</option>
        {props.clubs.map((club) => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>
    </div>
  );
}
