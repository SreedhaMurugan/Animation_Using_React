import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge, Box } from "@mui/material";
import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";

const AppHeader = () => {
  return (
    <AppBar elevation={1} sx={{ backgroundColor: "#ffe0b2", padding: "0.5rem" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand Name */}
        <Typography variant="h6" sx={{ marginLeft:'8rem',fontWeight: "bold", color: "black" }}>
          ShopEase
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "0.2rem 0.5rem",
            ml: "auto", // Pushes search box to the right
            width: "30%",
            minWidth: "200px",
          }}
        >
          <Search sx={{ color: "gray" }} />
          <InputBase placeholder="Search products..." sx={{ ml: 2, flex: 1 }} />
        </Box>

        {/* Icons Section */}
        <Box>
          <IconButton sx={{ color: "#212121" }}>
            <Badge badgeContent={3} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton sx={{ color: "#212121" }}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
