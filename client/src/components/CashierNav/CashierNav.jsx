import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  ArrowDropDownOutlined,
  Search,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FlexBetween } from "../index.js";
import { useDispatch } from "react-redux";
import { setLogout, setMode } from "state";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Container,
  InputBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CashierNav = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredRows = () => {};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(setLogout())
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        "& .MuiToolbar-root": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.primary[800]
              : theme.palette.primary[500],
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <Container>
            <FlexBetween
              backgroundColor={theme.palette.secondary[700]}
              borderRadius="9px"
              gap="3rem"
              minWidth="300px"
              width="100%"
              p="0.5rem 1.5rem"
            >
              <InputBase
                placeholder="Search Menu Item..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <Search />
            </FlexBetween>
          </Container>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <FlexBetween>
            <Button
              onClick={(e) => handleClick(e, "user")}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <AccountCircleIcon
                fontSize="large"
                sx={{ color: theme.palette.secondary[300] }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {"Welcome!"}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {"Admin"}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default CashierNav;
