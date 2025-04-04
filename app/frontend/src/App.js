import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import AOITracker from './AOITracker';
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
import { AppBar, Toolbar, Typography, Button, Container, Box} from '@mui/material';
import CaseSelector from './context/CaseSelector';
import { CaseProvider, useCase } from './context/CaseContext';

function App() {
    return (
        <CaseProvider>
            <Router>
                {/* Header */}
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" sx={{ flexGrow: 0, mr: 3 }}>NCATrak Spring 2025</Typography>
                        
                        <CaseSelector />
                        
                        <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'auto' }}>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/CaseGeneral">General</Button> 
                            <Button color="inherit" component={Link} to="/CasePeople">People</Button>
                            <Button color="inherit" component={Link} to="/CaseMDT">MDT</Button>
                            <Button color="inherit" component={Link} to="/CasePresenting">Presenting</Button>
                            <Button color="inherit" component={Link} to="/CaseCPS">CPS</Button>
                            <Button color="inherit" component={Link} to="/CaseLE">LE</Button>
                            <Button color="inherit" component={Link} to="/CaseMedical">Medical</Button>
                            <Button color="inherit" component={Link} to="/CaseFI">FI</Button>
                            <Button color="inherit" component={Link} to="/CaseMH">MH</Button>
                            <Button color="inherit" component={Link} to="/CaseVA">VA</Button>
                            <Button color="inherit" component={Link} to="/CaseProsecution">Prosecution</Button>
                            <Button color="inherit" component={Link} to="/CaseReport">Report</Button>
                            <Button color="inherit" component={Link} to="/CaseAttachments">Case Attachments</Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <CurrentCaseInfo />

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
                        <Route path="/CaseProsecution" element={<Typography variant="h6">FI Component (Under Development)</Typography>} />
                        <Route path="/CaseReport" element={<Typography variant="h6">FI Component (Under Development)</Typography>} />
                        <Route path="/CaseAttachments" element={<Typography variant="h6">FI Component (Under Development)</Typography>} />

                        
                        
                        {/* MH Section with sub-navigation */}
                        <Route path="/CaseMh/*" element={<MHSection />} />
                        
                        <Route path="/CaseVA/*" element={<VALogInterface />} />
                        
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
            </Router>
        </CaseProvider>
    );
}

// Component to display current case information
const CurrentCaseInfo = () => {
    const { currentCase, cases } = useCase();
    const selectedCase = cases.find(c => c.id === currentCase);
    
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
                {selectedCase?.name} ({selectedCase?.number})
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Currently viewing data for {selectedCase?.name}. Use the dropdown in the navigation bar to switch cases.
            </Typography>
        </Box>
    );
};

export default App;