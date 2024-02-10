import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Header } from "components";
import React from "react";
import { Link } from "react-router-dom";

const AccountManagement = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Header title={"Account Management"} disp={"none"} />
      </Box>

      <Box margin="0 4em">
        <div>
          <Typography variant="h3">General</Typography>
          <Typography variant="subtitle1">
            View and update your general account information.
          </Typography>
        </div>

        <Box display="flex" flexDirection="column" margin="2em 0" width="50vw" gap="1.5em">
          <Box>
            <Typography variant="h5">Account Registered</Typography>
            <Typography variant="subtitle2">
              Allowed individuals to become official users of the system
            </Typography>

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
              <Typography variant="h5" color="black">
                View Account Registered
              </Typography>
              <Link to="/manager accounts">
                <Button variant="contained">View</Button>
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5">Void settings</Typography>
            <Typography variant="subtitle2">
              Allowed individuals to void orders
            </Typography>

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
              <Typography variant="h5" color="black">Void Settings</Typography>
              <Link>
                <Button variant="contained">View</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AccountManagement;
