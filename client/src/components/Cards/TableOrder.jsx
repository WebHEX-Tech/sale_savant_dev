import { Box, Typography, useTheme } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PaymentsIcon from "@mui/icons-material/Payments";
import ClassIcon from '@mui/icons-material/Class';
import React from "react";

const TableOrder = ({ tableNo, orderNo, orderType, totalAmount, status }) => {
    const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: status === "Paid" ? "#1BD7EC" : "#FF5A5A",
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "20px",
        textAlign: "center",
        height: "50vh",
        margin: "1em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1em" }}>
          Table
        </Typography>
        <Typography variant="h1" fontWeight="500">
          {tableNo}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom:"0.5em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #000",
            background: theme.palette.primary[800],
            borderRadius: "5px",
            padding: "10px",
            width: "52%",
            whiteSpace:'nowrap'
          }}
        >
          <Typography variant="h6">Order #</Typography>
          <Typography variant="body1">{orderNo}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #000",
            background: theme.palette.primary[800],
            borderRadius: "5px",
            padding: "10px",
            width: "46%",
          }}
        >
          <ClassIcon />
          <Typography variant="body1">{orderType}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #000",
            background: theme.palette.primary[800],
            borderRadius: "5px",
            padding: "10px",
            width: "55%",
          }}
        >
          <PaymentsIcon />
          <Typography variant="body1">Php {totalAmount}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #000",
            background: theme.palette.primary[800],
            borderRadius: "5px",
            padding: "10px",
            width: "43%",
          }}
        >
          <PointOfSaleIcon />
          <Typography variant="body1">{status}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TableOrder;
