import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const id: string = uuid();
  const newEntry: Entry = {
    id: id,
    ...entry
  };

  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry)
  };

  const patientIndex = patients.findIndex(p => p.id === patient.id);
  patients[patientIndex] = updatedPatient;
  return updatedPatient;
};

export default { getPatients, getPatient, getNonSensitivePatients, addPatient, addEntry };