import { Box, Typography, useTheme } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PaymentsIcon from "@mui/icons-material/Payments";
import ClassIcon from "@mui/icons-material/Class";
import React from "react";

const TableOrder = ({
  tableNo,
  orderNo,
  orderType,
  totalAmount,
  status,
  onClick,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    onClick();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: status === "Paid" ? "#8AF4BA" : "#F4CFCF",
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "20px",
        textAlign: "center",
        height: "50vh",
        margin: "1em",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
          zIndex: "2",
        }}
      >
        {tableNo !== "Take-out" && (
          <Typography variant="h4" sx={{ marginBottom: "1em" }}>
            Table
          </Typography>
        )}
        <Typography variant="h1" fontWeight="500">
          {tableNo}
        </Typography>
        {tableNo === "Take-out" && (
          <Typography variant="h2" sx={{ marginTop: "1em" }}>
            Order No. {orderNo}
          </Typography>
        )}
      </Box>

      {tableNo !== "Take-out" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5em",
            zIndex: "2",
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
              whiteSpace: "nowrap",
            }}
          >
            <Typography variant="h6">Order No.</Typography>
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
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          zIndex: "2",
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
