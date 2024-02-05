import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "components";

const CustomCardComponent = ({ img, menuName, price, salesTarget }) => {
  const theme = useTheme();
  const isAvailable = salesTarget !== 0 && salesTarget !== "0";

  return (
    <Card variant="outlined" sx={{ width: 280, position:'relative' }}>
      {!isAvailable && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            zIndex: '99'
          }}
        >
          <Typography variant="h3" sx={{background:'#FF1B00', padding:'0.2em 0.5em', marginTop:'2em', borderRadius:'5px'}}>Not Available</Typography>
        </div>
      )}
      <CardMedia
        component="img"
        sx={{ height: 180 }}
        alt={menuName}
        image={`http://localhost:3001/assets/${img}`}
        loading="lazy"
      />
      <CardContent>
        <FlexBetween>
          <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <Typography variant="h6">{menuName}</Typography>
            <Typography variant="subtitle1">{`Php ${price}`}</Typography>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <Button
              variant="contained"
              sx={{ background: theme.palette.primary[500] }}
            >
              Edit
            </Button>
            <Button variant="outlined" color="error">
              Remove
            </Button>
          </div>
        </FlexBetween>
      </CardContent>
    </Card>
  );
};

export default CustomCardComponent;
