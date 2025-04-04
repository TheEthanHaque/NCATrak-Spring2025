import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Paper, Tabs, Tab, Box } from '@mui/material';

const SubNavigationBar = ({ items, baseRoute }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Extract the current subroute (everything after the baseRoute)
  const currentSubRoute = currentPath.replace(baseRoute, '') || '/';
  
  // Find the index of the current tab
  const currentTabIndex = items.findIndex(item => item.route === currentSubRoute);
  
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper elevation={2}>
        <Tabs 
          value={currentTabIndex !== -1 ? currentTabIndex : 0}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {items.map((item, index) => (
            <Tab 
              key={index}
              label={item.label}
              component={Link}
              to={`${baseRoute}${item.route}`}
            />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
};

export default SubNavigationBar;