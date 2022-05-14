import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField, SelectField, TypeOption, HealthCheckOption } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { UnionOmit, Entry, HealthCheckRating } from "../types";
import { Grid, Button } from "@material-ui/core";

export type EntryFormValues = UnionOmit<Entry, 'id'>;

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const EntryForm = ({onSubmit}: Props) => {
  const [{ diagnoses }] = useStateValue();
  
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
            <SelectField label="Type" name="type" options={typeOptions} />
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

export default EntryForm;