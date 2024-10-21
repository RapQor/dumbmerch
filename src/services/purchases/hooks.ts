// src/hooks/usePurchase.ts

import { useState, useCallback } from "react";
import { purchaseApi } from "./api";
import { Purchase, PurchaseCreateDTO } from "./types";

export const usePurchase = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await purchaseApi.getPurchases();
      console.log("Fetched purchases:", response.data);
      setPurchases(response.data || []);
      return response.data || [];
    } catch (err) {
      console.error("Error fetching purchases:", err);
      setError("Failed to fetch purchases");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPurchasesByUserId = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await purchaseApi.getPurchasesByUserId(userId);
      console.log("Fetched purchases for user:", userId, response.data);
      const purchasesData = response.data || [];
      setPurchases(purchasesData);
      return purchasesData;
    } catch (err) {
      console.error("Error fetching purchases for user:", userId, err);
      setError("Failed to fetch purchases for this user");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createPurchase = useCallback(async (purchase: PurchaseCreateDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await purchaseApi.createPurchase(purchase);
      console.log("Created purchase:", response.data);
      setPurchases((prevPurchases) => [...prevPurchases, response.data]);
      return response.data;
    } catch (err) {
      console.error("Error creating purchase:", err);
      setError("Failed to create purchase");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePurchase = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await purchaseApi.deletePurchase(id);
      console.log("Deleted purchase:", id);
      setPurchases((prevPurchases) => prevPurchases.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting purchase:", id, err);
      setError("Failed to delete purchase");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    purchases,
    loading,
    error,
    fetchPurchases,
    fetchPurchasesByUserId,
    createPurchase,
    deletePurchase,
  };
};
