import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Header } from "components";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditLossSchema = Yup.object().shape({
    dateTime: Yup.date().required("Required"),
    menuItem: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    salesTarget: Yup.number().required("Required"),
    noSold: Yup.number().required("Required"),
    totalPrice: Yup.number().required("Required"),
    lossQuantity: Yup.number().required("Required"),
    lossPrice: Yup.number().required("Required"),
  });

const categories = ["Main Dish", "Tausug Dish", "Dessert", "Tausug Dessert"];

const EditMenuLoss = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    const fetchLossData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/menumanagement/getLoss/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          console.error("Failed to fetch dish loss data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchLossData();
  }, [id]);

  const initialValues = menuItems
    ? {
        dateTime: new Date(menuItems.dateTime).toISOString().slice(0, -8),
        menuItem: menuItems.menuItem,
        category: menuItems.category,
        salesTarget: menuItems.salesTarget,
        noSold: menuItems.noSold,
        totalPrice: menuItems.totalPrice,
        lossQuantity: menuItems.lossQuantity,
        lossPrice: menuItems.lossPrice,
      }
    : {
        dateTime: new Date().toISOString().substring(0, 16),
        menuItem: "",
        category: "",
        salesTarget: "",
        noSold: "",
        totalPrice: "",
        lossQuantity: "",
        lossPrice: "",
      };

  if (menuItems === null) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:3001/menumanagement/editLoss/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        console.log("Dish Loss updated successfully!");
        navigate("/menu loss");
      } else {
        console.error("Failed to update dish loss:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <>
      <Box>
        <Box>
          <Header title={"Edit Dishes Loss"} disp={"none"} />
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={EditLossSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form>
              <Box sx={{ margin: "2em", width: "60%" }}>
                <InputLabel htmlFor="dateTime">Date and Time</InputLabel>
                <Field
                  name="dateTime"
                  type="datetime-local"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateTime}
                  as={TextField}
                  sx={{
                    background: theme.palette.primary[700],
                    marginBottom: "1em",
                  }}
                  error={Boolean(touched.dateTime) && Boolean(errors.dateTime)}
                  helperText={touched.dateTime && errors.dateTime}
                />
                <InputLabel htmlFor="menuItem">Menu Item</InputLabel>
                <Field
                  disabled
                  name="menuItem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.menuItem}
                  as={TextField}
                  fullWidth
                  sx={{
                    background: theme.palette.primary[700],
                    marginBottom: "1em",
                  }}
                  error={Boolean(touched.menuItem) && Boolean(errors.menuItem)}
                  helperText={touched.menuItem && errors.menuItem}
                />
                <InputLabel htmlFor="category">Category</InputLabel>
                <Field
                  disabled
                  name="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  select
                  as={TextField}
                  fullWidth
                  sx={{
                    background: theme.palette.primary[700],
                    marginBottom: "1em",
                  }}
                  error={Boolean(touched.category) && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Field>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  paddingRight="10px"
                >
                </Box>
                <Box display="flex" gap="1.5em">
                  <Field
                    disabled
                    name="salesTarget"
                    label="Sales Target"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.salesTarget}
                    as={TextField}
                    fullWidth
                    margin="normal"
                    sx={{ background: theme.palette.primary[700] }}
                    error={
                      Boolean(touched.salesTarget) &&
                      Boolean(errors.salesTarget)
                    }
                    helperText={touched.salesTarget && errors.salesTarget}
                  />
                  <Field
                    disabled
                    name="noSold"
                    label="No. of Sold"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.noSold}
                    as={TextField}
                    fullWidth
                    margin="normal"
                    sx={{ background: theme.palette.primary[700] }}
                    error={Boolean(touched.noSold) && Boolean(errors.noSold)}
                    helperText={touched.noSold && errors.noSold}
                  />
                  <Field
                    name="totalPrice"
                    label="Total Price (in Php)"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.totalPrice}
                    as={TextField}
                    fullWidth
                    margin="normal"
                    sx={{ background: theme.palette.primary[700] }}
                    error={
                      Boolean(touched.totalPrice) && Boolean(errors.totalPrice)
                    }
                    helperText={touched.totalPrice && errors.totalPrice}
                  />
                </Box>
                <Box display="flex" gap="1.5em">
                  <Field
                    name="lossQuantity"
                    label="Loss Quantity"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lossQuantity}
                    as={TextField}
                    fullWidth
                    margin="normal"
                    sx={{ background: theme.palette.primary[700] }}
                    error={
                      Boolean(touched.lossQuantity) &&
                      Boolean(errors.lossQuantity)
                    }
                    helperText={touched.lossQuantity && errors.lossQuantity}
                  />
                  <Field
                    name="lossPrice"
                    label="Loss Price (in Php)"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lossPrice}
                    as={TextField}
                    fullWidth
                    margin="normal"
                    sx={{ background: theme.palette.primary[700] }}
                    error={
                      Boolean(touched.lossPrice) && Boolean(errors.lossPrice)
                    }
                    helperText={touched.lossPrice && errors.lossPrice}
                  />
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Box display="flex" flexDirection="column" gap="1em">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "120px",
                        background: "#35D03B",
                        color: theme.palette.grey[900],
                      }}
                    >
                      Edit
                    </Button>
                    <Link to="/menu loss">
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{
                          width: "120px",
                          background: theme.palette.secondary[800],
                        }}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default EditMenuLoss;
