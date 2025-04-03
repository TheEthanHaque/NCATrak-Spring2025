import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useCase } from './CaseContext';

// Case selector component
const CaseSelector = () => {
  const { currentCase, setCurrentCase, cases } = useCase();
  
  const handleChange = (event) => {
    setCurrentCase(event.target.value);
  };
  
  return (
    <Box sx={{ minWidth: 200, mr: 2 }}>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel id="case-selector-label" sx={{ color: 'white' }}>Current Case</InputLabel>
        <Select
          labelId="case-selector-label"
          id="case-selector"
          value={currentCase}
          label="Current Case"
          onChange={handleChange}
          sx={{ 
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.8)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          {cases.map(caseItem => (
            <MenuItem key={caseItem.id} value={caseItem.id}>
              {caseItem.name} ({caseItem.number})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CaseSelector;