import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
//NavBar
function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: {xs:"0 10px" , md:"0 20px"}, backgroundColor:"#9966cc" }}>
        
        <Box component="img" 
        sx={{ display: "flex", 
        alignItems: "center",
        width:"150px" }}
        src="https://erino.io/wp-content/uploads/2024/07/Final-Logo.svg"
        >
        </Box>

        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" color="black">
            Contact Manager - CRM
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
