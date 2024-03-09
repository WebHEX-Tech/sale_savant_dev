import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Header } from "components";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const ChangePassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/auth/getAccount/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAccount(data);
        } else {
          console.error("Failed to fetch account data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchInventoryData();
  }, [id]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const initialValues = account
    ? {
        userName: account.userName,
        role: account.role,
        userNumber: account.userNumber,
        password: "",
      }
    : {
        userName: "",
        role: "",
        userNumber: "",
        password: "",
      };

  if (account === null) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:3001/auth/updatePassword/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        console.log("Account updated successfully!");
        setSuccessModalOpen(true);
        setTimeout(() => {
          setSuccessModalOpen(false);
          navigate("/manager accounts");
        }, 1500);
      } else {
        console.error("Failed to update account:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <>
      <Box>
        <Header title={"Account Management"} disp={"none"} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: theme.palette.background.alt,
            width: "100%",
            margin: { xs: "0 2em", md: "0 6em" },
            padding: "3em",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h2" sx={{ color: theme.palette.grey[800] }}>
            Change Password
          </Typography>

          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={ChangePasswordSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form>
                  <Box sx={{ margin: { xs: "2em 1em", md: "2em 10em" } }}>
                    <InputLabel htmlFor="password">New Password</InputLabel>
                    <Field
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      as={TextField}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      sx={{
                        background: theme.palette.primary[700],
                        marginBottom: "1em",
                      }}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <InputLabel htmlFor="confirmPassword">
                      Confirm Password
                    </InputLabel>
                    <Field
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      as={TextField}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      sx={{
                        background: theme.palette.primary[700],
                        marginBottom: "1em",
                      }}
                      error={
                        Boolean(touched.confirmPassword) &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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

                        <Link to="/manager accounts">
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
        </Box>
      </Box>

      {successModalOpen && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "1em",
            borderRadius: "10px",
            color: "green",
          }}
        >
          <Typography
            variant="h3"
            display="flex"
            alignItems="center"
            gap="0.5em"
          >
            <TaskAltIcon sx={{ fontSize: "1.5em" }} />
            Password Changed Successfully 
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ChangePassword;