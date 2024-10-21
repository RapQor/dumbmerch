import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth";
import useStore from "../../store/hooks";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const { isAdmin, isLogin } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      console.log("isAdmin in Login", isAdmin);
      if (isAdmin) {
        if (isLogin) {
          navigate("/admin/category");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "350px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#181818",
        padding: "10px 20px",
        borderRadius: "10px",
        gap: "10px",
      }}
    >
      <Typography
        variant="h5"
        color="#FFFFFF"
        fontWeight={700}
        sx={{ alignItems: "flex-start", marginTop: "20px" }}
      >
        Login
      </Typography>
      <Box sx={{ marginTop: "auto", marginBottom: "10px" }}>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "#555555",
            color: "#BCBCBC",
            borderRadius: "3px",
            border: "2px solid #BCBCBC",
            fontSize: "11px",
            paddingLeft: "10px",
          }}
          placeholder="Email"
          name="email"
        />
      </Box>
      <Box>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "#555555",
            color: "#BCBCBC",
            borderRadius: "3px",
            border: "2px solid #BCBCBC",
            fontSize: "11px",
            paddingLeft: "10px",
          }}
          placeholder="Password"
          name="password"
        />
      </Box>
      <Box sx={{ width: "100%", marginTop: "auto", marginBottom: "10px" }}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "35px",
            backgroundColor: "#F74D4D",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#F74D4D",
            },
            textTransform: "capitalize",
            fontWeight: 700,
            marginTop: "10px",
            alignItems: "center",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
