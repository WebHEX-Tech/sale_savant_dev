import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Header } from "components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { baseUrl } from "state/api";

const Void = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [voidPin, setVoidPin] = useState([]);
  const [isPinVisible, setIsPinVisible] = useState(false);
  // eslint-disable-next-line
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchVoidPin = async () => {
      try {
        const response = await fetch(`${baseUrl}auth/getVoid`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setVoidPin(data);
        } else {
          console.error("Failed to fetch void data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchVoidPin();
  }, []);

  const togglePinVisibility = () => {
    setIsPinVisible(!isPinVisible);
  };

  const handleEdit = (id) => {
    setSelectedItemId(id);
    navigate(`/edit void/${id}`);
  };

  return (
    <>
      <Box>
        <Header title={"Void"} link={"/account management"} />
      </Box>

      <Box margin="0 4em">
        <div>
          <Typography variant="h3">Void PIN</Typography>
          <Typography variant="subtitle1">
            Personnel who has access to the Void PIN:{" "}
            <span style={{ fontWeight: "600" }}>Managers and Admin</span>
          </Typography>
        </div>

        <Box
          display="flex"
          flexDirection="column"
          margin="2em 0"
          gap="1.5em"
          sx={{width:{xs:'100%', md:'60vw', lg:'50vw'}}}
        >
          <Box>
            <Typography variant="h5">PIN</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              gap="1em"
              sx={{
                background: theme.palette.grey[300],
                padding: "1em 2em",
                borderRadius: "5px",
              }}
            >
              <Typography
                variant="h5"
                color="black"
                sx={{
                  display:"flex",
                  background: theme.palette.grey[100],
                  padding: "0.5em 1em",
                  borderRadius: "5px",
                  gap:'2em'
                }}
              >
                {isPinVisible ? (voidPin[0] ? voidPin[0].voidPin : "") : "******"} 
                
                <Button onClick={togglePinVisibility} variant="outlined" sx={{ minWidth: 0, padding: 0, color:theme.palette.primary[300] }}> 
                {isPinVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Button>
              </Typography>
              
              <Button variant="contained" onClick={() => handleEdit(voidPin[0]._id)}>Edit</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Void;
