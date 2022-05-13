import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { Patient } from "../types";
import PatientEntry from "../components/PatientEntry";

const PatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const patientId = useParams<{ id: string }>().id;

  const getPatient = async (id: string | undefined) => {
    if(id === undefined) {
      console.error('Patient is undefined');
    } else {
      try {
        const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatient(patient.data));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
        }
      }
    }
  };

  useEffect(() => {
    if(!patient || patient.id !== patientId) {
      void getPatient(patientId);
    }
  }, [dispatch, patientId]);
  
  if(patient && diagnoses) {
    return (
      <div>
        <h2>{patient.name} ({patient.gender})</h2>
        <div>
          ssn: {patient.ssn}<br />
          occupation: {patient.occupation}
          <h3>Entries</h3>
          {patient.entries.map(e => (
            <PatientEntry key={e.id} entry={e} />
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PatientPage;