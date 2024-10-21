import { Box, Button } from "@mui/material";
import LoginForm from "../components/login/login-form";
import dumbmerchLogo from "../assets/dumbmerch-big.svg";
import easy from "../assets/easy.svg";
import go from "../assets/go.svg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const toLoginHandler = () => {
    navigate("/auth/login");
  };

  const toRegisterHandler = () => {
    navigate("/auth/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#0B0B0B",
        padding: "0 40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "Row",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70vh",
          width: "100%",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            width: "50%",
            justifyContent: "flex-start",
            display: "flex",
            alignItems: "center",
            padding: "0 60px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <img src={dumbmerchLogo} alt="logo" style={{ height: "150px" }} />
            <img src={easy} alt="logo" style={{ width: "500px" }} />
            <img src={go} alt="logo" style={{ width: "300px" }} />

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                mt: "50px",
              }}
            >
              <Button
                onClick={toLoginHandler}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#F74D4D",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  width: "120px",
                }}
              >
                Login
              </Button>
              <Button
                onClick={toRegisterHandler}
                sx={{
                  color: "#B7B7B7",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  width: "120px",
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
