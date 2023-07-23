import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: "darkblue",
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink
              to={"/"}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: "white",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              Form
            </NavLink>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink
              to={"/results"}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: "white",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              Results
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
