import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';

const PickLists = () => {
  const navigate = useNavigate();
  
  // State for selected values
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPickList, setSelectedPickList] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, value: '' });
  
  // Categories for picklist management
  const categories = [
    { id: 1, name: 'Case Attachments' },
    { id: 2, name: 'CPS Tab' },
    { id: 3, name: 'Events' },
    { id: 4, name: 'Forensic Interview Tab' },
    { id: 5, name: 'General - Information Release' },
    { id: 6, name: 'General Tab' },
    { id: 7, name: 'Law Enforcement Tab' },
    { id: 8, name: 'MDT' },
    { id: 9, name: 'MDT Main Tab' },
    { id: 10, name: 'Medical Tab' },
    { id: 11, name: 'Mental Health Tab' },
    { id: 12, name: 'People Tab' },
    { id: 13, name: 'Personnel' },
    { id: 14, name: 'Presenting Tab' },
    { id: 15, name: 'Prosecution Tab' },
    { id: 16, name: 'Victim Advocacy Tab' }
  ];
  
  // Pick lists for each category (only People Tab is fully defined as requested)
  const pickListsByCategory = {
    1: [
      { id: 101, name: 'Attachment Types' },
    ],
    2: [
      { id: 201, name: 'CPS Status' },
    ],
    3: [
      { id: 301, name: 'Event Types' },
    ],
    4: [
      { id: 401, name: 'Interview Types' },
    ],
    5: [
      { id: 501, name: 'Release Types' },
    ],
    6: [
      { id: 601, name: 'Case Status' },
    ],
    7: [
      { id: 701, name: 'LE Status' },
    ],
    8: [
      { id: 801, name: 'MDT Types' },
    ],
    9: [
      { id: 901, name: 'MDT Status' },
    ],
    10: [
      { id: 1001, name: 'Medical Exam Types' },
    ],
    11: [
      { id: 1101, name: 'MH Treatment Models' },
    ],
    12: [
      { id: 1201, name: 'Community (5)' },
      { id: 1202, name: 'CSEC Involvement (4)' },
      { id: 1203, name: 'CSF Eligible (2)' },
      { id: 1204, name: 'Custom Field (1)' },
      { id: 1205, name: 'Do they like cookies?' },
      { id: 1206, name: 'Education Level' },
      { id: 1207, name: 'Ethnicity 6' },
      { id: 1208, name: 'Household Income' },
      { id: 1209, name: 'Language' },
      { id: 1210, name: 'Marital Status' },
      { id: 1211, name: 'Military Dependent Relationship' },
      { id: 1212, name: 'New Mexico Pueblo or Tribe' },
      { id: 1213, name: 'Non-Victim Military Type' },
      { id: 1214, name: 'Person of Trust' },
      { id: 1215, name: 'Race' },
      { id: 1216, name: 'Relationship to Victim' },
      { id: 1217, name: 'Religion' },
      { id: 1218, name: 'Self Identified Gender' },
      { id: 1219, name: 'Special Populations' }
    ],
    13: [
      { id: 1301, name: 'Roles' },
    ],
    14: [
      { id: 1401, name: 'Presenting Problem Types' },
    ],
    15: [
      { id: 1501, name: 'Case Status' },
    ],
    16: [
      { id: 1601, name: 'Service Types' },
    ]
  };
  
  // Sample list items for each pick list (would come from API)
  const sampleListItems = {
    // People Tab Pick Lists
    1201: [ // Community (5)
      { id: 12011, value: 'West Hills' },
      { id: 12012, value: 'Glenview' },
      { id: 12013, value: 'Cedar Bluff Apartments' },
      { id: 12014, value: 'Hardin Valley' }
    ],
    1202: [ // CSEC Involvement (4)
      { id: 12021, value: 'USA' },
      { id: 12022, value: 'Mexico' },
      { id: 12023, value: 'Foster Care Awol History' },
      { id: 12024, value: 'Canada' },
      { id: 12025, value: 'Nicaragua' },
      { id: 12026, value: 'El Salvador' },
      { id: 12027, value: 'Uzbekistan' }
    ],
    1203: [ // CSF Eligible (2)
      { id: 12031, value: 'Yes' },
      { id: 12032, value: 'No' }
    ],
    1204: [ // Custom Field (1)
      { id: 12041, value: 'Custom Value 1' },
      { id: 12042, value: 'Custom Value 2' },
      { id: 12043, value: 'Custom Value 3' }
    ],
    1205: [ // Do they like cookies?
      { id: 12051, value: 'Yes' },
      { id: 12052, value: 'No' },
      { id: 12053, value: 'Unknown' }
    ],
    1206: [ // Education Level
      { id: 12061, value: 'Pre-School' },
      { id: 12062, value: 'Elementary' },
      { id: 12063, value: 'Middle School' },
      { id: 12064, value: 'High School' },
      { id: 12065, value: 'Some College' },
      { id: 12066, value: 'Associate Degree' },
      { id: 12067, value: 'Bachelor\'s Degree' },
      { id: 12068, value: 'Graduate Degree' }
    ],
    1207: [ // Ethnicity 6
      { id: 12071, value: 'Hispanic' },
      { id: 12072, value: 'Non-Hispanic' }
    ],
    1208: [ // Household Income
      { id: 12081, value: 'Below $15,000' },
      { id: 12082, value: '$15,000 - $30,000' },
      { id: 12083, value: '$30,001 - $50,000' },
      { id: 12084, value: '$50,001 - $75,000' },
      { id: 12085, value: '$75,001 - $100,000' },
      { id: 12086, value: 'Above $100,000' },
      { id: 12087, value: 'Unknown' }
    ],
    1209: [ // Language
      { id: 12091, value: 'English' },
      { id: 12092, value: 'Spanish' },
      { id: 12093, value: 'French' },
      { id: 12094, value: 'Chinese' },
      { id: 12095, value: 'Arabic' },
      { id: 12096, value: 'Other' },
      { id: 12097, value: 'Unknown' }
    ],
    1210: [ // Marital Status
      { id: 12101, value: 'Single' },
      { id: 12102, value: 'Married' },
      { id: 12103, value: 'Separated' },
      { id: 12104, value: 'Divorced' },
      { id: 12105, value: 'Widowed' },
      { id: 12106, value: 'Unknown' }
    ],
    1211: [ // Military Dependent Relationship
      { id: 12111, value: 'Spouse' },
      { id: 12112, value: 'Child' },
      { id: 12113, value: 'Parent' },
      { id: 12114, value: 'Sibling' },
      { id: 12115, value: 'Other Relative' },
      { id: 12116, value: 'Self' }
    ],
    1212: [ // New Mexico Pueblo or Tribe
      { id: 12121, value: 'Acoma Pueblo' },
      { id: 12122, value: 'Cochiti Pueblo' },
      { id: 12123, value: 'Isleta Pueblo' },
      { id: 12124, value: 'Jemez Pueblo' },
      { id: 12125, value: 'Laguna Pueblo' },
      { id: 12126, value: 'Navajo Nation' },
      { id: 12127, value: 'Sandia Pueblo' },
      { id: 12128, value: 'Santa Clara Pueblo' },
      { id: 12129, value: 'Taos Pueblo' }
    ],
    1213: [ // Non-Victim Military Type
      { id: 12131, value: 'Army' },
      { id: 12132, value: 'Navy' },
      { id: 12133, value: 'Air Force' },
      { id: 12134, value: 'Marines' },
      { id: 12135, value: 'Coast Guard' },
      { id: 12136, value: 'National Guard' },
      { id: 12137, value: 'Reserves' }
    ],
    1214: [ // Person of Trust
      { id: 12141, value: 'Yes' },
      { id: 12142, value: 'No' },
      { id: 12143, value: 'Unknown' }
    ],
    1215: [ // Race
      { id: 12151, value: 'American Indian/Alaska Native' },
      { id: 12152, value: 'Asian' },
      { id: 12153, value: 'Black/African American' },
      { id: 12154, value: 'Hispanic/Latino' },
      { id: 12155, value: 'Native Hawaiian/Pacific Islander' },
      { id: 12156, value: 'White' },
      { id: 12157, value: 'Multi-racial' },
      { id: 12158, value: 'Other' },
      { id: 12159, value: 'Unknown' }
    ],
    1216: [ // Relationship to Victim
      { id: 12161, value: 'Parent' },
      { id: 12162, value: 'Grandparent' },
      { id: 12163, value: 'Sibling' },
      { id: 12164, value: 'Extended Family' },
      { id: 12165, value: 'Guardian' },
      { id: 12166, value: 'Teacher/Coach' },
      { id: 12167, value: 'Family Friend' },
      { id: 12168, value: 'Stranger' },
      { id: 12169, value: 'Other' }
    ],
    1217: [ // Religion
      { id: 12171, value: 'Agnostic' },
      { id: 12172, value: 'Atheist' },
      { id: 12173, value: 'Buddhist' },
      { id: 12174, value: 'Christian' },
      { id: 12175, value: 'Hindu' },
      { id: 12176, value: 'Jewish' },
      { id: 12177, value: 'Muslim' },
      { id: 12178, value: 'Other' },
      { id: 12179, value: 'Unknown' }
    ],
    1218: [ // Self Identified Gender
      { id: 12181, value: 'Female' },
      { id: 12182, value: 'Male' },
      { id: 12183, value: 'Transgender Female' },
      { id: 12184, value: 'Transgender Male' },
      { id: 12185, value: 'Non-Binary' },
      { id: 12186, value: 'Gender Queer' },
      { id: 12187, value: 'Another Gender Identity' },
      { id: 12188, value: 'Decline to Answer' },
      { id: 12189, value: 'Unknown' }
    ],
    1219: [ // Special Populations
      { id: 12191, value: 'Deaf/Hard of Hearing' },
      { id: 12192, value: 'Immigrants/Refugee or Asylum Seeking' },
      { id: 12193, value: 'Military-Dependent' },
      { id: 12194, value: 'Limited English Proficiency' },
      { id: 12195, value: 'Indigenous/Tribal community' },
      { id: 12196, value: 'Unstably Housed/Unhoused' },
      { id: 12197, value: 'LGBTQIA+' },
      { id: 12198, value: 'Cognitive, Physical, or Mental Disability' },
      { id: 12199, value: 'Vision Impaired' }
    ],
    
    // Sample entries for other categories
    1001: [ // Medical Exam Types
      { id: 10011, value: 'Acute Medical Exam' },
      { id: 10012, value: 'Non-Acute Medical Exam' },
      { id: 10013, value: 'Follow-up Exam' }
    ],
    1101: [ // MH Treatment Models
      { id: 11011, value: 'TF-CBT' },
      { id: 11012, value: 'EMDR' },
      { id: 11013, value: 'Play Therapy' },
      { id: 11014, value: 'ARC' }
    ],
    601: [ // Case Status
      { id: 6011, value: 'Open' },
      { id: 6012, value: 'Pending' },
      { id: 6013, value: 'Closed' },
      { id: 6014, value: 'Archived' }
    ]
  };
  
  // Handle category change
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setSelectedPickList(''); // Reset pick list when category changes
    setListItems([]); // Clear items
  };
  
  // Handle pick list change
  const handlePickListChange = (event) => {
    const pickListId = event.target.value;
    setSelectedPickList(pickListId);
    
    // Load items for this pick list
    if (pickListId && sampleListItems[pickListId]) {
      setListItems(sampleListItems[pickListId]);
    } else {
      setListItems([]);
    }
  };
  
  // Add item dialog
  const handleOpenAddDialog = () => {
    setCurrentItem({ id: null, value: '' });
    setIsAddDialogOpen(true);
  };
  
  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };
  
  const handleAddItem = () => {
    if (currentItem.value.trim() === '') return;
    
    // Create new item with unique ID
    const newItem = {
      id: Math.max(0, ...listItems.map(item => item.id)) + 1,
      value: currentItem.value
    };
    
    setListItems([...listItems, newItem]);
    handleCloseAddDialog();
  };
  
  // Edit item dialog
  const handleOpenEditDialog = (item) => {
    setCurrentItem({ ...item });
    setIsEditDialogOpen(true);
  };
  
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };
  
  const handleEditItem = () => {
    if (currentItem.value.trim() === '') return;
    
    const updatedItems = listItems.map(item => 
      item.id === currentItem.id ? { ...item, value: currentItem.value } : item
    );
    
    setListItems(updatedItems);
    handleCloseEditDialog();
  };
  
  // Handle delete item dialog
  const handleOpenDeleteDialog = (item) => {
    setCurrentItem({ ...item });
    setIsDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
  
  const handleDeleteItem = () => {
    const updatedItems = listItems.filter(item => item.id !== currentItem.id);
    setListItems(updatedItems);
    handleCloseDeleteDialog();
  };
  
  // Handle moving items up and down in the list
  const handleMoveItem = (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === listItems.length - 1)
    ) {
      return; // Can't move if at the beginning or end of the list
    }
    
    const newItems = [...listItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the items
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    
    setListItems(newItems);
  };
  
  // Handle sorting the list alphabetically
  const handleSortAlphabetically = () => {
    const sortedItems = [...listItems].sort((a, b) => 
      a.value.localeCompare(b.value)
    );
    
    setListItems(sortedItems);
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pick Lists
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Manage Pick Lists
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Pick lists are predefined sets of values used in dropdown menus throughout the application.
            Select a category and a specific pick list to view and manage its values.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/admin')}
            sx={{ mb: 3 }}
          >
            Back to Admin Dashboard
          </Button>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Dropdowns for category and pick list selection */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Select a Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Select a Category"
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth disabled={!selectedCategory}>
            <InputLabel id="picklist-select-label">Select a Pick List</InputLabel>
            <Select
              labelId="picklist-select-label"
              id="picklist-select"
              value={selectedPickList}
              label="Select a Pick List"
              onChange={handlePickListChange}
            >
              {selectedCategory && pickListsByCategory[selectedCategory]?.map(list => (
                <MenuItem key={list.id} value={list.id}>
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        {/* List Items Table */}
        {selectedPickList && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                List Items
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Sort items alphabetically">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<SortIcon />}
                    onClick={handleSortAlphabetically}
                  >
                    Sort Alphabetically
                  </Button>
                </Tooltip>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddDialog}
                >
                  Add New Item
                </Button>
              </Box>
            </Box>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Value</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listItems.length > 0 ? (
                    listItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          {item.value}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Move up">
                            <IconButton 
                              aria-label="move up" 
                              onClick={() => handleMoveItem(index, 'up')}
                              disabled={index === 0}
                              size="small"
                            >
                              <ArrowUpwardIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Move down">
                            <IconButton 
                              aria-label="move down" 
                              onClick={() => handleMoveItem(index, 'down')}
                              disabled={index === listItems.length - 1}
                              size="small"
                            >
                              <ArrowDownwardIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton 
                              aria-label="edit" 
                              onClick={() => handleOpenEditDialog(item)}
                              color="primary"
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton 
                              aria-label="delete" 
                              onClick={() => handleOpenDeleteDialog(item)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No items found. Add a new item to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
      
      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the value for the new item:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="value"
            label="Value"
            type="text"
            fullWidth
            variant="outlined"
            value={currentItem.value}
            onChange={(e) => setCurrentItem({ ...currentItem, value: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the value for this item:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="value"
            label="Value"
            type="text"
            fullWidth
            variant="outlined"
            value={currentItem.value}
            onChange={(e) => setCurrentItem({ ...currentItem, value: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditItem} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Item Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{currentItem.value}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteItem} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PickLists;