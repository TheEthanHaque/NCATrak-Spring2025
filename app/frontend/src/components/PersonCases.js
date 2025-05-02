import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Checkbox
} from '@mui/material';
import { KeyboardArrowDown as DownIcon, KeyboardArrowUp as UpIcon } from '@mui/icons-material';
import { peopleApi } from '../services/api';

const PersonCases = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // pull personId from state or query string
  const personId =
    location.state?.personId ||
    new URLSearchParams(location.search).get('personId');

  // tab control
  const currentTab = 1;
  const handleTabChange = (_e, newTab) => {
    if (newTab === 0) {
      navigate('/PersonBio', { state: { personId } });
    }
  };

  // data state
  const [cases, setCases]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [openMap, setOpenMap] = useState({});

  useEffect(() => {
    if (!personId) {
      setError('No person selected.');
      setLoading(false);
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const cpList = await peopleApi.getPeopleByCaseId(personId);
        setCases(cpList);
      } catch (err) {
        console.error(err);
        setError('Failed to load cases.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [personId]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign:'center', mt:8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt:4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt:4 }}>
      <Paper sx={{ p:3 }} elevation={3}>
        <Box sx={{ borderBottom:1, borderColor:'divider', mb:2 }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Personal Profile" />
            <Tab label="Cases" />
          </Tabs>
        </Box>

        <Typography variant="h5" gutterBottom>CASES</Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>CAC Case Number</TableCell>
                <TableCell>CAC Date Received</TableCell>
                <TableCell>Relationship to Victim</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Same Household</TableCell>
                <TableCell>Custody</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No cases found for this person
                  </TableCell>
                </TableRow>
              ) : cases.map(cp => (
                <React.Fragment key={cp.case_id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setOpenMap(o => ({ ...o, [cp.case_id]: !o[cp.case_id] }))
                        }
                      >
                        {openMap[cp.case_id] ? <UpIcon/> : <DownIcon/>}
                      </IconButton>
                    </TableCell>
                    <TableCell>{cp.cac_case?.case_number}</TableCell>
                    <TableCell>{cp.relationship_id}</TableCell>
                    <TableCell>{cp.role_id}</TableCell>
                    <TableCell>
                      {cp.age}{cp.age_unit && ` ${cp.age_unit}`}
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={Boolean(cp.same_household)} disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={Boolean(cp.custody)} disabled />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={7} sx={{ p:0 }}>
                      <Collapse in={openMap[cp.case_id]} timeout="auto" unmountOnExit>
                        <Box sx={{ p:2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Raw Case-Person JSON
                          </Typography>
                          <pre style={{ whiteSpace:'pre-wrap' }}>
                            {JSON.stringify(cp, null, 2)}
                          </pre>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default PersonCases;