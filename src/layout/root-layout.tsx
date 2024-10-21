import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import useStore from "../store/hooks";

const RootLayout = () => {
  const { isAdmin } = useStore();

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }
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
        <Navbar />
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

export default RootLayout;
