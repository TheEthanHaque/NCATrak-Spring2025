import React, { useState } from 'react';
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
  CircularProgress,
  Alert,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import { casesApi } from '../services/api';
import { useCase } from '../context/CaseContext';

const SearchPerson = () => {
  const navigate = useNavigate();
  const { setCurrentCase } = useCase();

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Call the API to search for cases
      const data = await casesApi.searchCases(searchTerm);
      setSearchResults(data);
      setPage(0); // Reset to first page
    } catch (err) {
      setError("Failed to search cases. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle case selection
  const handleSelect = (caseId) => {
    setCurrentCase(caseId);
    navigate('/CaseGeneral');
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/');
  };

  // Pagination handlers
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  
  // Get current page of data
  const paginatedResults = searchResults.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );
  
  // Calculate pagination info
  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min((page + 1) * rowsPerPage, searchResults.length);
  const totalItems = searchResults.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <Box sx={{ p: 4, maxWidth: 'md', mx: 'auto' }}>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="left" sx={{ mb: 3 }}>
            Search Case
          </Typography>
          
          <Box sx={{ display: "flex", mb: 3, alignItems: "flex-end" }}>
            <TextField 
              label="Search by Case Number or Person Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="medium"
              sx={{ flexGrow: 1, mr: 2 }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : <SearchIcon />}
                  </IconButton>
                ),
              }}
              fullWidth
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSearch}
              sx={{ mr: 1, textTransform: 'none', height: 40 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ textTransform: 'none', height: 40 }}
            >
              Cancel
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
            
          <Typography variant="h6" sx={{ mb: 2 }}>
            Search Results
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: 400, mb: 3, border: '1px solid #e0e0e0' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell width={100} sx={{ fontWeight: 'bold' }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Case Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Person Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>CAC</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      <CircularProgress size={40} sx={{ mb: 2 }} />
                      <Typography variant="body2" display="block">
                        Searching for cases...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : paginatedResults.length > 0 ? (
                  paginatedResults.map((caseItem, index) => (
                    <TableRow 
                      key={caseItem.id} 
                      sx={{ 
                        bgcolor: index % 2 !== 0 ? '#f5f5f5' : 'white',
                        '&:hover': { bgcolor: '#e3f2fd', cursor: 'pointer' }
                      }}
                      onClick={() => handleSelect(caseItem.id)}
                    >
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(caseItem.id);
                          }}
                          sx={{ textTransform: 'none' }}
                        >
                          Select
                        </Button>
                      </TableCell>
                      <TableCell>{caseItem.number}</TableCell>
                      <TableCell>{caseItem.name}</TableCell>
                      <TableCell>{caseItem.cacName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      {searchTerm ? (
                        <>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                            No cases found matching "{searchTerm}"
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Try a different search term or check your spelling
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                            Enter a search term to find cases
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Search by case number, person name, or other identifiers
                          </Typography>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {paginatedResults.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
              <Box sx={{ display: "flex" }}>
                <Button 
                  variant="outlined"
                  sx={{ minWidth: 40, height: 40, borderRadius: '4px 0 0 4px', borderRight: 0 }}
                  onClick={() => handleChangePage(0)}
                  disabled={page === 0}
                >
                  <KeyboardDoubleArrowLeftIcon fontSize="small" />
                </Button>
                <Button 
                  variant="outlined"
                  sx={{ minWidth: 40, height: 40, borderRadius: 0, borderRight: 0, borderLeft: 0 }}
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 0}
                >
                  <KeyboardArrowLeftIcon fontSize="small" />
                </Button>
                
                {/* Page numbers */}
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const pageNum = page < 2 ? i : page - 2 + i;
                  if (pageNum >= totalPages) return null;
                  
                  return (
                    <Button 
                      key={pageNum}
                      variant={pageNum === page ? "contained" : "outlined"}
                      sx={{ 
                        minWidth: 40, 
                        height: 40, 
                        borderRadius: 0,
                        borderRight: 0,
                        borderLeft: i === 0 ? 0 : '1px solid rgba(0, 0, 0, 0.23)'
                      }}
                      onClick={() => handleChangePage(pageNum)}
                    >
                      {pageNum + 1}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outlined"
                  sx={{ minWidth: 40, height: 40, borderRadius: 0, borderRight: 0, borderLeft: 0 }}
                  onClick={() => handleChangePage(page + 1)}
                  disabled={page >= totalPages - 1}
                >
                  <KeyboardArrowRightIcon fontSize="small" />
                </Button>
                <Button 
                  variant="outlined"
                  sx={{ minWidth: 40, height: 40, borderRadius: '0 4px 4px 0', borderLeft: 0 }}
                  onClick={() => handleChangePage(totalPages - 1)}
                  disabled={page >= totalPages - 1}
                >
                  <KeyboardDoubleArrowRightIcon fontSize="small" />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {totalItems > 0 ? `${startIndex}-${endIndex} of ${totalItems} items` : 'No items'}
                </Typography>
                <IconButton 
                  size="small" 
                  sx={{ ml: 1 }} 
                  onClick={handleSearch}
                  color="primary"
                  disabled={loading}
                >
                  <RefreshIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchPerson;