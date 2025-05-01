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
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

const PersonCases = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPersonId = () => {
    if (location.state?.personId) return location.state.personId;
    const params = new URLSearchParams(location.search);
    return params.get('personId');
  };
  const personId = getPersonId();

  const currentTab = 1;
  const handleTabChange = (_e, newTab) => {
    if (newTab === 0) {
      navigate('/PersonBio', { state: { personId } });
    }
  };

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [openMap, setOpenMap] = useState({});

  useEffect(() => {
    if (!personId) {
      setError('No person selected.');
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/people/case/${personId}`);;
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const casePersons = await res.json();

        const detailed = await Promise.all(
          casePersons.map(async (cp) => {
            const r2 = await fetch(`/api/cases/${cp.case_id}`);
            if (!r2.ok) throw new Error(`Case ${cp.case_id} not found`);
            const details = await r2.json();
            return { ...cp, details };
          })
        );

        setCases(detailed);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to load cases.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [personId]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  const fmt = (iso) => iso ? new Date(iso).toLocaleDateString() : '';

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        {/* Tabs bar */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Personal Profile" />
            <Tab label="Cases" />
          </Tabs>
        </Box>

        <Typography variant="h5" gutterBottom>
          CASES
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>CAC Case Number</TableCell>
                <TableCell>CAC Received Date</TableCell>
                <TableCell>Relationship</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Same Household</TableCell>
                <TableCell>Custody</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cases.map((c) => (
                <React.Fragment key={c.case_id}>
                  {/* Summary row */}
                  <TableRow hover>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setOpenMap((o) => ({
                            ...o,
                            [c.case_id]: !o[c.case_id]
                          }))
                        }
                      >
                        {openMap[c.case_id]
                          ? <KeyboardArrowUpIcon />
                          : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{c.details.case_number}</TableCell>
                    <TableCell>{fmt(c.details.cac_received_date)}</TableCell>
                    <TableCell>{c.relationship_id}</TableCell>
                    <TableCell>{c.role_id}</TableCell>
                    <TableCell>
                      {c.age} {c.age_unit}
                    </TableCell>
                    <TableCell>
                      <Checkbox disabled checked={c.same_household} />
                    </TableCell>
                    <TableCell>
                      <Checkbox disabled checked={c.custody} />
                    </TableCell>
                  </TableRow>

                  {/* Expanded details */}
                  <TableRow>
                    <TableCell style={{ padding: 0 }} colSpan={8}>
                      <Collapse in={openMap[c.case_id]} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2 }}>
                          {/* Two-column grid of details */}
                          <Box sx={{ display: 'flex', mb: 2 }}>
                            <Box sx={{ flex: 1, pr: 1 }}>
                              <Table size="small">
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Address Line 1</TableCell>
                                    <TableCell>{c.details.address_line1}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Address Line 2</TableCell>
                                    <TableCell>{c.details.address_line2}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>City</TableCell>
                                    <TableCell>{c.details.city}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>County</TableCell>
                                    <TableCell>{c.details.county}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>State</TableCell>
                                    <TableCell>{c.details.state}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Zip</TableCell>
                                    <TableCell>{c.details.zip}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </Box>

                            <Box sx={{ flex: 1, pl: 1 }}>
                              <Table size="small">
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Home Phone</TableCell>
                                    <TableCell>{c.details.home_phone}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Cell Phone</TableCell>
                                    <TableCell>{c.details.cell_phone}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Work Phone</TableCell>
                                    <TableCell>{c.details.work_phone}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>School or Employer</TableCell>
                                    <TableCell>{c.details.school_employer}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Marital Status</TableCell>
                                    <TableCell>{c.details.marital_status}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Education Level</TableCell>
                                    <TableCell>{c.details.education_level}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Income Level of Household</TableCell>
                                    <TableCell>{c.details.income_level}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </Box>
                          </Box>

                          {/* Bottom header row for other people */}
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Other People in Case</TableCell>
                                <TableCell>Relationship to Victim</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Same Household</TableCell>
                                <TableCell>Custody</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {/* Map additional people if available */}
                            </TableBody>
                          </Table>
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
