import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Header } from "components";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditMenuSchema = Yup.object().shape({
  menuItem: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  description: Yup.string(),
});

const categories = ["Main Dish", "Tausug Dish", "Dessert", "Tausug Dessert", "Drinks"];

const EditMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/menumanagement/getMenu/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
        } else {
          console.error("Failed to fetch menu data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchMenuData();
  }, [id]);

  const initialValues = menuData
    ? {
        menuItem: menuData.menuItem,
        category: menuData.category,
        price: menuData.price,
        salesTarget: menuData.salesTarget,
        picturePath: menuData.picturePath,
        description: menuData.description,
      }
    : {
        menuItem: "",
        category: "",
        price: "",
        salesTarget: "",
        picturePath: "",
        description: "",
      };

  if (menuData === null) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:3001/menumanagement/editMenu/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        console.log("Menu updated successfully!");
        navigate("/menu management");
      } else {
        console.error("Failed to update menu:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <>
      <Box>
        <Box>
          <Header title={"Edit Menu"} disp={"none"} />
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={EditMenuSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form>
              <Box sx={{ margin: "0.5em 2em", width: "60%" }}>
                <img
                  src={`http://localhost:3001/assets/${initialValues.picturePath}`}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    marginBottom: "0.5rem",
                    borderRadius: "10px",
                  }}
                />
                <InputLabel htmlFor="menuItem">Menu Name</InputLabel>
                <Field
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

                <InputLabel htmlFor="price">Menu Price (in Peso)</InputLabel>
                <Field
                  name="price"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  as={TextField}
                  fullWidth
                  sx={{
                    background: theme.palette.primary[700],
                    marginBottom: "1em",
                  }}
                  error={Boolean(touched.price) && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />

                <InputLabel htmlFor="description" sx={{ marginTop: "1em" }}>
                  Description
                </InputLabel>
                <Field
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  as={TextField}
                  fullWidth
                  sx={{ background: theme.palette.primary[700] }}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  multiline
                  rows={4}
                />

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
                      Save
                    </Button>
                    <Link to="/menu management">
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

export default EditMenu;
