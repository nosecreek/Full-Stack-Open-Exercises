import diagnoses from '../../data/diagnoses.json';
import { DiagnosesEntry } from '../types/diagnosesEntry';

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default { getDiagnoses };