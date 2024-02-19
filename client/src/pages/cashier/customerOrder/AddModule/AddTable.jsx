import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const initialValues = {
  tableNo: "",
  pax: 0,
  status: "Vacant",
};

const validationSchema = Yup.object().shape({
  tableNo: Yup.string().required("Table Number is required"),
  pax: Yup.number().min(2, "Pax must be at least 2").required("Pax is required"),
});

const AddTableDialog = ({ open, handleClose, handleSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Table</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{display:"flex", flexDirection:"column", gap:"1em", margin:"1em 0"}}>
              <Field name="tableNo" as={TextField} label="Table Number" error={errors.tableNo && touched.tableNo} helperText={errors.tableNo} fullWidth />
              <Field name="pax" type="number" as={TextField} label="Pax" error={errors.pax && touched.pax} helperText={errors.pax} fullWidth />
              <Field name="status" type="text" as={TextField} label="Status" fullWidth disabled />
              <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="success">Add</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddTableDialog;
