const Radio = ({ options }) => {
    return (
      <ul className="items-center w-full text-sm font-medium border rounded-lg sm:flex bg-gray-700 border-gray-600 text-white">
        {options.map((option, index) => (
          <li key={index} className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id={`horizontal-list-radio-${index}`}
                type="radio"
                value={option.value} // Assuming each option has a value property
                name="list-radio"
                className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
              />
              <label
                htmlFor={`horizontal-list-radio-${index}`}
                className="w-full py-3 ms-2 text-sm font-medium text-gray-300"
              >
                {option}
              </label>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  export default Radio
  