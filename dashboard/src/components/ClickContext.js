import React, { createContext, useState } from "react";

export const ClickContext = createContext();

const ClickProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <ClickContext.Provider value={{ isClicked, setIsClicked }}>
      {children}
    </ClickContext.Provider>
  );
};

export default ClickProvider