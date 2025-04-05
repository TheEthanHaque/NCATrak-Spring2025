import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useCase } from './CaseContext';
import { useNavigate } from 'react-router-dom';

// Case selector component
const CaseSelector = () => {
  const { currentCase, setCurrentCase, cases } = useCase();
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    
    // Check if the selected option is "Create New Case(s)"
    if (selectedValue === 'create-new') {
      navigate('/NewCase');
    } else {
      setCurrentCase(selectedValue);
    }
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
            <MenuItem 
              key={caseItem.id} 
              value={caseItem.id}
              sx={caseItem.isAction ? { fontWeight: 'bold', color: 'primary.main' } : {}}
            >
              {caseItem.isAction ? caseItem.name : `${caseItem.name} (${caseItem.number})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CaseSelector;