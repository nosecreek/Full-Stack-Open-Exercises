import diagnoses from '../../data/diagnoses.json';
import { Diagnose } from '../types/Diagnose';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default { getDiagnoses };