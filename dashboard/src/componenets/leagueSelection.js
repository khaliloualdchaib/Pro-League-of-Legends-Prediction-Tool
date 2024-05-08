const LeagueSelection = () => {
  const leagues = ["l1", "l2", "l3", "l4"];
  return (
    <select
      id="countries"
      className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    >
      <option selected disabled>
        Choose a League
      </option>
      {leagues.map((Name) => (
        <option key={Name} value={Name}>
          {Name}
        </option>
      ))}
    </select>
  );
};

export default LeagueSelection;
