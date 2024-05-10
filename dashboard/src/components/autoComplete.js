import React, { useEffect, useState } from "react";
import axios from "axios";

const Autocomplete = () => {
  const url_teams = "http://127.0.0.1:5000/api/teams";

  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(url_teams);
        setSuggestions(response1.data.teams);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []); 

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        required
      />
      {inputValue.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-700 mt-1 shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-300 text-sm p-2"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
