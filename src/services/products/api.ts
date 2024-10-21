// src/api/productApi.ts

import { AxiosResponse } from "axios";
import { api } from "../../lib/api";
import { Product, ProductCreateDTO, ProductUpdateDTO } from "./types";

export const productApi = {
  createProduct: (
    product: ProductCreateDTO
  ): Promise<AxiosResponse<{ message: string; product: Product }>> => {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (key === "productPicture" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
    return api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getProducts: (): Promise<AxiosResponse<Product[]>> => {
    return api.get("/products");
  },

  getProductById: (id: number): Promise<AxiosResponse<Product>> => {
    return api.get(`/products/${id}`);
  },

  updateProduct: (
    id: number,
    product: ProductUpdateDTO
  ): Promise<AxiosResponse<{ message: string; product: Product }>> => {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (key === "productPicture" && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    return api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteProduct: (id: number): Promise<AxiosResponse<{ message: string }>> => {
    return api.delete(`/products/${id}`);
  },
};
