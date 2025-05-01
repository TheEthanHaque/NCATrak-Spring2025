// src/api/routes/people.js
import { Router } from 'express';

const router = Router();

/**
 * @route GET /api/people
 * @desc Get all people
 */
router.get('/', async (req, res, next) => {
  try {
    const people = await req.prisma.person.findMany({
      orderBy: {
        last_name: 'desc'
      },
      select: {
        person_id: true,
        first_name: true,
        last_name: true
      }
    });
    res.json(people);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/people/search/:lastName
 * @desc Search people by last name with case information
 */
router.get('/search/:lastName', async (req, res, next) => {
  try {
    const lastName = req.params.lastName;
    console.log(`Searching for people with last name containing: ${lastName}`);
    
    // First, find all people matching the last name
    const people = await req.prisma.person.findMany({
      where: { 
        last_name: {
          contains: lastName,
          mode: 'insensitive'
        }
      },
      orderBy: {
        last_name: 'asc'
      },
      select: {
        person_id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        suffix: true,
        date_of_birth: true,
        gender: true,
        prior_convictions: true,
        convicted_against_children: true,
        sex_offender: true,
        sex_predator: true,
      }
    });
    
    console.log(`Found ${people.length} people matching the search criteria`);
    
    // For each person, fetch their case information
    const peopleWithCases = await Promise.all(people.map(async (person) => {
      try {
        // Find all cases associated with this person
        const casePerson = await req.prisma.case_person.findMany({
          where: { 
            person_id: person.person_id 
          },
          include: {
            cac_case: {
              select: {
                case_id: true,
                case_number: true
              }
            }
          },
          orderBy: {
            role_id: 'asc' // Prioritize victims (role_id = 1) first
          }
        });
        
        // Add case information to the person object
        return {
          ...person,
          case_person: casePerson
        };
      } catch (err) {
        console.error(`Error fetching case info for person ID ${person.person_id}:`, err);
        // Return the person without case information
        return {
          ...person,
          case_person: []
        };
      }
    }));
    
    res.json(peopleWithCases);
  } catch (error) {
    console.error("Error in /api/people/search/:lastName:", error);
    next(error);
  }
});

/**
 * @route GET /api/people/case/:caseId
 * @desc Get all people associated with a case
 */
router.get('/case/:caseId', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.caseId);
    const people = await req.prisma.case_person.findMany({
      where: { case_id: caseId },
      include: {
        person: true
      }
    });

    // Format the response similar to the SQL query results
    const formattedPeople = people.map(cp => {
      const p = cp.person;
      return {
        person_id: p.person_id,
        name: `${p.first_name || ''} ${p.last_name || ''}`.trim(),
        age: p.date_of_birth ? calculateAge(p.date_of_birth) : null,
        date_of_birth: p.date_of_birth,
        same_household: cp.same_household,
        custody: cp.custody,
        role_id: cp.role_id,
        relationship_id: cp.relationship_id
      };
    });
    
    res.json(formattedPeople);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/people/cases-for-person/:personId
 * @desc Get all cases associated with a person with detailed information
 */
router.get('/cases-for-person/:personId', async (req, res, next) => {
  try {
    const personId = parseInt(req.params.personId);
    console.log(`Fetching cases for person ID: ${personId}`);
    
    const casePerson = await req.prisma.case_person.findMany({
      where: { 
        person_id: personId 
      },
      include: {
        cac_case: {
          include: {
            child_advocacy_center: {
              select: {
                cac_name: true
              }
            }
          }
        }
      },
      orderBy: {
        role_id: 'asc' // Prioritize victims (role_id = 1) first
      }
    });
    
    // Format the response to be more useful
    const formattedCases = casePerson.map(cp => {
      return {
        case_id: cp.case_id,
        case_number: cp.cac_case.case_number || `Case #${cp.case_id}`,
        cac_name: cp.cac_case.child_advocacy_center?.cac_name || `CAC ID: ${cp.cac_id}`,
        role_id: cp.role_id,
        relationship_id: cp.relationship_id,
        same_household: cp.same_household,
        custody: cp.custody,
        victim_status_id: cp.victim_status_id,
        created_date: cp.cac_case.created_date
      };
    });
    
    console.log(`Found ${casePerson.length} cases for person ID ${personId}`);
    res.json(formattedCases);
  } catch (error) {
    console.error(`Error fetching cases for person ID ${req.params.personId}:`, error);
    next(error);
  }
});

/**
 * @route POST /api/people
 * @desc Create a new person
 */
router.post('/', async (req, res, next) => {
  try {
    // Get maximum person ID
    const maxPersonIdResult = await req.prisma.person.findFirst({
      orderBy: {
        person_id: 'desc'
      },
      select: {
        person_id: true
      }
    });
    
    const newPersonId = maxPersonIdResult ? maxPersonIdResult.person_id + 1 : 1;
    
    const newPerson = await req.prisma.person.create({
      data: {
        person_id: newPersonId,
        cac_id: req.body.cac_id,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        suffix: req.body.suffix,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        religion_id: req.body.religion_id,
        language_id: req.body.language_id,
        prior_convictions: req.body.prior_convictions,
        convicted_against_children: req.body.convicted_against_children,
        sex_offender: req.body.sex_offender,
        sex_predator: req.body.sex_predator,
        race_id: req.body.race_id
      }
    });
    
    res.status(201).json(newPerson);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/people/:id
 * @desc Update a person
 */
router.put('/:id', async (req, res, next) => {
  try {
    const personId = parseInt(req.params.id);
    
    // Log the update for debugging
    console.log(`Updating person ${personId} with data:`, req.body);
    
    const updatedPerson = await req.prisma.person.update({
      where: { person_id: personId },
      data: {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name || null,
        last_name: req.body.last_name,
        suffix: req.body.suffix || null,
        date_of_birth: req.body.date_of_birth ? new Date(req.body.date_of_birth) : null,
        gender: req.body.gender,
        religion_id: req.body.religion_id,
        language_id: req.body.language_id,
        prior_convictions: req.body.prior_convictions,
        convicted_against_children: req.body.convicted_against_children,
        sex_offender: req.body.sex_offender,
        sex_predator: req.body.sex_predator,
        race_id: req.body.race_id
      }
    });
    
    // Log success
    console.log(`Successfully updated person ${personId}`);
    
    res.json(updatedPerson);
  } catch (error) {
    console.error(`Error updating person:`, error);
    next(error);
  }
});

/**
 * @route POST /api/people/case
 * @desc Associate a person with a case
 */
router.post('/case', async (req, res, next) => {
  try {
    const { person_id, case_id, cac_id } = req.body;
    
    // Validate that person and case exist
    const person = await req.prisma.person.findUnique({
      where: { person_id: parseInt(person_id) }
    });
    
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    
    const caseData = await req.prisma.cac_case.findUnique({
      where: { case_id: parseInt(case_id) }
    });
    
    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }
    
    // Check if the person is already associated with the case
    const existingAssociation = await req.prisma.case_person.findUnique({
      where: {
        person_id_case_id: {
          person_id: parseInt(person_id),
          case_id: parseInt(case_id)
        }
      }
    });
    
    if (existingAssociation) {
      return res.status(400).json({ message: 'Person is already associated with this case' });
    }
    
    const association = await req.prisma.case_person.create({
      data: {
        person_id: parseInt(person_id),
        case_id: parseInt(case_id),
        cac_id: parseInt(cac_id)
      }
    });
    
    res.status(201).json(association);
  } catch (error) {
    console.error('Error associating person with case:', error);
    next(error);
  }
});

/**
 * @route DELETE /api/people/case/:personId/:caseId
 * @desc Remove a person from a case
 */
router.delete('/case/:personId/:caseId', async (req, res, next) => {
  try {
    const personId = parseInt(req.params.personId);
    const caseId = parseInt(req.params.caseId);
    
    // Check if the association exists
    const existingAssociation = await req.prisma.case_person.findUnique({
      where: {
        person_id_case_id: {
          person_id: personId,
          case_id: caseId
        }
      }
    });
    
    if (!existingAssociation) {
      return res.status(404).json({ message: 'Association not found' });
    }
    
    await req.prisma.case_person.delete({
      where: {
        person_id_case_id: {
          person_id: personId,
          case_id: caseId
        }
      }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error removing person from case:', error);
    next(error);
  }
});

/**
 * @route PUT /api/people/case/:personId/:caseId/household
 * @desc Update same household status for a person in a case
 */
router.put('/case/:personId/:caseId/household', async (req, res, next) => {
  try {
    const personId = parseInt(req.params.personId);
    const caseId = parseInt(req.params.caseId);
    const { same_household } = req.body;
    
    const updated = await req.prisma.case_person.update({
      where: {
        person_id_case_id: {
          person_id: personId,
          case_id: caseId
        }
      },
      data: {
        same_household: same_household
      }
    });
    
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/people/case/:personId/:caseId/custody
 * @desc Update custody status for a person in a case
 */
router.put('/case/:personId/:caseId/custody', async (req, res, next) => {
  try {
    const personId = parseInt(req.params.personId);
    const caseId = parseInt(req.params.caseId);
    const { custody } = req.body;
    
    const updated = await req.prisma.case_person.update({
      where: {
        person_id_case_id: {
          person_id: personId,
          case_id: caseId
        }
      },
      data: {
        custody: custody
      }
    });
    
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/people/case/:personId/:caseId
 * @desc Update case-specific details for a person
 */
router.put('/case/:personId/:caseId', async (req, res, next) => {
  try {
    const personId = parseInt(req.params.personId);
    const caseId = parseInt(req.params.caseId);
    
    const updated = await req.prisma.case_person.update({
      where: {
        person_id_case_id: {
          person_id: personId,
          case_id: caseId
        }
      },
      data: {
        relationship_id: req.body.relationship_id,
        role_id: req.body.role_id,
        age: req.body.age,
        age_unit: req.body.age_unit,
        address_line_1: req.body.address_line_1,
        address_line_2: req.body.address_line_2,
        city: req.body.city,
        state_abbr: req.body.state_abbr,
        zip: req.body.zip,
        same_household: req.body.same_household,
        school_or_employer: req.body.school_or_employer
      }
    });
    
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/people/:id
 * @desc Get a person by id with detailed information
 * NOTE: This route must be defined last to avoid conflicts with other routes
 */
router.get('/:id', async (req, res, next) => {
  try {
    const personId = parseInt(req.params.id);
    const person = await req.prisma.person.findUnique({
      where: { person_id: personId }
    });
    
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    
    // Calculate nickname (could be stored in DB or derived)
    const nickName = person.nick_name || person.first_name;
    
    // Create an enhanced person object with all the fields we want to display
    const enhancedPerson = {
      ...person,
      nickName,
      // You can add additional computed fields here if needed
    };
    
    res.json(enhancedPerson);
  } catch (error) {
    next(error);
  }
});

// Helper function to calculate age from date of birth
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default router;