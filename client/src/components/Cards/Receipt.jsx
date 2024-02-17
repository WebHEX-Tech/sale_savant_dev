import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components";
import React from "react";

const Receipt = ({ title, icon }) => {
  const theme = useTheme();
  return (
    <>
      <Box
          margin="1em"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "95vw", md: "20vw" },
            height: "90vh",
            zIndex: 2,
            boxShadow: { xs: "none", md: "0px 4px 6px rgba(0, 0, 0, 0.2)" },
            borderRadius: "6px",
          }}
        >
          <Box
            sx={{
              background: theme.palette.grey[800],
              borderRadius: "6px 6px 0 0",
              color: "#fff",
              padding: "1em",
            }}
          >
            Receipt
          </Box>
          <Box
            sx={{
              background: theme.palette.grey[800],
              borderRadius: "0 0 6px 6px",
              color: "#fff",
              padding: "1em",
              marginTop: "auto",
            }}
          >
            <FlexBetween padding="1em">
              <Typography sx={{ color: theme.palette.secondary[600] }}>
                Subtotal
              </Typography>
              <Typography>999</Typography>
            </FlexBetween>
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "3em",
                margin: "2em",
              }}
            >
              <Button variant="contained">Select Table</Button>
              <Button variant="contained" color="success">
                Submit Order
              </Button>
            </Box>
          </Box>
        </Box>
    </>
  );
};

export default Receipt;
