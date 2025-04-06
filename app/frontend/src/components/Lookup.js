import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Pagination,
  Grid
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function Lookup({ onPersonSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(2); // Starting on page 2 as shown in the image
  const [searchResults, setSearchResults] = useState([
    { id: 1, lastName: "Allen", firstName: "Barbara", middleName: "", alias: "" },
    { id: 2, lastName: "Allison", firstName: "Kevin", middleName: "", alias: "" },
    { id: 3, lastName: "Amore", firstName: "Shane", middleName: "", alias: "" },
    { id: 4, lastName: "Anderson", firstName: "Andrew", middleName: "A", alias: "" },
    { id: 5, lastName: "Anderson", firstName: "Cathy", middleName: "", alias: "" },
    // You can add more mock data here
  ]);

  const handleSearch = () => {
    // In a real application, this would make an API call
    console.log("Searching for:", searchTerm);
    // For now, we're just using the mock data
  };

  const handleNoMatchFound = () => {
    console.log("No match found");
    // Handle the no match found action
  };

  const handleSelect = (person) => {
    if (onPersonSelect) {
      onPersonSelect(person);
    }
    console.log("Selected person:", person);
  };

  const handleView = (person) => {
    console.log("Viewing person:", person);
    // Handle viewing person details
  };

  // Calculate pagination display
  const itemsPerPage = 5;
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, 70); // Assuming 70 total items as shown in the image
  const totalItems = 70;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box sx={{ p: 2, overflow: "hidden" }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'normal' }}>
        Lookup Person
      </Typography>
      
      <Box sx={{ display: "flex", mb: 2, alignItems: "flex-end" }}>
        <Typography variant="body1" sx={{ mr: 2, fontWeight: 'bold' }}>
          Last Name
        </Typography>
        <TextField 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSearch}
          sx={{ mr: 1, textTransform: 'uppercase' }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleNoMatchFound}
          sx={{ mr: 1, bgcolor: '#0277bd', textTransform: 'uppercase' }}
        >
          No Match Found
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ bgcolor: '#0277bd', textTransform: 'uppercase' }}
        >
          Close
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 400, mb: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width={100}></TableCell>
              <TableCell width={100}></TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Alias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((person, index) => (
              <TableRow key={person.id} sx={{ bgcolor: index % 2 !== 0 ? '#f5f5f5' : 'white' }}>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSelect(person)}
                    sx={{ textTransform: 'none' }}
                  >
                    Select
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleView(person)}
                    sx={{ textTransform: 'none' }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.middleName}</TableCell>
                <TableCell>
                  <Checkbox size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex" }}>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }} disabled>
            <KeyboardDoubleArrowLeftIcon fontSize="small" />
          </Button>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }} disabled>
            <KeyboardArrowLeftIcon fontSize="small" />
          </Button>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}>
            1
          </Button>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0, bgcolor: '#1976d2', color: 'white' }}>
            2
          </Button>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}>
            3
          </Button>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}>
            4
          </Button>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}>
            <KeyboardArrowRightIcon fontSize="small" />
          </Button>
          <Button sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}>
            <KeyboardDoubleArrowRightIcon fontSize="small" />
          </Button>
        </Box>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          21 - 40 of 70 items
          <IconButton size="small" sx={{ ml: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Typography>
      </Box>
    </Box>
  );
}

export default Lookup;