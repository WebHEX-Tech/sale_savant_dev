import { Box } from '@mui/material';
import { FlexBetween, Header } from 'components';
import React from 'react'
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const RepSales = () => {
  const theme = useTheme();


  return (
    <Box>
        <Header title={"Report Sales"} disp={"none"} />
      </Box>

      
  )
}

export default RepSales;