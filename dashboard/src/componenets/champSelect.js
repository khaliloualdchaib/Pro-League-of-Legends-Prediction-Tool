import { extractItemsFromCSV } from "../data/data"; // Adjust the path as needed

const ChampSelect = ({ team }) => {
  const csvFilePath = "../data/teams.csv";
  const columnIndex = 3; // Change this to the index of your column containing items

  extractItemsFromCSV(csvFilePath, columnIndex, (err, items) => {
    if (err) {
      console.error("Error reading CSV file:", err);
    } else {
      console.log("Extracted items:", items);
    }
  });

  const championList = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Akshan",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "Aurelion Sol",
    "Azir",
  ];
  const teamlist = ["team1", "team2", "team3", "team4"];
  return (
    <form className="max-w-sm mx-auto">
      <div className="flex flex-col ...">
        <label for="countries" class="block mb-2 text-sm font-medium">
          Select {team} side
        </label>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
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
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Toplaner
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Jungle
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Midlaner
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose ADC
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="countries"
            className="w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Support
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default ChampSelect;
