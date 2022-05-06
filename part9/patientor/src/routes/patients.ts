import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    res.status(400).send((error instanceof Error) ? error.message : "Error");
  }
});

export default router;