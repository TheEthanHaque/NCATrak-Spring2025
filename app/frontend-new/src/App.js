import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AOIEventViewer from './AOIEventViewer';
import GeneralTab from './components/GeneralTab';  
import MHBasicInterface from './components/MHBasicInterface';  
import PeopleInterface from './components/PeopleInterface';  
import CaseNotes from './components/CaseNotes';  
import AssessmentInterface from './components/AssessmentInterface';
import TreatmentPlan from './components/TreatmentPlan';  
import VALogInterface from './components/VALogInterface';  
import MHAssessment from './components/MHAssessment';  
import Lookup from './components/Lookup';  
import MHSection from './components/MHSection';
import NewCase from './components/NewCase';
import PersonBio from './components/PersonBio';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useMediaQuery,
  useTheme,
  CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CaseSelector from './context/CaseSelector';
import { CaseProvider, useCase } from './context/CaseContext';
import SearchPerson from './components/SearchPerson';

const AppLayout = () => {
  const location = useLocation();
  const isNewCasePage = location.pathname === '/NewCase';
  const isSearchPage = location.pathname === '/SearchCase';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "General", path: "/CaseGeneral" },
    { title: "People", path: "/CasePeople" },
    { title: "MDT", path: "/CaseMDT" },
    { title: "Presenting", path: "/CasePresenting" },
    { title: "CPS", path: "/CaseCPS" },
    { title: "LE", path: "/CaseLE" },
    { title: "Medical", path: "/CaseMedical" },
    { title: "FI", path: "/CaseFI" },
    { title: "MH", path: "/CaseMH" },
    { title: "VA", path: "/CaseVA" },
    { title: "Prosecution", path: "/CaseProsecution" },
    { title: "Report", path: "/CaseReport" },
    { title: "Case Attachments", path: "/CaseAttachments" }
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const DrawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem 
            button 
            component={Link} 
            to={link.path} 
            key={link.title}
            selected={location.pathname === link.path}
          >
            <ListItemText primary={link.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 0, mr: 3 }}>NCATrak Spring 2025</Typography>
          
          <CaseSelector />
          
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <DrawerList />
              </Drawer>
            </>
          ) : (
            <Box 
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              {navLinks.map((link) => (
                <Button 
                  key={link.title}
                  color="inherit" 
                  component={Link} 
                  to={link.path}
                  sx={{ 
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                    px: 1.5,
                    '&.active': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* When not to show new case info*/}
        {!isNewCasePage && !isSearchPage && <CurrentCaseInfo />}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Typography variant="h6">Home: NCATrak Spring 2025!</Typography>} />
          <Route path="/CaseGeneral" element={<GeneralTab />} />
          <Route path="/CasePeople" element={<PeopleInterface />} />
          <Route path="/CaseMDT" element={<Typography variant="h6">MDT Component (Under Development)</Typography>} />
          <Route path="/CasePresenting" element={<Typography variant="h6">Presenting Component (Under Development)</Typography>} />
          <Route path="/CaseCPS" element={<Typography variant="h6">CPS Component (Under Development)</Typography>} />
          <Route path="/CaseLE" element={<Typography variant="h6">LE Component (Under Development)</Typography>} />
          <Route path="/CaseMedical" element={<Typography variant="h6">Medical Component (Under Development)</Typography>} />
          <Route path="/CaseFI" element={<Typography variant="h6">FI Component (Under Development)</Typography>} />
          <Route path="/CaseProsecution" element={<Typography variant="h6">Prosecution Component (Under Development)</Typography>} />
          <Route path="/CaseReport" element={<Typography variant="h6">Report Component (Under Development)</Typography>} />
          <Route path="/CaseAttachments" element={<Typography variant="h6">Case Attachments Component (Under Development)</Typography>} />

          {/* Create New Case Route */}
          <Route path="/NewCase" element={<NewCase />} />
          
          {/* MH Section with sub-navigation */}
          <Route path="/CaseMH/*" element={<MHSection />} />
          
          <Route path="/CaseVA/*" element={<VALogInterface />} />

          {/* Search Case Route */}
          <Route path="/SearchCase" element={<SearchPerson />} />

          {/* Add the new PersonBio route */}
          <Route path="/PersonBio" element={<PersonBio />} />
          
          {/* Legacy routes - can be accessed directly but not from navigation */}
          <Route path="/case-notes" element={<CaseNotes />} />
          <Route path="/lookup" element={<Lookup />} />  
          <Route path="/assessment" element={<AssessmentInterface />} />
          <Route path="/mh-assessment" element={<MHAssessment />} />
          <Route path="/treatment" element={<TreatmentPlan />} />
          <Route path="/mh-basic" element={<MHBasicInterface />} />
          <Route path="/va-logs" element={<VALogInterface />} />
          <Route path="/aoi" element={<AOIEventViewer />} />
        </Routes>
      </Container>
    </>
  );
};

// Component to display current case information
const CurrentCaseInfo = () => {
  const { currentCase, cases, loading, error } = useCase();
  
  if (loading) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        p: 3, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 2,
        boxShadow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress size={30} sx={{ mr: 2 }} />
        <Typography variant="h6">Loading case information...</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        p: 3, 
        backgroundColor: '#ffeded', 
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="h6" color="error">Error loading case information</Typography>
        <Typography variant="body1">Please try refreshing the page</Typography>
      </Box>
    );
  }
  
  const selectedCase = cases.find(c => c.id === currentCase);
  
  if (!selectedCase) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        p: 3, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="h6">No case selected</Typography>
        <Typography variant="body1">Please select a case from the dropdown menu</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ 
      textAlign: 'center', 
      mb: 4, 
      p: 3, 
      backgroundColor: '#f5f5f5', 
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h4" gutterBottom>
        {selectedCase.name} 
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Case {selectedCase.number}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Currently viewing data for this case. Use the dropdown in the navigation bar to switch cases.
      </Typography>
    </Box>
  );
};

function App() {
  return (
    <CaseProvider>
      <Router>
        <AppLayout />
      </Router>
    </CaseProvider>
  );
}

export default App;