import React, { createContext, useState, useContext } from 'react';

// Create a context to manage the currently selected case
export const CaseContext = createContext();

// Custom hook to use the case context
export const useCase = () => useContext(CaseContext);

// Sample case data
const sampleCases = [
  { id: 'case1', name: 'Case One', number: 'CAC-2025-001' },
  { id: 'case2', name: 'Case Two', number: 'CAC-2025-002' },
  { id: 'case3', name: 'Case Three', number: 'CAC-2025-003' },
  { id: 'case4', name: 'Case Four', number: 'CAC-2025-004' },
];

// Case provider component
export const CaseProvider = ({ children }) => {
  const [currentCase, setCurrentCase] = useState('case1');
  const [cases] = useState(sampleCases);
  
  return (
    <CaseContext.Provider value={{ currentCase, setCurrentCase, cases }}>
      {children}
    </CaseContext.Provider>
  );
};

export default CaseContext;