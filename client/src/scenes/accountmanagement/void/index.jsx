import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Header } from "components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Void = () => {
  const theme = useTheme();
  const [voidPin, setVoidPin] = useState([]);

  useEffect(() => {
    const fetchVoidPin = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/getVoid");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setVoidPin(data);
        } else {
          console.error("Failed to fetch void data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchVoidPin();
  }, []);
  return (
    <>
      <Box>
        <Header title={"Void"} disp={"none"} />
      </Box>

      <Box margin="0 4em">
        <div>
          <Typography variant="h3">Void PIN</Typography>
          <Typography variant="subtitle1">
            Personnel who has access to the Void PIN:{" "}
            <span style={{ fontWeight: "600" }}>Managers and Admin</span>
          </Typography>
        </div>

        <Box
          display="flex"
          flexDirection="column"
          margin="2em 0"
          width="50vw"
          gap="1.5em"
        >
          <Box>
            <Typography variant="h5">PIN</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              sx={{
                background: theme.palette.grey[300],
                padding: "1em 2em",
                borderRadius: "5px",
              }}
            >
              <Typography
                variant="h5"
                color="black"
                sx={{
                  background: theme.palette.grey[100],
                  padding: "0.5em 1em",
                  borderRadius: "5px",
                }}
              >
                {voidPin[0] ? voidPin[0].voidPin : ""}
              </Typography>
              <Link to="/edit void">
                <Button variant="contained">Edit</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Void;
