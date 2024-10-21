import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import mouse from "../assets/mouse.svg";
import MyProfile from "../components/profile/my-profile";
import MyTransaction from "../components/profile/my-transaction";
import { useAuth } from "../services/auth/hooks";
import { CurrentUserResponse } from "../services/auth/types";
import { usePurchase } from "../services/purchases/hooks";
import { Purchase } from "../services/purchases/types";

// Define the Transaction type expected by MyTransaction component
interface Transaction {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  product: {
    id: number;
    productName: string;
    price: number;
    productPicture: string;
  };
}

// Conversion function from Purchase to Transaction
const convertPurchaseToTransaction = (purchase: Purchase): Transaction => ({
  id: purchase.id,
  userId: purchase.userId,
  productId: purchase.productId,
  quantity: purchase.quantity,
  totalPrice: purchase.totalPrice,
  createdAt: purchase.createdAt,
  product: {
    id: purchase.product.id,
    productName: purchase.product.productName,
    price: purchase.product.price,
    productPicture: purchase.product.productPicture?.[0]?.url || mouse,
  },
});

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<CurrentUserResponse | null>(null);
  const { fetchPurchasesByUserId, loading, error } = usePurchase();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          console.log("Fetching purchases for user ID:", currentUser.id);
          const userPurchases = await fetchPurchasesByUserId(currentUser.id);
          console.log("Fetched user purchases:", userPurchases);
          const convertedTransactions = userPurchases.map(
            convertPurchaseToTransaction
          );
          console.log("Converted transactions:", convertedTransactions);
          setTransactions(convertedTransactions);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [getCurrentUser, fetchPurchasesByUserId]);

  if (!user) {
    return <div>User not found</div>;
  }

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box
      sx={{
        p: "50px 50px 0 50px",
        color: "white",
        flex: 1,
        bgcolor: "#0B0B0B",
      }}
    >
      <Box display="flex" flexDirection="row" gap={4}>
        <Box flex={1}>
          <MyProfile user={user} />
        </Box>
        <Box flex={1}>
          <MyTransaction purchases={transactions} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
