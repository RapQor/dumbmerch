import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import dumbmerch from "../../assets/dumbmerch-logo.svg";

interface Product {
  id: number;
  productName: string;
  price: number;
  productPicture: string;
}

interface Purchases {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  product: Product;
}

interface MyPurchasesProps {
  purchases: Purchases[];
}

const MyTransaction: React.FC<MyPurchasesProps> = ({ purchases }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("us-US", options);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "85vh",
      }}
    >
      <Typography
        variant="h5"
        color="#F74D4D"
        gutterBottom
        marginBottom={2}
        fontWeight={700}
      >
        My Transaction
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          padding: "10px",
        }}
      >
        {purchases.map((purchase) => (
          <Card
            key={purchase.id}
            sx={{
              display: "flex",
              marginBottom: 2,
              bgcolor: "#303030",
              color: "white",
              overflow: "visible",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 150, height: 200 }}
              image={purchase.product.productPicture}
              alt={purchase.product.productName}
            />
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <Typography variant="h6" color="#F74D4D" fontWeight={700}>
                    {purchase.product.productName}
                  </Typography>
                  <Typography variant="body2" color="#F74D4D">
                    {formatDate(purchase.createdAt)}
                  </Typography>

                  <Typography mt={1} fontWeight="normal" color="#FFFFFF">
                    Price: Rp.{" "}
                    {purchase.product.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    ({purchase.quantity} pcs)
                  </Typography>
                  <Typography mt="auto" fontWeight="bold">
                    Sub Total : Rp.{" "}
                    {purchase.totalPrice
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    margin: "auto",
                    width: "50%",
                  }}
                >
                  <img
                    src={dumbmerch}
                    alt="dumb merch logo"
                    width={80}
                    height={80}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MyTransaction;
