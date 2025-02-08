import React, { createContext, useState, useContext } from 'react';

const RouteContext = createContext();

export function RouteProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <RouteContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  return useContext(RouteContext);
} 