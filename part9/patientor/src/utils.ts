import { Gender, NewPatient, Entry, NewEntry, BaseEntry, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !Date.parse(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};


const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  return param.type === "Hospital" || param.type === "HealthCheck" || param.type === "OccupationalHealthcare";
};

const parseEntries = (entries: unknown): Entry[] => {
  if(!entries || !Array.isArray(entries)) {
    throw new Error('Entry is not valid');
  }
  entries.forEach((e) => {
    if(!isEntry(e)) {
      throw new Error('Entry is not valid');
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation, entries }: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  return newEntry;
};

const parseString = (data: unknown): string => {
  if(!data || !isString(data)) {
    throw new Error('Incorrect or missing data');
  }

  return data;
};

const parseCodes = (codes: unknown): string[] | undefined => {
  if(!codes || !Array.isArray(codes)) {
    return undefined;
  }
  codes.forEach((c) => {
    if(!isString(c)) {
      throw new Error('Code is not valid');
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheck = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheck = (healthCheck: unknown): HealthCheckRating => {
  if(healthCheck === undefined || !isHealthCheck(healthCheck)) {
    throw new Error('Incorrect or missing Health Check value');
  }
  return healthCheck;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (leave: any): { startDate: string; endDate: string; } | undefined => {
  if(!leave || !leave.startDate || !leave.endDate) {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if(!isString(leave.startDate) || !Date.parse(leave.startDate) || !isString(leave.endDate) || !Date.parse(leave.endDate)) {
    throw new Error('Date is not valid');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return leave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): NewEntry => {
  const newEntry: Omit<BaseEntry, 'id'> = {
    description: parseString(entry.description),
    date: parseDate(entry.date),
    specialist: parseName(entry.specialist),
    diagnosisCodes: parseCodes(entry.diagnosisCodes)
  };
  switch (entry.type) {
    case "Hospital":
      return {
        ...newEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseString(entry.discharge.criteria)
        }
      };
      break;
    case "HealthCheck":
      return {
        ...newEntry,
        type: "HealthCheck",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        healthCheckRating: parseHealthCheck(parseInt(entry.healthCheckRating))
      };
      break;
    case "OccupationalHealthcare":
      return {
        ...newEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave)
      };
      break;
    default:
      throw new Error (
        "Incorrect or missing type value"
      );
  }
};