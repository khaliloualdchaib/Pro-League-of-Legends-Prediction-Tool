import React, { useState } from "react";

const ChartTabs = ({ tabs, onChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onChange(tab);
  };

  const tabStyles = (tab) => {
    return tab === activeTab
      ? "inline-block px-4 py-3 text-white bg-blue-600 rounded-lg"
      : "inline-block px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white";
  };

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-400">
      {tabs.map((tab) => (
        <li className="me-2" key={tab}>
          <button
            className={tabStyles(tab)}
            onClick={() => handleTabClick(tab)}
            aria-current={tab === activeTab ? "page" : undefined}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChartTabs;
