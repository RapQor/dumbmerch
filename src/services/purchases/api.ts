// src/api/purchaseApi.ts

import { AxiosResponse } from "axios";
import { api } from "../../lib/api";
import { Purchase, PurchaseCreateDTO } from "./types";

export const purchaseApi = {
  createPurchase: (
    purchase: PurchaseCreateDTO
  ): Promise<AxiosResponse<Purchase>> => {
    return api.post("/purchases", purchase);
  },

  getPurchases: (): Promise<AxiosResponse<Purchase[]>> => {
    return api.get("/purchases");
  },

  getPurchaseById: (id: number): Promise<AxiosResponse<Purchase>> => {
    return api.get(`/purchases/${id}`);
  },

  getPurchasesByUserId: (
    userId: number
  ): Promise<AxiosResponse<Purchase[]>> => {
    return api.get(`/purchases/user/${userId}`);
  },

  deletePurchase: (id: number): Promise<AxiosResponse<{ message: string }>> => {
    return api.delete(`/purchases/${id}`);
  },
};
