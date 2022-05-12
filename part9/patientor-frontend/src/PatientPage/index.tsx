import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  // const match = useMatch('/patient/:id');
  // const patientId = match ? match.params.id : undefined;
  const patientId = useParams<{ id: string }>().id;

  const getPatient = async (id: string | undefined) => {
    if(id === undefined) {
      console.error('Patient is undefined');
    } else {
      try {
        const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch({ type: "SET_PATIENT", payload: patient.data });
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
    if(!patient) {
      void getPatient(patientId);
    }
  }, [dispatch, patient]);
  
  if(patient) {
    return (
      <div>
        <h2>{patient.name} ({patient.gender})</h2>
        <div>
          ssn: {patient.ssn}<br />
          occupation: {patient.occupation}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PatientPage;