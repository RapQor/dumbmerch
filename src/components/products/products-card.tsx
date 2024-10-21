import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../services/products/types";
import mouse from "../../assets/mouse.svg";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card
      sx={{
        width: 220,
        backgroundColor: "#2B2B2B",
        color: "white",
        margin: "8px",
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={product.productPicture?.[0]?.url || mouse}
        alt={product.productName}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          color="#F74D4D"
          fontWeight={700}
          onClick={handleProductClick}
          sx={{ cursor: "pointer" }}
        >
          {product.productName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
        >
          Rp. {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
        >
          Stock: {product.stock}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
