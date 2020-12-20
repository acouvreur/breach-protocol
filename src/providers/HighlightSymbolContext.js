import React, { useState } from 'react';

const HighlightedSymbolContext = React.createContext();

export const HighlightedSymbolProvider = ({ children }) => {
  const [highlightedSymbol, setHighlightedSymbol] = useState(null);

  return (
    <HighlightedSymbolContext.Provider
      value={{ highlightedSymbol, setHighlightedSymbol }}
    >
      {children}
    </HighlightedSymbolContext.Provider>
  );
};

export default HighlightedSymbolContext;
