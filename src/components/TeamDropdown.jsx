export default function TeamDropdown(props) {
  return (
    <div className="p-4 relative">
      <label htmlFor="club" className="block mb-2">
        Select a club to pin:
      </label>
      <select
        id="club"
        value={props.selectedClub}
        onChange={props.handleClubChange}
        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-dark-green focus:border-dark-green sm:text-sm"
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