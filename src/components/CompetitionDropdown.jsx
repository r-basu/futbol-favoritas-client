export default function CompetitionDropdown(props) {
  return (
    <div className="p-4 relative">
      <label htmlFor="competition" className="block mb-2">
        Select a competition to choose your team from to pin:
      </label>
      <select
        id="competition"
        value={props.selectedCompetition}
        onChange={props.handleCompetitionChange}
        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-dark-green focus:border-dark-green sm:text-sm"
      >
        <option value="">Select</option>
        {props.competitions.map((competition) => (
          <option
            key={competition.apiCompetitionId}
            value={competition.apiCompetitionId}
          >
            {competition.apiCompetitionName}
          </option>
        ))}
      </select>
    </div>
  );
}