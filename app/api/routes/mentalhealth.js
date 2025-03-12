// src/api/routes/mentalhealth.js
import { Router } from 'express';

const router = Router();

// ----- Assessment Instruments -----

/**
 * @route GET /api/mentalhealth/assessment-instruments
 * @desc Get all assessment instruments
 */
router.get('/assessment-instruments', async (req, res, next) => {
  try {
    const instruments = await req.prisma.case_mh_assessment_instrument.findMany();
    res.json(instruments);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/mentalhealth/assessment-instruments/:name
 * @desc Get an assessment instrument by name
 */
router.get('/assessment-instruments/:name', async (req, res, next) => {
  try {
    const instrumentName = req.params.name;
    const instrument = await req.prisma.case_mh_assessment_instrument.findFirst({
      where: {
        assessment_name: {
          equals: instrumentName,
          mode: 'insensitive'
        }
      }
    });
    
    if (!instrument) {
      return res.status(404).json({ message: 'Assessment instrument not found' });
    }
    
    res.json(instrument);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/assessment-instruments
 * @desc Create a new assessment instrument
 */
router.post('/assessment-instruments', async (req, res, next) => {
  try {
    // Get maximum instrument ID
    const maxInstrumentIdResult = await req.prisma.case_mh_assessment_instrument.findFirst({
      orderBy: {
        instrument_id: 'desc'
      },
      select: {
        instrument_id: true
      }
    });
    
    const newInstrumentId = maxInstrumentIdResult ? maxInstrumentIdResult.instrument_id + 1 : 1;
    
    const newInstrument = await req.prisma.case_mh_assessment_instrument.create({
      data: {
        instrument_id: newInstrumentId,
        assessment_name: req.body.assessment_name,
        instrument_scores: req.body.instrument_scores
      }
    });
    
    res.status(201).json(newInstrument);
  } catch (error) {
    next(error);
  }
});

// ----- Assessments -----

/**
 * @route GET /api/mentalhealth/assessments/case/:caseId
 * @desc Get all assessments for a case
 */
router.get('/assessments/case/:caseId', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.caseId);
    const assessments = await req.prisma.case_mh_assessment.findMany({
      where: { case_id: caseId },
      include: {
        case_mh_assessment_instrument: true,
        employee: true
      }
    });
    
    res.json(assessments);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/mentalhealth/assessments/:id
 * @desc Get an assessment by id
 */
router.get('/assessments/:id', async (req, res, next) => {
  try {
    const assessmentId = parseInt(req.params.id);
    const assessment = await req.prisma.case_mh_assessment.findUnique({
      where: { assessment_id: assessmentId },
      include: {
        case_mh_assessment_instrument: true,
        employee: true,
        cac_agency_case_mh_assessment_mh_provider_agency_idTocac_agency: true
      }
    });
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    res.json(assessment);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/assessments
 * @desc Create a new assessment
 */
router.post('/assessments', async (req, res, next) => {
  try {
    // Get maximum assessment ID
    const maxAssessmentIdResult = await req.prisma.case_mh_assessment.findFirst({
      orderBy: {
        assessment_id: 'desc'
      },
      select: {
        assessment_id: true
      }
    });
    
    const newAssessmentId = maxAssessmentIdResult ? maxAssessmentIdResult.assessment_id + 1 : 1;
    
    const newAssessment = await req.prisma.case_mh_assessment.create({
      data: {
        assessment_id: newAssessmentId,
        cac_id: req.body.cac_id,
        case_id: req.body.case_id,
        agency_id: req.body.agency_id,
        mh_provider_agency_id: req.body.mh_provider_agency_id,
        assessment_instrument_id: req.body.assessment_instrument_id,
        provider_employee_id: req.body.provider_employee_id,
        timing_id: req.body.timing_id,
        session_date: req.body.session_date,
        assessment_date: req.body.assessment_date,
        comments: req.body.comments
      }
    });
    
    res.status(201).json(newAssessment);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/assessment-scores
 * @desc Add scores for an assessment
 */
router.post('/assessment-scores', async (req, res, next) => {
  try {
    // Get maximum score ID
    const maxScoreIdResult = await req.prisma.case_mh_assessment_measure_scores.findFirst({
      orderBy: {
        score_id: 'desc'
      },
      select: {
        score_id: true
      }
    });
    
    const newScoreId = maxScoreIdResult ? maxScoreIdResult.score_id + 1 : 1;
    
    const newScores = await req.prisma.case_mh_assessment_measure_scores.create({
      data: {
        score_id: newScoreId,
        cac_id: req.body.cac_id,
        case_id: req.body.case_id,
        assessment_id: req.body.assessment_id,
        instrument_id: req.body.instrument_id,
        mh_assessment_scores: req.body.mh_assessment_scores
      }
    });
    
    res.status(201).json(newScores);
  } catch (error) {
    next(error);
  }
});

// ----- Diagnoses -----

/**
 * @route GET /api/mentalhealth/diagnoses/case/:caseId
 * @desc Get all diagnoses for a case
 */
router.get('/diagnoses/case/:caseId', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.caseId);
    
    // Since case_mh_assessment_diagnosis is ignored by Prisma due to no primary key
    // Using raw query
    const diagnoses = await req.prisma.$queryRaw`
      SELECT d.mh_provider_agency_id, d.diagnosis_date, a.agency_name 
      FROM case_mh_assessment_diagnosis d
      LEFT JOIN cac_agency a ON d.mh_provider_agency_id = a.agency_id
      WHERE d.case_id = ${caseId}
    `;
    
    res.json(diagnoses);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/diagnoses
 * @desc Create a new diagnosis
 */
router.post('/diagnoses', async (req, res, next) => {
  try {
    // Using raw query since the table is ignored by Prisma
    await req.prisma.$executeRaw`
      INSERT INTO case_mh_assessment_diagnosis (case_id, diagnosis_date, mh_provider_agency_id)
      VALUES (${req.body.case_id}, ${req.body.diagnosis_date}, ${req.body.mh_provider_agency_id})
    `;
    
    res.status(201).json({ message: 'Diagnosis created successfully' });
  } catch (error) {
    next(error);
  }
});

// ----- Treatment Models -----

/**
 * @route GET /api/mentalhealth/treatment-models
 * @desc Get all treatment models
 */
router.get('/treatment-models', async (req, res, next) => {
  try {
    const models = await req.prisma.case_mh_treatment_models.findMany();
    res.json(models);
  } catch (error) {
    next(error);
  }
});

// ----- Treatment Plans -----

/**
 * @route GET /api/mentalhealth/treatment-plans/case/:caseId
 * @desc Get all treatment plans for a case
 */
router.get('/treatment-plans/case/:caseId', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.caseId);
    const plans = await req.prisma.case_mh_treatment_plans.findMany({
      where: { case_id: caseId },
      include: {
        case_mh_treatment_models: true,
        cac_agency: true
      }
    });
    
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/treatment-plans
 * @desc Create a new treatment plan
 */
router.post('/treatment-plans', async (req, res, next) => {
  try {
    // Get maximum plan ID
    const maxPlanIdResult = await req.prisma.case_mh_treatment_plans.findFirst({
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true
      }
    });
    
    const newPlanId = maxPlanIdResult ? maxPlanIdResult.id + 1 : 1;
    
    const newPlan = await req.prisma.case_mh_treatment_plans.create({
      data: {
        id: newPlanId,
        treatment_model_id: req.body.treatment_model_id,
        provider_agency_id: req.body.provider_agency_id,
        cac_id: req.body.cac_id,
        planned_start_date: req.body.planned_start_date,
        planned_end_date: req.body.planned_end_date,
        case_id: req.body.case_id,
        authorized_status_id: req.body.authorized_status_id,
        duration: req.body.duration,
        duration_unit: req.body.duration_unit,
        planned_review_date: req.body.planned_review_date,
        treatment_plan_date: req.body.treatment_plan_date,
        provider_employee_id: req.body.provider_employee_id
      }
    });
    
    res.status(201).json(newPlan);
  } catch (error) {
    next(error);
  }
});

// ----- Provider Log -----

/**
 * @route GET /api/mentalhealth/providers/case/:caseId
 * @desc Get all providers for a case
 */
router.get('/providers/case/:caseId', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.caseId);
    const providers = await req.prisma.case_mh_provider.findMany({
      where: { case_id: caseId },
      include: {
        cac_agency: true,
        employee: true
      }
    });
    
    // Format the response similar to the SQL query
    const formattedProviders = providers.map(provider => {
      return {
        id: provider.id,
        therapy_offered_date: provider.therapy_offered_date,
        agency_name: provider.cac_agency?.agency_name,
        therapist: provider.employee ? `${provider.employee.first_name || ''} ${provider.employee.last_name || ''}`.trim() : null,
        case_number: provider.case_number
      };
    });
    
    res.json(formattedProviders);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/providers
 * @desc Add a provider to a case
 */
router.post('/providers', async (req, res, next) => {
  try {
    // Get maximum provider ID
    const maxProviderIdResult = await req.prisma.case_mh_provider.findFirst({
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true
      }
    });
    
    const newProviderId = maxProviderIdResult ? maxProviderIdResult.id + 1 : 1;
    
    const newProvider = await req.prisma.case_mh_provider.create({
      data: {
        id: newProviderId,
        agency_id: req.body.agency_id,
        case_id: req.body.case_id,
        case_number: req.body.case_number,
        lead_employee_id: req.body.lead_employee_id,
        provider_type_id: req.body.provider_type_id,
        therapy_accepted: req.body.therapy_accepted,
        therapy_complete_date: req.body.therapy_complete_date,
        therapy_end_reason_id: req.body.therapy_end_reason_id,
        therapy_offered_date: req.body.therapy_offered_date,
        therapy_record_created: req.body.therapy_record_created
      }
    });
    
    res.status(201).json(newProvider);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/mentalhealth/providers/:id
 * @desc Delete a provider from a case
 */
router.delete('/providers/:id', async (req, res, next) => {
  try {
    const providerId = parseInt(req.params.id);
    
    await req.prisma.case_mh_provider.delete({
      where: { id: providerId }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// ----- Sessions -----

/**
 * @route GET /api/mentalhealth/sessions/case/:caseId
 * @desc Get all sessions for a case
 */
router.get('/sessions/case/:caseId', async (req, res, next) => {
  try {
    const caseId = parseInt(req.params.caseId);
    const sessions = await req.prisma.case_mh_session_log_enc.findMany({
      where: { case_id: caseId },
      include: {
        cac_agency: true,
        employee: true,
        case_mh_session_attendee: {
          include: {
            person: true
          }
        }
      },
      orderBy: {
        session_date: 'desc'
      }
    });
    
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/sessions
 * @desc Create a new session
 */
router.post('/sessions', async (req, res, next) => {
  try {
    // Get maximum session ID
    const maxSessionIdResult = await req.prisma.case_mh_session_log_enc.findFirst({
      orderBy: {
        case_mh_session_id: 'desc'
      },
      select: {
        case_mh_session_id: true
      }
    });
    
    const newSessionId = maxSessionIdResult ? maxSessionIdResult.case_mh_session_id + 1 : 1;
    
    const newSession = await req.prisma.case_mh_session_log_enc.create({
      data: {
        case_mh_session_id: newSessionId,
        cac_id: req.body.cac_id,
        case_id: req.body.case_id,
        comments: req.body.comments,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        intervention_id: req.body.intervention_id,
        location_id: req.body.location_id,
        onsite: req.body.onsite,
        provider_agency_id: req.body.provider_agency_id,
        provider_employee_id: req.body.provider_employee_id,
        session_date: req.body.session_date,
        session_status_id: req.body.session_status_id,
        session_type_id: req.body.session_type_id,
        recurring: req.body.recurring,
        recurring_fre: req.body.recurring_fre,
        recurring_duration: req.body.recurring_duration,
        recurring_duration_unit: req.body.recurring_duration_unit
      }
    });
    
    res.status(201).json(newSession);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/mentalhealth/sessions/:sessionId/attendees
 * @desc Add an attendee to a session
 */
router.post('/sessions/:sessionId/attendees', async (req, res, next) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    
    // Get maximum attendee ID
    const maxAttendeeIdResult = await req.prisma.case_mh_session_attendee.findFirst({
      orderBy: {
        case_mh_session_attendee_id: 'desc'
      },
      select: {
        case_mh_session_attendee_id: true
      }
    });
    
    const newAttendeeId = maxAttendeeIdResult ? maxAttendeeIdResult.case_mh_session_attendee_id + 1 : 1;
    
    const newAttendee = await req.prisma.case_mh_session_attendee.create({
      data: {
        case_mh_session_attendee_id: newAttendeeId,
        person_id: req.body.person_id,
        cac_id: req.body.cac_id,
        case_id: req.body.case_id,
        case_mh_session_id: sessionId
      }
    });
    
    res.status(201).json(newAttendee);
  } catch (error) {
    next(error);
  }
});

export default router;