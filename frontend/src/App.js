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

function App() {
    return (
        <Router>
            <div className="App">
                <h1>NCATrak Interface</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/general">General Tab</Link></li>
                        <li><Link to="/mh-basic">MH Basic</Link></li>
                        <li><Link to="/people">People</Link></li>
                        <li><Link to="/case-notes">Case Notes</Link></li>
                        <li><Link to="/assessment">Assessment</Link></li>
                        <li><Link to="/treatment">Treatment Plan</Link></li>
                        <li><Link to="/va-logs">VA Logs</Link></li>
                        <li><Link to="/aoi-events">AOI Events</Link></li>
                    </ul>
                </nav>

                <AOITracker />

                <Routes>
                    <Route path="/" element={<h2>Welcome to NCATrak Spring 2025!</h2>} />
                    <Route path="/general" element={<GeneralTab />} />
                    <Route path="/mh-basic" element={<MHBasicInterface />} />
                    <Route path="/people" element={<PeopleInterface />} />
                    <Route path="/case-notes" element={<CaseNotes />} />
                    <Route path="/assessment" element={<AssessmentInterface />} />
                    <Route path="/treatment" element={<TreatmentPlan />} />
                    <Route path="/va-logs" element={<VALogInterface />} />
                    <Route path="/aoi-events" element={<AOIEventViewer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
