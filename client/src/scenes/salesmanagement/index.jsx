import { Box, Button, Toolbar, useTheme } from "@mui/material";
import { FlexBetween, Header } from "components";
import React from "react";
import { useNavigate } from "react-router-dom";

const SalesManagement = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClickLink = (link) => navigate(link);

  return (
    <>
      <Header title={"Sales Tracking"} disp={"none"} />
      <Toolbar>
        <FlexBetween>
            <div style={{display:"flex", gap:"2em"}}>
                <Button variant="contained" sx={{background:theme.palette.primary[600], fontSize:"1.1em"}}>
                    Sales
                </Button>
                <Button variant="contained" onClick={() => handleClickLink("/sales management/order-sales")} sx={{fontSize:"1.1em"}}>
                    Order Sales
                </Button>
                <Button variant="contained" onClick={() => handleClickLink("")} sx={{fontSize:"1.1em"}}>
                    Refunded
                </Button>
                <Button variant="contained" onClick={() => handleClickLink("/sales management/expenses")} sx={{fontSize:"1.1em"}}>
                    Expenses
                </Button>
            </div>
        </FlexBetween>
      </Toolbar>
      <Box>

      </Box>
    </>
  );
};

export default SalesManagement;
