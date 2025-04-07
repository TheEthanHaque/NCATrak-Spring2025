// src/api/routes/cases.js
import { Router } from 'express';

const router = Router();

/**
 * @route GET /api/cases
 * @desc Get all cases
 */
router.get('/', async (req, res, next) => {
  try {
    const cases = await req.prisma.cac_case.findMany({
      include: {
        child_advocacy_center: true,
        cac_agency_cac_case_va_agency_idTocac_agency: true
      }
    });
    res.json(cases);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/cases/list
 * @desc Get a simplified list of cases for dropdown with primary person information
 */
router.get('/list', async (req, res, next) => {
  try {
    console.log("Fetching cases list with person information for dropdown");
    
    const cases = await req.prisma.cac_case.findMany({
      select: {
        case_id: true,
        case_number: true,
        cac_id: true,
        case_person: {
          take: 1, // Take just the first person associated with each case
          select: {
            person: {
              select: {
                first_name: true,
                last_name: true
              }
            },
            role_id: true
          },
          orderBy: {
            role_id: 'asc' // Try to get the primary victim/client first
          }
        },
        child_advocacy_center: {
          select: {
            cac_name: true
          }
        }
      },
      orderBy: {
        case_id: 'desc'
      },
      take: 20 // Limit to recent 20 cases
    });
    
    console.log(`Retrieved ${cases.length} cases from database`);
    
    // Format the response for the dropdown
    const formattedCases = cases.map(c => {
      // Extract person info if available
      const person = c.case_person?.[0]?.person;
      let displayName = 'Unknown Person';
      
      if (person) {
        displayName = `${person.last_name || ''}, ${person.first_name || ''}`;
      }
      
      return {
        id: c.case_id.toString(),
        name: displayName,
        number: c.case_number || `#${c.case_id}`,
        cacName: c.child_advocacy_center?.cac_name || `CAC ID: ${c.cac_id}`
      };
    });
    
    res.json(formattedCases);
  } catch (error) {
    console.error('Error fetching cases list:', error);
    next(error);
  }
});

/**
 * @route GET /api/cases/:id
 * @desc Get a case by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    // Check if id parameter exists
    if (!req.params.id) {
      return res.status(400).json({ message: 'Case ID is required' });
    }
    
    // Parse the id parameter with better error handling
    let caseId;
    try {
      caseId = parseInt(req.params.id, 10);
      
      // Check if parsing resulted in a valid number
      if (isNaN(caseId)) {
        return res.status(400).json({ message: 'Invalid case ID format' });
      }
    } catch (parseError) {
      console.error('Error parsing case ID:', parseError);
      return res.status(400).json({ message: 'Invalid case ID format' });
    }
    
    console.log(`Looking up case with ID: ${caseId}`);
    
    const caseData = await req.prisma.cac_case.findUnique({
      where: { case_id: caseId },
      include: {
        child_advocacy_center: true,
        cac_agency_cac_case_mh_agency_idTocac_agency: true,
        cac_agency_cac_case_mh_referral_agency_idTocac_agency: true,
        cac_agency_cac_case_va_agency_idTocac_agency: true,
        cac_agency_cac_case_va_referral_agency_idTocac_agency: true,
        case_person: {
          include: {
            person: true
          }
        }
      }
    });

    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.json(caseData);
  } catch (error) {
    console.error('Error fetching case by ID:', error);
    next(error);
  }
});
/**
 * @route POST /api/cases
 * @desc Create a new case
 */
router.post('/', async (req, res, next) => {
  try {
    const newCase = await req.prisma.cac_case.create({
      data: req.body
    });
    res.status(201).json(newCase);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/cases/:id
 * @desc Update a case
 */
router.put('/:id', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.id);
    
    const updatedCase = await req.prisma.cac_case.update({
      where: { case_id: caseId },
      data: {
        cac_received_date: req.body.cac_received_date,
        case_closed_date: req.body.case_closed_date,
        closed_reason_id: req.body.closed_reason_id,
        cac_id: req.body.cac_id,
        mh_lead_employee_id: req.body.mh_lead_employee_id,
        va_agency_id: req.body.va_agency_id,
        va_case_number: req.body.va_case_number,
        va_claim_denied_reason: req.body.va_claim_denied_reason,
        va_claim_number: req.body.va_claim_number,
        va_claim_status_id: req.body.va_claim_status_id,
        va_have_birth_cert: req.body.va_have_birth_cert,
        va_has_police_report: req.body.va_has_police_report,
        va_mdt_ready: req.body.va_mdt_ready,
        va_na: req.body.va_na,
        va_referral_agency_id: req.body.va_referral_agency_id,
        va_referral_date: req.body.va_referral_date,
        va_services_accepted: req.body.va_services_accepted,
        va_services_offered_date: req.body.va_services_offered_date,
        va_services_end_date: req.body.va_services_end_date
      }
    });
    
    res.json(updatedCase);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/cases/:id
 * @desc Delete a case
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.id);
    
    // Due to foreign key constraints, we would need to delete all related records first
    // This is a destructive operation, so consider carefully if this is needed
    
    await req.prisma.cac_case.delete({
      where: { case_id: caseId }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});



export default router;