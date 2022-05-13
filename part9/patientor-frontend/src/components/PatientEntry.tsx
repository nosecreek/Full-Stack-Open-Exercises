import { Entry } from "../types";
import { useStateValue } from "../state";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WorkIcon from '@material-ui/icons/Work';
import FavoriteIcon from '@material-ui/icons/Favorite';

const PatientEntry = ({entry}: {entry: Entry}) => {
  const [{ diagnoses }] = useStateValue();

  const MainEntry = ({children, icon}: {children: React.ReactChild, icon?:JSX.Element }) => {
    const theIcon = icon ? icon : null;
    return (
      <div style={{ borderColor: "black", borderWidth: 1, borderStyle: "solid", padding: 5, margin: 5}}>
        {entry.date} {theIcon}<br />
        <i>{entry.description}</i>
        {children}
        <p>Diagnoses by {entry.specialist}</p>
      </div>
    );
  };

  const DiagnosesCodes = ({codes}: {codes: string[] | undefined}) => {
    if(codes) {
      const codeList = codes.map(code => {
        const codeName = diagnoses.find(d => d.code === code);
          return (codeName) ? code + ' ' + codeName.name : code;
      });
      return (
        <div>
            {codeList.map((code, i) => (
              <li key={codes[i]}>{code}</li>
            ))}
        </div>
      );
    }
    return <></>;
  };

  switch(entry.type) {
    case "Hospital":
      return (
        <MainEntry icon={<LocalHospitalIcon />}>
          <div>
            <DiagnosesCodes codes={entry.diagnosisCodes} />
            <span>To be discharged on {entry.discharge.date} on condition:<br />
            {entry.discharge.criteria}</span>
          </div>
        </MainEntry>
      );
      break;
    
    case "OccupationalHealthcare":
      const sickLeave = (entry.sickLeave) ?
        <span>On sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</span> :
        null;
      return (
        <MainEntry icon={<WorkIcon />}>
          <div>
            <span><strong>Employer:</strong> {entry.employerName}</span>
            <DiagnosesCodes codes={entry.diagnosisCodes} />
            {sickLeave}
          </div>
        </MainEntry>
      );
      break;
    
    case "HealthCheck":
      return (
        <MainEntry icon={<FavoriteIcon />}>
          <div>
            <DiagnosesCodes codes={entry.diagnosisCodes} />
            <span>Health Check Rating: {entry.healthCheckRating}</span>
          </div>
        </MainEntry>
      );
      break;

    default:
      throw new Error (
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
      );
      break;
  }
};

export default PatientEntry;