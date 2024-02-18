import { Box, Button, Typography, useTheme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { FlexBetween } from "components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tables } from "./OrderMenu";

const ModifyTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const tableData = tables;

  const handleButtonClick = (link) => {
    navigate(link);
  };

  return (
    <Box margin="3em">
      <FlexBetween>
        <div style={{ display: "flex", gap: "3em" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5em",
            }}
          >
            <CircleIcon sx={{ color: "#1BD7EC", fontSize: "2.5em" }} />
            <Typography variant="h4"> Vacant</Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5em",
            }}
          >
            <CircleIcon sx={{ color: "#B03021", fontSize: "2.5em" }} />
            <Typography variant="h4"> Occupied</Typography>
          </div>
        </div>

        <div style={{ display: "flex", gap: "2em" }}>
          <Button
            variant="contained"
            onClick={() => handleButtonClick("/take-order")}
          >
            Take Order
          </Button>
          <Button variant="contained">Orders</Button>
          <Button variant="contained">Refunds</Button>
          <Button variant="contained" color="success">
            Modify Table
          </Button>
        </div>
      </FlexBetween>

      <Box display="flex" flexWrap="wrap" sx={{ background: theme.palette.secondary[800], margin: "1.5em 0", padding:"1em", borderRadius:"5px" }}>
        {/* Table Container */}
        {tables.map((table, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="2em"
            sx={{
              background: table.status === "Occupied" ? "#B03021" : "#1BD7EC",
              color: "#000",
              padding: "1em",
              borderRadius: "8px",
              margin: "0.5em",
              maxWidth: `${table.pax * 70}px`, 
              width: "100%", 
              textAlign: "center",
            }}
          >
            <div>
              <Typography variant="h5">Table</Typography>
              <Typography variant="h2">{table.value}</Typography>
            </div>
            <Typography variant="body1">Pax: {table.pax}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ModifyTable;
