import { Box } from "@mui/material";
import AdminNavbar from "../components/navbar/admin-navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          width: "100%",
          zIndex: 1,
        }}
      >
        <AdminNavbar />
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100%",
          paddingTop: "64px",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
