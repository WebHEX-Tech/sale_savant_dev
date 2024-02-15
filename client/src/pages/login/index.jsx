import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import "./login.css";
import * as image from "assets/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const loginSchema = yup.object().shape({
  userNumber: yup.string().required("required"),
  password: yup.string().required("required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValuesLogin = {
    userNumber: "",
    password: "",
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful!", data.token);
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );
        console.log("Dispatched setLogin action:", setLogin({
          user: data.user,
          token: data.token,
        }));
        
        
        if (data.user.role === "Manager") {
          navigate("/home");
        } else if (data.user.role === "Cashier") {
          navigate("/take-order");
        } else {
          console.error("Unknown role:", data.user.role);
        }
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {/* First Box with SaleSavantLogo */}
        <Container
          component="div"
          sx={{
            background: "#D4F8FC",
            boxShadow: "0 0 20px 0px rgba(0, 0, 0, 0.35)",
            width: "100%",
            maxWidth: "45%",
            height: "100vh",
            display: "flex",
            margin: "0",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "@media (max-width:430px)": {
              display: "none",
            },
          }}
        >
          <img
            src={image.SaleSavantLogo}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "400px",
            }}
            alt="SaleSavantLogo"
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: "600",
              marginBottom: "1.5em",
              color: "#B03021",
              whiteSpace: "nowrap",
              "@media (max-width:1024px)": {
                fontSize: "1.6rem",
              },
            }}
          >
            SALESAVANT
          </Typography>
        </Container>

        {/* Second Box with Form */}
        <Container
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "50%",
            height: "100vh",
            "@media (max-width: 430px)": {
              margin: "0 1em",
              maxWidth: "100%",
            },
          }}
        >
          <img
            className="mobile-logo"
            src={image.SaleSavantLogo}
            alt="SaleSavantLogo"
          ></img>
          <Typography
            variant="h2"
            sx={{
              marginBottom: "0.5em",
              fontWeight: "400",
              fontSize: "2.5rem",
              color: "#000",
              whiteSpace: "nowrap",
              textAlign: "center",
              "@media (max-width:1024px)": {
                fontSize: "2rem",
              },
              "@media (max-width: 430px)": {
                marginTop: "0",
              },
            }}
          >
            Login
          </Typography>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Box
                sx={{
                  width: "75%",
                  padding: "0 0.5rem",
                  "@media (max-width:1024px)": {
                    padding: "0",
                  },
                }}
              >
                <Form>
                  <FormControl fullWidth>
                    <TextField
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.userNumber}
                      name="userNumber"
                      label="Unique Number"
                      variant="standard"
                      error={
                        Boolean(touched.userNumber) &&
                        Boolean(errors.userNumber)
                      }
                      helperText="Input your unique number"
                      margin="dense"
                      sx={{
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#801414",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#801414",
                        },
                      }}
                    />
                    <TextField
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="password"
                      label="Password"
                      variant="standard"
                      type="password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText="Input your password"
                      margin="dense"
                      sx={{
                        marginTop: "0.8em",
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#801414",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#801414",
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        color: "#fff",
                        fontSize: "1.1em",
                        marginTop: "3em",
                        borderRadius: "20px",
                        background: "#B03021",
                        "&:hover": {
                          background: "#801414",
                        },
                      }}
                    >
                      Login
                    </Button>
                  </FormControl>
                </Form>
              </Box>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
