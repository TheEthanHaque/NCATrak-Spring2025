// api/index.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execFile } from 'child_process';

import casesRouter from './routes/cases.js';
import peopleRouter from './routes/people.js';
import agenciesRouter from './routes/agencies.js';
import employeesRouter from './routes/employee.js';
import mentalhealthRouter from './routes/mentalhealth.js';
import victimsAdvocacyRouter from './routes/victimadvocacy.js';
import caseSearchRoutes from './routes/case-search.js';

// ———————— ESM __dirname shim —————————
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
// ——————————————————————————————————————————

const prisma = new PrismaClient();
const app = express();

// Toggle via env var:
//    ENABLE_AOI_LOGGING=false node index.js
const ENABLE_AOI_LOGGING = process.env.ENABLE_AOI_LOGGING !== 'false';
console.log(`AOI logging is ${ENABLE_AOI_LOGGING ? 'ENABLED' : 'DISABLED'}`);

// Prepare main log file
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

// MAIN APP HEADER: added offset_ms and key
const header = [
  'timestamp_iso',
  'offset_ms',
  'key',
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


/* ─── TASK-APP LOG SETUP ────────────────────────────────────────────────── */
// Prepare a separate folder & CSV for the task-app AOI data
const taskLogDir = path.join(logDir, 'task-app');
if (!fs.existsSync(taskLogDir)) fs.mkdirSync(taskLogDir, { recursive: true });

const taskTs       = ts;
const taskFileName = `task_${taskTs}.csv`;
const taskLogFilePath = path.join(taskLogDir, taskFileName);

// TASK APP HEADER: also includes offset_ms and key
const taskHeader = [
  'timestamp_iso',
  'offset_ms',
  'key',
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

fs.writeFileSync(taskLogFilePath, taskHeader);
/* ──────────────────────────────────────────────────────────────────────────── */

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

// existing routes
app.use('/api/cases', casesRouter);
app.use('/api/people', peopleRouter);
app.use('/api/agencies', agenciesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/mentalhealth', mentalhealthRouter);
app.use('/api/va', victimsAdvocacyRouter);
app.use('/api/case-search', caseSearchRoutes);

// ─── MAIN APP AOI ENDPOINT ────────────────────────────────────────────────
app.post('/api/aoi_event', async (req, res) => {
  try {
    const {
      session_id,
      event_type,
      page           = '',
      timestamp_iso  = '',
      offset_ms      = '',
      key            = '',
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

    const x   = coordinates.x ?? '';
    const y   = coordinates.y ?? '';
    const esc = (s) => String(s).replace(/,/g, ';');

    const line = [
      timestamp_iso,
      offset_ms,
      `"${esc(key)}"`,
      `"${esc(page)}"`,
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

    fs.appendFile(logFilePath, line, err => {
      if (err) console.error('Error writing AOI event:', err);
    });

    console.log('AOI event received:', req.body);
    res.status(200).json({ message: 'Event received' });
  } catch (err) {
    console.error('Error in /api/aoi_event:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─── TASK APP AOI ENDPOINT ────────────────────────────────────────────────
app.post('/api/task_aoi_event', async (req, res) => {
  try {
    const {
      session_id,
      event_type,
      timestamp_iso = '',
      offset_ms     = '',
      key           = '',
      coordinates   = {},
      mouse_aoi     = '',
      mouse_click   = false,
      text_input    = false,
      text_activity = '',
      targetId      = '',
      description   = '',
      eye_aoi       = '',
      left_eye_x    = '',
      left_eye_y    = '',
      right_eye_x   = '',
      right_eye_y   = '',
    } = req.body;

    // Always log task-app events
    const x   = coordinates.x ?? '';
    const y   = coordinates.y ?? '';
    const esc = (s) => String(s).replace(/,/g, ';');

    const line = [
      timestamp_iso,
      offset_ms,
      `"${esc(key)}"`,
      x,
      y,
      `"${esc(mouse_aoi)}"`,
      mouse_click,
      text_input,
      `"${esc(text_activity)}"`,
      targetId,
      description,
      `"${esc(eye_aoi)}"`,
      left_eye_x,
      left_eye_y,
      right_eye_x,
      right_eye_y
    ].join(',') + '\n';

    fs.appendFileSync(taskLogFilePath, line);

    console.log('TASK AOI event received:', req.body);
    res.status(200).json({ message: 'Task event received' });
  } catch (err) {
    console.error('Error in /api/task_aoi_event:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ─── PYTHON SMOKE-TEST ENDPOINT ─────────────────────────────────────────────
app.get('/api/python_test', (req, res) => {
  const script = path.join(__dirname, 'test_script.py');
  execFile('python3', [ script ], (err, stdout, stderr) => {
    if (err) {
      console.error('Python test error:', stderr);
      return res.status(500).json({ status: 'error', error: stderr });
    }
    res.json({ status: 'ok', message: stdout.trim() });
  });
});
// ────────────────────────────────────────────────────────────────────────────

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
