import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title}) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        sx={{ mb: "5px", color: theme.palette.secondary[300], fontWeight: "700", padding: "1em"}}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
