import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../services/products/hooks";
import { usePurchase } from "../services/purchases/hooks";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import mouse from "../assets/mouse.svg";
import { useAuth } from "../services/auth";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, fetchProductsById } = useProduct();
  const { createPurchase } = usePurchase();
  const [quantity, setQuantity] = useState(1);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    if (id) {
      fetchProductsById(Number(id));
    }
  }, [id, fetchProductsById]);

  const product = products[0];

  if (!product) {
    return <Typography color="white">Product not found</Typography>;
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleBuy = async () => {
    if (!product) return;

    const user = await getCurrentUser();

    const userId = Number(user?.id); // Replace this with the actual logged-in user's ID
    const purchase = {
      userId,
      productId: product.id,
      quantity,
    };

    try {
      await createPurchase(purchase);
      alert("Purchase successful!");
      // You might want to redirect the user or update the UI here
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0B0B0B",
        color: "white",
        padding: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "70vh",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={product.productPicture?.[0]?.url || mouse}
            alt={product.productName}
            style={{
              maxWidth: "500px",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h3" color="#F74D4D" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="body1" color="white" gutterBottom mb={5}>
              Stock: {product.stock}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" color="white" paragraph>
                - {product.specification}
              </Typography>
            </Box>
            <Typography variant="body1" color="white" sx={{ mt: 2 }}>
              {product.detail}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                sx={{ color: "#F74D4D" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" sx={{ mx: 2 }}>
                {quantity}
              </Typography>
              <IconButton
                onClick={() => handleQuantityChange(1)}
                sx={{ color: "#F74D4D" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              color="#F74D4D"
              gutterBottom
              fontWeight={700}
            >
              Rp.{" "}
              {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={handleBuy}
          sx={{
            mt: 2,
            backgroundColor: "#F74D4D",
            "&:hover": {
              backgroundColor: "#D32F2F",
            },
            width: "50%",
            mb: 3,
            color: "#FFFFFF",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
