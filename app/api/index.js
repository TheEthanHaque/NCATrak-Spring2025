import express from 'express';
import { PrismaClient } from '@prisma/client';
import casesRouter from './routes/cases.js';
import peopleRouter from './routes/people.js';
import agenciesRouter from './routes/agencies.js';
import employeesRouter from './routes/employee.js';
import mentalhealthRouter from './routes/mentalhealth.js';
import victimsAdvocacyRouter from './routes/victimadvocacy.js';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Inject Prisma into the request
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Routes
app.use('/api/cases', casesRouter);
app.use('/api/people', peopleRouter);
app.use('/api/agencies', agenciesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/mentalhealth', mentalhealthRouter);
app.use('/api/va', victimsAdvocacyRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;