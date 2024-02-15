import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Card as ItemCard, FlexBetween } from "components";
import React, { useEffect, useState } from "react";
import { useGetMenuQuery } from "state/api";

const OrderMenu = () => {
  const theme = useTheme();
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/menumanagement/menu"
        );
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
        } else {
          console.error("Failed to fetch menu data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const { data } = useGetMenuQuery();

  useEffect(() => {
    if (data) {
      setMenuData(data);
    }
  }, [data]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredMenuData =
    selectedCategory === "All"
      ? menuData.filter((menu) =>
          menu.menuItem.toLowerCase().includes(searchValue.toLowerCase())
        )
      : menuData.filter(
          (menu) =>
            menu.category === selectedCategory &&
            menu.menuItem.toLowerCase().includes(searchValue.toLowerCase())
        );

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      width="100%"
    >
      <Box
        position={{ xs: "relative", md: "fixed" }}
        margin="1em"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "95vw", md: "20vw" },
          height: "90vh",
          zIndex: 2,
          boxShadow: { xs: "none", md: "0px 4px 6px rgba(0, 0, 0, 0.2)" },
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            background: theme.palette.grey[800],
            borderRadius: "6px 6px 0 0",
            color: "#fff",
            padding: "1em",
          }}
        >
          Receipt
        </Box>
        <Box
          sx={{
            background: theme.palette.grey[800],
            borderRadius: "0 0 6px 6px",
            color: "#fff",
            padding: "1em",
            marginTop: "auto",
          }}
        >
          <FlexBetween padding="1em">
            <Typography sx={{color:theme.palette.secondary[600]}}>Subtotal</Typography>
            <Typography>999</Typography>
          </FlexBetween>
          <Divider />

          <Box sx={{display:'flex', justifyContent:'center', gap:'3em', margin:'2em'}}>
            <Button variant="contained">Select Table</Button>
            <Button variant="contained" color="success">Submit Order</Button>
          </Box>
        </Box>
      </Box>
      
      <Box flex="1" margin="3em" marginLeft={{ xs: 0, md: "20vw" }}>
        <Box>
          <Toolbar
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              flexWrap: "wrap",
              flexDirection: { xs: "column", sm: "row", lg: "row" },
            }}
          >
            <FlexBetween>
              <Button
                variant="contained"
                sx={{
                  background: theme.palette.secondary[600],
                  fontSize: "1.2em",
                  color: theme.palette.primary[100],
                }}
              >
                Select Table
              </Button>
            </FlexBetween>

            <FlexBetween
              sx={{
                gap: "1em",
                marginTop: { xs: "2em", sm: "0", lg: "0" },
                flexWrap: { xs: "wrap", sm: "wrap", lg: "nowrap" },
                whiteSpace: "nowrap",
              }}
            >
              {/* Sorting Category Select */}
              <Box>
                <FormControl>
                  <InputLabel
                    id="category-label"
                    sx={{ color: theme.palette.primary[200] }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    label="Category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    sx={{
                      width: "180px",
                      border: theme.palette.secondary[300],
                      color: theme.palette.primary[200],
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Main Dish">Main Dish</MenuItem>
                    <MenuItem value="Tausug Dish">Tausug Dish</MenuItem>
                    <MenuItem value="Dessert">Dessert</MenuItem>
                    <MenuItem value="Tausug Dessert">Tausug Dessert</MenuItem>
                    <MenuItem value="Drinks">Drinks</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Container sx={{ padding: "0 !important" }}>
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
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  <Search />
                </FlexBetween>
              </Container>
            </FlexBetween>
          </Toolbar>
        </Box>

        {isLoading || !menuData.length ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1em",
                margin: "1.5em",
              }}
            >
              {[...Array(16).keys()].map((index) => (
                <Card
                  sx={{ width: 280, background: theme.palette.primary[400] }}
                >
                  <Skeleton
                    sx={{ height: 180 }}
                    animation="wave"
                    variant="rectangular"
                  />
                  <CardContent>
                    <FlexBetween>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1em",
                          width: "100%",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="text"
                          height={40}
                          width="80%"
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          height={40}
                          width="50%"
                        />
                      </div>
                    </FlexBetween>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1em",
              margin: "1.5em",
            }}
          >
            {filteredMenuData.map((menu) => (
              <ItemCard
                key={menu._id}
                img={menu.picturePath}
                menuName={menu.menuItem}
                price={menu.price}
                salesTarget={menu.salesTarget}
                menuId={menu._id}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderMenu;
