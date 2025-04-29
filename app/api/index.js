// api/index.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import casesRouter from './routes/cases.js';
import peopleRouter from './routes/people.js';
import agenciesRouter from './routes/agencies.js';
import employeesRouter from './routes/employee.js';
import mentalhealthRouter from './routes/mentalhealth.js';
import victimsAdvocacyRouter from './routes/victimadvocacy.js';
import caseSearchRoutes from './routes/case-search.js';

const prisma = new PrismaClient();
const app = express();

// Toggle via env var:
//    ENABLE_AOI_LOGGING=false node index.js
const ENABLE_AOI_LOGGING = process.env.ENABLE_AOI_LOGGING !== 'false';
console.log(`AOI logging is ${ENABLE_AOI_LOGGING ? 'ENABLED' : 'DISABLED'}`);

// Prepare log file
const logDir = path.resolve(process.cwd(), 'AOI log');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const ts =
  [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join('') +
  '_' +
  [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join('');
const fileName = `${ts}.csv`;
const logFilePath = path.join(logDir, fileName);

// Write header (including text‐input columns)
const header = [
  'timestamp_iso',
  'mouse_x',
  'mouse_y',
  'mouse_aoi',
  'mouse_click',
  'text_input',
  'text_activity',
  'targetId',
  'description',
  'eye_aoi',
  'left_eye_x',
  'left_eye_y',
  'right_eye_x',
  'right_eye_y'
].join(',') + '\n';

fs.writeFileSync(logFilePath, header);

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// inject prisma
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// your existing routes
app.use('/api/cases', casesRouter);
app.use('/api/people', peopleRouter);
app.use('/api/agencies', agenciesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/mentalhealth', mentalhealthRouter);
app.use('/api/va', victimsAdvocacyRouter);
app.use('/api/case-search', caseSearchRoutes);

// AOI / eye-tracking endpoint
app.post('/api/aoi_event', async (req, res) => {
  try {
    // pull both styles of coordinates & AOI
    const {
      session_id,
      event_type,
      timestamp_iso = '',
      x: xFromBody,
      y: yFromBody,
      mouse_aoi: mouseAoiFromBody,
      aoi: aoiFromBody,
      mouse_click = false,
      text_input = false,
      text_activity = '',
      targetId = '',
      description = '',
      eye_aoi = '',
      left_eye_x = '',
      left_eye_y = '',
      right_eye_x = '',
      right_eye_y = '',
      coordinates = {}
    } = req.body;

    if (!ENABLE_AOI_LOGGING || !session_id) {
      return res.status(200).json({ message: 'Logging disabled or missing session_id' });
    }
    if (event_type === 'session_end') {
      console.log(`Session ${session_id} ended.`);
      return res.json({ message: 'Session ended' });
    }

    // pick x/y from top‐level or coordinates
    const x = xFromBody ?? coordinates.x ?? '';
    const y = yFromBody ?? coordinates.y ?? '';

    // pick mouse_aoi from either property
    const mouse_aoi = (mouseAoiFromBody ?? aoiFromBody ?? '').replace(/,/g, ';');
    const esc = (s) => String(s).replace(/,/g, ';');

    // build CSV line
    const line = [
      timestamp_iso,
      x,
      y,
      `"${mouse_aoi}"`,
      mouse_click,
      text_input,
      `"${esc(text_activity)}"`,
      `"${esc(targetId)}"`,
      `"${esc(description)}"`,
      `"${esc(eye_aoi)}"`,
      left_eye_x,
      left_eye_y,
      right_eye_x,
      right_eye_y,
    ].join(',') + '\n';

    fs.appendFile(logFilePath, line, (err) => {
      if (err) console.error('Error writing AOI event:', err);
    });

    console.log('AOI event received:', req.body);
    res.status(200).json({ message: 'Event received' });
  } catch (err) {
    console.error('Error in /api/aoi_event:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

// graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
