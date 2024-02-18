import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import * as image from "assets/index.js";
import React from "react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: <ShoppingCartIcon />, name: "Orders" },
  { icon: <ProductionQuantityLimitsIcon />, name: "Refunds" },
  { icon: <TableRestaurantIcon />, name: "Modify Table" },
];

const NewOrder = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleOrderClick = (link) => {
    navigate(link);
  };

  const handleDialClick = (action, number) => {
    switch (action) {
      case "Orders":
        navigate("/checkout-orders");
        break;
      case "Refunds":
        navigate("/refund-orders");
        break;
      case "Modify Table":
        navigate("/modify-table");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: { xs: "2em", md: "4em 8em", lg: "4em 10em" } }}
      height="80vh"
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: theme.palette.grey[300],
        }}
      >
        <img
          src={image.SaleSavantLogo}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "380px",
            padding: "0 2em",
          }}
          alt="SaleSavantLogo"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h1"
            component="div"
            sx={{ color: theme.palette.secondary[400], fontWeight: "600", fontSize:{xs:"2em", md:"2.5em", lg:"3em"}, textAlign:'center' }}
          >
            Order Placed Successfully!
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            gap: { xs: "1em", md: "5em", lg: "10em" },
            whiteSpace: "nowrap",
          }}
        >
          <Button
            sx={{
              fontSize: "1.2em",
              padding: "0.5em 1.5em",
              background: theme.palette.primary[600],
              color: theme.palette.secondary[500],
              fontWeight: "bold",
            }}
            variant="contained"
            onClick={() => {
              handleOrderClick("/home-cashier")
            }}
          >
            New Order
          </Button>
        </CardActions>
        <SpeedDial
          ariaLabel="Menu"
          sx={{ position: "absolute", top: 16, right: 16 }}
          icon={<SpeedDialIcon openIcon={<RestaurantMenuIcon />} />}
          direction="down"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleDialClick(action.name)}
            />
          ))}
        </SpeedDial>
      </Card>
    </Box>
  );
};

export default NewOrder;
