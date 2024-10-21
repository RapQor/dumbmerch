import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import dumbmerchLogo from "../../assets/dumbmerch-logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth";

const drawerWidth = 240;
const navItems = [
  { label: "Complain", path: "/complain" },
  { label: "Profile", path: "/profile" },
  { label: "Logout", path: "/logout" },
];

interface Props {
  window?: () => Window;
}

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "#0B0B0B", height: "100%" }}
    >
      <img
        style={{ height: "45px", marginTop: "10px", marginBottom: "10px" }}
        src={dumbmerchLogo}
        alt="logo"
      />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                color: location.pathname === item.path ? "#F74D4D" : "inherit",
              }}
              component={item.label === "Logout" ? "button" : Link}
              to={item.path}
              onClick={item.label === "Logout" ? handleLogout : undefined}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const toHomeHandler = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar sx={{ backgroundColor: "#0B0B0B" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <img
              style={{ height: "45px" }}
              src={dumbmerchLogo}
              alt="logo"
              onClick={toHomeHandler}
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: location.pathname === item.path ? "#F74D4D" : "#fff",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
                component={item.label === "Logout" ? "button" : Link}
                to={item.path}
                onClick={item.label === "Logout" ? handleLogout : undefined}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
