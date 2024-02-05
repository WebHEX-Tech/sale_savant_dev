import { Typography, Box, useTheme } from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title, link, disp }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center">
      <Box display={disp}>
        <Link to={link}>
          <ArrowCircleLeftRoundedIcon
            sx={{
              color: theme.palette.secondary[300],
              fontSize: "4em",
              marginLeft: "0.5em",
            }}
          />
        </Link>
      </Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        sx={{
          mb: "5px",
          color: theme.palette.secondary[300],
          fontWeight: "700",
          padding: "1em",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
