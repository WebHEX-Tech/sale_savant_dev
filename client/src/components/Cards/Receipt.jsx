import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const Receipt = ({ title, icon }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ borderRadius: "5px", background: theme.palette.secondary[600], padding:'1em 0.2em', cursor:"pointer" }}
      >
        {icon}
        <Typography sx={{whiteSpace:'break-spaces'}}>{title}</Typography>
      </Box>
    </>
  );
};

export default Receipt;
