export default function CompetitionDropdown(props) {
  return (
    <div class="p-4">
      <label htmlFor="competition">
        Select a competition to choose your team from to pin:
      </label>
      <select
        id="competition"
        value={props.selectedCompetition}
        onChange={props.handleCompetitionChange}
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
