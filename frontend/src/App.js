import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AOITracker from './AOITracker';
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
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

function App() {
    return (
        <Router>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                        🛠️ NCATrak Spring 2025
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/lookup">Lookup</Button> 
                    <Button color="inherit" component={Link} to="/general">General Info</Button> 
                    <Button color="inherit" component={Link} to="/mh-basic">MH Basic</Button> 
                    <Button color="inherit" component={Link} to="/people">People</Button>
                    <Button color="inherit" component={Link} to="/case-notes">Case Notes</Button>  
                    <Button color="inherit" component={Link} to="/assessment">Assessment</Button>
                    <Button color="inherit" component={Link} to="/mh-assessment">MH Assessment</Button> 
                    <Button color="inherit" component={Link} to="/treatment">Treatment Plan</Button> 
                    <Button color="inherit" component={Link} to="/va-logs">VA Logs</Button>
                    <Button color="inherit" component={Link} to="/aoi-events">AOI Events</Button>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to the NCATrak Interface
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Use the navigation bar above to explore different functionalities.
                    </Typography>
                </Box>

                <AOITracker />

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Typography variant="h6">🏠 Home: NCATrak Spring 2025!</Typography>} />
                    <Route path="/lookup" element={<Lookup />} />  
                    <Route path="/general" element={<GeneralTab />} />
                    <Route path="/mh-basic" element={<MHBasicInterface />} />
                    <Route path="/people" element={<PeopleInterface />} />
                    <Route path="/case-notes" element={<CaseNotes />} />
                    <Route path="/assessment" element={<AssessmentInterface />} />
                    <Route path="/mh-assessment" element={<MHAssessment />} />
                    <Route path="/treatment" element={<TreatmentPlan />} />
                    <Route path="/va-logs" element={<VALogInterface />} />
                    <Route path="/aoi-events" element={<AOIEventViewer />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
