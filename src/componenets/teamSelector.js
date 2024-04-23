import React from "react";

const TeamSelector = () => {
  return (
    <div class="flex flex-row p-3">
      <div class="basis-1/2">
        <form class="max-w-sm mx-auto">
          <label for="countries" class="block mb-2 text-sm font-medium">
            Select blue side team
          </label>
          <select
            id="countries"
            class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>Choose a Team</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
      </div>
      <div class="basis-1/2">
        <form class="max-w-sm mx-auto">
          <label for="countries" class="block mb-2 text-sm font-medium">
            Select Red side team
          </label>
          <select
            id="countries"
            class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>Choose a Team</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default TeamSelector;
