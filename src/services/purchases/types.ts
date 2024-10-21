// src/types/purchase.ts

import { Product } from "../products/types";
import { UserEntity as User } from "../auth/types"; // Assuming you have a User type defined

export interface PurchaseDTO {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseCreateDTO {
  userId: number;
  productId: number;
  quantity: number;
}

export interface Purchase extends PurchaseDTO {
  product: Product;
  user: User;
}
