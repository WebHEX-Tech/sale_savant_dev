import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  ListSubheader,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Header } from "components";
import { Link, useNavigate } from "react-router-dom";

const AddPromoSchema = Yup.object().shape({
  promoName: Yup.string().required("Required"),
  menuItem: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  promoDesc: Yup.string(),
  pricePromo: Yup.number().required("Required"),
  validDate: Yup.date().required("Required"),
  noSold: Yup.number(),
});

const categories = ["Main Dish", "Tausug Dish", "Dessert", "Tausug Dessert", "Drinks"];

const AddPromo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [menuItems, setMenuItems] = useState([]);
  // eslint-disable-next-line
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/menumanagement/menu"
        );
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          console.error("Failed to fetch menu:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleMenuItemChange = async (value, setValues) => {
    const selectedMenu = menuItems.find((menu) => menu.menuItem === value);

    if (selectedMenu) {
      setValues({
        ...selectedMenu,
        pricePromo: selectedMenu.price,
      });
    }

    setSelectedMenuItem(value);
  };

  const groupedMenuItems = categories.reduce((acc, category) => {
    const categoryItems = menuItems
      .filter((menuItem) => menuItem.category === category)
      .sort((a, b) => a.menuItem.localeCompare(b.menuItem));
    return { ...acc, [category]: categoryItems };
  }, {});

  const initialValues = {
    promoName: "",
    menuItem: "",
    category: "",
    promoDesc: "",
    pricePromo: "",
    validDate: "",
    noSold: 0,
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:3001/menumanagement/addPromo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        console.log("Promo added successfully!");
        navigate("/menu promos");
      } else {
        console.error("Failed to add promo:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <>
      <Box>
        <Box>
          <Header title={"Add Promo"} disp={"none"} />
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={AddPromoSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setValues,
          }) => (
            <Form>
              <Box sx={{ margin: "0 2em", width: "60%" }}>
                <InputLabel htmlFor="promoName">Promo Name</InputLabel>
                <Field
                  name="promoName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.promoName}
                  as={TextField}
                  fullWidth
                  sx={{
                    background: theme.palette.primary[700],
                    marginBottom: "1em",
                  }}
                  error={
                    Boolean(touched.promoName) && Boolean(errors.promoName)
                  }
                  helperText={touched.promoName && errors.promoName}
                />
                <InputLabel htmlFor="menuItem">Menu Item</InputLabel>
                <Field
                  name="menuItem"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleMenuItemChange(e.target.value, setValues);
                  }}
                  value={values.menuItem}
                  as={TextField}
                  fullWidth
                  select
                  sx={{
                    background: theme.palette.primary[700],
                    marginBottom: "1em",
                  }}
                  error={Boolean(touched.menuItem) && Boolean(errors.menuItem)}
                  helperText={touched.menuItem && errors.menuItem}
                >
                  {Object.entries(groupedMenuItems).map(([category, items]) => [
                    <ListSubheader
                      key={`category-${category}`}
                      sx={{
                        background: theme.palette.primary[500],
                        color: theme.palette.secondary[400],
                        fontWeight: "bold",
                      }}
                    >
                      {category}
                    </ListSubheader>,
                    ...items.map((menuItem) => (
                      <MenuItem
                        key={menuItem.menuItem}
                        value={menuItem.menuItem}
                      >
                        {menuItem.menuItem}
                      </MenuItem>
                    )),
                  ])}
                </Field>
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

                <Divider sx={{ margin: "1.5em 0" }} />
                <Typography variant="h4" sx={{ marginBottom: "1em" }}>
                  Validation and Price
                </Typography>

                <Box display="flex" gap="2em" >
                  <Box>
                    <InputLabel htmlFor="validDate">Valid Until</InputLabel>
                    <Field
                      name="validDate"
                      type="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.validDate}
                      as={TextField}
                      sx={{
                        background: theme.palette.primary[700],
                        width: "300px",
                        marginBottom: "1em",
                      }}
                      error={
                        Boolean(touched.validDate) && Boolean(errors.validDate)
                      }
                      helperText={touched.validDate && errors.validDate}
                    />
                    <InputLabel htmlFor="validDate">Price (in Php)</InputLabel>
                    <Field
                      name="pricePromo"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pricePromo}
                      as={TextField}
                      fullWidth
                      sx={{
                        background: theme.palette.primary[700],
                        width: "300px",
                        marginBottom: "1em",
                      }}
                      error={
                        Boolean(touched.pricePromo) &&
                        Boolean(errors.pricePromo)
                      }
                      helperText={touched.pricePromo && errors.pricePromo ? errors.pricePromo : "Change current price to a discounted price"}
                    />
                  </Box>

                  <Box width="100%">
                    <InputLabel htmlFor="validDate">
                      Promo Description
                    </InputLabel>
                    <Field
                      name="promoDesc"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.promoDesc}
                      as={TextField}
                      fullWidth
                      sx={{ background: theme.palette.primary[700] }}
                      error={
                        Boolean(touched.promoDesc) && Boolean(errors.promoDesc)
                      }
                      helperText={touched.promoDesc && errors.promoDesc}
                      multiline
                      rows={5}
                    />
                  </Box>
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
                      Add
                    </Button>
                    <Link to="/menu promos">
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

export default AddPromo;
