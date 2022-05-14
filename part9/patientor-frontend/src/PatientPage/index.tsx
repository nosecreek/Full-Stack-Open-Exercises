import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from "../state";
import { Patient } from "../types";
import PatientEntry from "../components/PatientEntry";
import EntryForm, { EntryFormValues } from '../components/EntryForm';

const PatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const patientId = useParams<{ id: string }>().id;

  const submitNewEntry = async (values: EntryFormValues) => {
    if(patientId === undefined) {
      console.error('Patient is undefined');
    } else {
      try {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          values
        );
        dispatch(addEntry(updatedPatient));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          // setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          // setError("Unknown error");
        }
      }
    }
  };

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
        <EntryForm onSubmit={submitNewEntry} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PatientPage;