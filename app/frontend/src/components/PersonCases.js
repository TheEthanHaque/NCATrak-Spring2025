import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Tabs,
  Tab
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const PersonCases = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPersonIdFromLocation = () => {
    if (location.state && location.state.personId) {
      return location.state.personId;
    }
    const params = new URLSearchParams(location.search);
    return params.get('personId');
  };
  const personId = getPersonIdFromLocation();

  // Tab handling
  const currentTab = 1; // 1 = Cases
  const handleTabChange = (_, newValue) => {
    if (newValue === 0) {
      navigate('/PersonBio', { state: { personId } });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        {/* Tabs bar */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="Person Profile Tabs">
            <Tab label="Personal Profile" />
            <Tab label="Cases" />
          </Tabs>
        </Box>

        {/* CASES title */}
        <Typography variant="h5" gutterBottom align="left" sx={{ mb: 3 }}>
          PERSON CASES
        </Typography>

        {/* TODO: build out your list of cases here for personId = {personId} */}

      </Paper>
    </Container>
  );
};

export default PersonCases;
