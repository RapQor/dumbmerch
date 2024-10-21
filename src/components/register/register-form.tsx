import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate("/auth/login");
    } catch (err) {
      console.error("Register failed:", err);
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
        Register
      </Typography>
      <Box sx={{ marginTop: "auto", marginBottom: "10px" }}>
        <input
          type="text"
          id="name"
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
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
      </Box>
      <Box sx={{ marginTop: "auto", marginBottom: "10px" }}>
        <input
          type="text"
          id="email"
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
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </Box>
      <Box>
        <input
          type="password"
          id="password"
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
          onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Registering..." : "Register"}
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
