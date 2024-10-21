import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import useStore from "../store/hooks";
import { Navigate } from "react-router-dom";
import ProductCard from "../components/products/products-card";
import { useProduct } from "../services/products/hooks";

const UserShop: React.FC = () => {
  const { isLogin } = useStore();
  const { products, loading, error, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!isLogin) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        padding: "50px",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#0B0B0B",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h6" color="#F74D4D" fontWeight={700} mb={2}>
        Product
      </Typography>
      <Box
        sx={{
          width: "100%",
          padding: "12px 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        {loading && <Typography color="white">Loading...</Typography>}
        {error && <Typography color="white">Error: {error}</Typography>}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default UserShop;
