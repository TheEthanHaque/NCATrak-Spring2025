import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Get all Race options
router.get('/races', async (req, res) => {
  try {
    const races = await prisma.race.findMany();
    res.json(races);
  } catch (error) {
    console.error('Failed to fetch races:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new Race option
router.post('/races', async (req, res) => {
  try {
    const { name } = req.body;
    const newRace = await prisma.race.create({ data: { name } });
    res.status(201).json(newRace);
  } catch (error) {
    console.error('Failed to add race:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all Relationship options
router.get('/relationships', async (req, res) => {
  try {
    const relationships = await prisma.relationship.findMany();
    res.json(relationships);
  } catch (error) {
    console.error('Failed to fetch relationships:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new Relationship option
router.post('/relationships', async (req, res) => {
  try {
    const { name } = req.body;
    const newRelationship = await prisma.relationship.create({ data: { name } });
    res.status(201).json(newRelationship);
  } catch (error) {
    console.error('Failed to add relationship:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all Education Level options
router.get('/education-levels', async (req, res) => {
  try {
    const educationLevels = await prisma.educationLevel.findMany();
    res.json(educationLevels);
  } catch (error) {
    console.error('Failed to fetch education levels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new Education Level option
router.post('/education-levels', async (req, res) => {
  try {
    const { name } = req.body;
    const newEducationLevel = await prisma.educationLevel.create({ data: { name } });
    res.status(201).json(newEducationLevel);
  } catch (error) {
    console.error('Failed to add education level:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
