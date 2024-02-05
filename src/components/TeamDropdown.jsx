export default function TeamDropdown(props) {
  return (
    <div class="p-4">
      <label class="p-4 text-xl font-medium" htmlFor="club">Select a club to pin:</label>
      <select class="font-medium"
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
