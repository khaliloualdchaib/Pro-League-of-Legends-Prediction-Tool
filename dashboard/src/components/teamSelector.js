import RoleSelector from "./roleSelector";
const TeamSelector = () => {
  const teamlist = ["team1", "team2", "team3", "team4"];
  return (
    <form>
      <div className="flex flex-col">
        <div>
          <select className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            <option selected disabled>
              Choose a Team
            </option>
            {teamlist.map((Name) => (
              <option key={Name} value={Name}>
                {Name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="basis-1/10">
          <RoleSelector role={"Top"}></RoleSelector>
        </div>
        <div class="basis-1/10">
          <RoleSelector role={"Jungle"}></RoleSelector>
        </div>
        <div class="basis-1/10">
          <RoleSelector role={"Mid"}></RoleSelector>
        </div>
        <div class="basis-1/10">
          <RoleSelector role={"Bottom"}></RoleSelector>
        </div>
        <div class="basis-1/10">
          <RoleSelector role={"Support"}></RoleSelector>
        </div>
      </div>
    </form>
  );
};

export default TeamSelector;
