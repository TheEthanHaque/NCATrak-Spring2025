import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Container
} from '@mui/material';

const PersonBio = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Person Biography
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" align="center">
            This page is under development. Person biography information will be displayed here.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PersonBio;