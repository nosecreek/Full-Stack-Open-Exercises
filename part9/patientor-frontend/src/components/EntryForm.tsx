import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField, SelectField, HealthCheckOption } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { UnionOmit, Entry, HealthCheckRating } from "../types";
import { Grid, Button, Select, MenuItem } from "@material-ui/core";
import { useState } from "react";

export type EntryFormValues = UnionOmit<Entry, 'id'>;

// const typeOptions: TypeOption[] = [
//   { value: "HealthCheck", label: "Health Check" },
//   { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
//   { value: "Hospital", label: "Hospital" },
// ];

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  display?: string;
}

const HealthCheckForm = ({onSubmit, display}: Props) => {
  const [{ diagnoses }] = useStateValue();
  
  if(display !== "HealthCheck") {
    return <></>;
  }

  return (
    <Formik initialValues={{
      description: "",
      date: "",
      specialist: "",
      type: "HealthCheck",
      healthCheckRating: HealthCheckRating.Healthy
    }} onSubmit={onSubmit} validate={(values) => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      return errors;
    }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
            <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckOptions} />

            <Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const OccupationalHealthcareForm = ({onSubmit, display}: Props) => {
  const [{ diagnoses }] = useStateValue();
  
  if(display !== "OccupationalHealthcare") {
    return <></>;
  }

  return (
    <Formik initialValues={{
      description: "",
      date: "",
      specialist: "",
      type: "OccupationalHealthcare",
      employerName: "",
      sickLeave: {
        startDate: "",
        endDate: ""
      }
    }} onSubmit={onSubmit} validate={(values) => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (values.type === "OccupationalHealthcare" && !values.employerName) {
        errors.employerName = requiredError;
      }
      return errors;
    }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
             <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
            
            <h2>Sick Leave</h2>
            <Field
              label="StartDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="EndDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />

            <Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const HospitalForm = ({onSubmit, display}: Props) => {
  const [{ diagnoses }] = useStateValue();

  if(display !== "Hospital") {
    return <></>;
  }

  return (
    <Formik initialValues={{
      description: "",
      date: "",
      specialist: "",
      type: "Hospital",
      discharge: {
        date: "",
        criteria: ""
      }
    }} onSubmit={onSubmit} validate={(values) => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      return errors;
    }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
            
            <h2>Discharge</h2>
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />

            <Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const EntryForm = ({onSubmit}: Props) => {
  const [form, setForm] = useState<string>("HealthCheck");
  
  return (
    <div>
      <h2>Add Entry</h2>
      <Select value={form} label="Entry Type" onChange={(event: React.ChangeEvent<{ name?: string, value: unknown}>): void => setForm(event.target.value as string)}>
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
      </Select>
      <br />
      <HealthCheckForm onSubmit={onSubmit} display={form} />
      <OccupationalHealthcareForm onSubmit={onSubmit} display={form} />
      <HospitalForm onSubmit={onSubmit} display={form} />
    </div>
  );
};

export default EntryForm;