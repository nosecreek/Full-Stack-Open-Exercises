import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if(patient === undefined) {
    res.status(400).send("Invalid ID or patient not found");
  }
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    res.status(400).send((error instanceof Error) ? error.message : "Error");
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patient = patientService.getPatient(req.params.id);
    if(patient === undefined) {
      res.status(400).send("Invalid ID or patient not found");
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const updatedPatient = patientService.addEntry(patient!, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    res.status(400).send((error instanceof Error) ? error.message : "Error");
  }
});

export default router;