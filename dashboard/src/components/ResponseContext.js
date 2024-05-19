import React, { createContext, useState } from 'react';

export const ResponseContext = createContext();

const ResponseProvider = ({ children }) => {
  const [responseData, setResponseData] = useState(null);

  return (
    <ResponseContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider