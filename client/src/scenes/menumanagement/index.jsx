import React from "react";
import { Card, FlexBetween, Header } from "components";
import {
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { SaleSavantLogo } from 'assets';


const MenuManagement = () => {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Header title={"Menu Management"} />
      </Box>

      <Box>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <FlexBetween>
            <Link style={{ textDecoration: "none", color:theme.palette.primary[100] }} to="/add menu">
              <Container
                sx={{
                  display: "flex",
                  gap: "0.5em",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddCircleIcon sx={{ color: "#35D03B", fontSize: "3em" }} />
                <Typography sx={{ fontSize: "1.5em" }}>Add Menu</Typography>
              </Container>
            </Link>
          </FlexBetween>

          <FlexBetween sx={{ gap: "1em" }}>
            <Link to="/menu inventory">
              <Button variant="contained" sx={{background: theme.palette.primary[400]}} >Menu Inventory</Button>
            </Link>

            <Link to="/menu loss">
              <Button variant="contained" sx={{background: theme.palette.primary[400]}} >Menu Loss</Button>
            </Link>
          </FlexBetween>
        </Toolbar>
      </Box>

      <Box sx={{display:'flex', flexWrap:'wrap', gap:'1em', margin:'1.5em'}}>
        <Card img={SaleSavantLogo} menuName={"Racks"} price={"10"} salesTarget={0}/>
        <Card img={SaleSavantLogo} menuName={"Racks"} price={"10"} salesTarget={10}/>
      </Box>

      <Box>

      </Box>
    </>
  );
};

export default MenuManagement;
