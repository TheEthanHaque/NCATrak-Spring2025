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

// Header: now includes 'page'
const header = [
  'timestamp_iso',
  'page',
  'mouse_x',
  'mouse_y',
  'mouse_aoi',
  'mouse_click',
  'eye_aoi',
  'left_eye_x',
  'left_eye_y',
  'right_eye_x',
  'right_eye_y',
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

// existing routes...
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
    const {
      session_id,
      event_type,
      page           = '',
      timestamp_iso  = '',
      coordinates    = {},
      mouse_aoi      = '',
      mouse_click    = false,
      eye_aoi        = '',
      left_eye_x     = '',
      left_eye_y     = '',
      right_eye_x    = '',
      right_eye_y    = '',
    } = req.body;

    if (!ENABLE_AOI_LOGGING || !session_id) {
      return res.status(200).json({ message: 'Logging disabled or missing session_id' });
    }

    if (event_type === 'session_end') {
      console.log(`Session ${session_id} ended.`);
      return res.json({ message: 'Session ended' });
    }

    const x = coordinates.x ?? '';
    const y = coordinates.y ?? '';
    const esc = (s) => String(s).replace(/,/g, ';');

    const line = [
      timestamp_iso,
      `"${esc(page)}"`,     // write page
      x,
      y,
      `"${esc(mouse_aoi)}"`,
      mouse_click,
      `"${esc(eye_aoi)}"`,
      left_eye_x,
      left_eye_y,
      right_eye_x,
      right_eye_y
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
