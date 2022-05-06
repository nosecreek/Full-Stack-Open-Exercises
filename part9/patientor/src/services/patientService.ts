import patients from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types/Patient';

const getPatient = (): Patient[] => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { getPatient, getNonSensitivePatient };