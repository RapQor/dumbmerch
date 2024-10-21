// src/api/categoryApi.ts

import { AxiosResponse } from "axios";
import { api } from "../../lib/api";
import { CategoryEntity, CategoryCreateDTO, CategoryUpdateDTO } from "./types";

export const categoryApi = {
  createCategory: (
    category: CategoryCreateDTO
  ): Promise<AxiosResponse<{ message: string; category: CategoryEntity }>> => {
    return api.post("/admin/categories", category);
  },

  getCategories: (): Promise<AxiosResponse<CategoryEntity[]>> => {
    return api.get("/admin/categories");
  },

  getCategoryById: (id: number): Promise<AxiosResponse<CategoryEntity>> => {
    return api.get(`/admin/categories/${id}`);
  },

  updateCategory: (
    id: number,
    category: CategoryUpdateDTO
  ): Promise<AxiosResponse<CategoryEntity>> => {
    return api.put(`/admin/categories/${id}`, category);
  },

  deleteCategory: (id: number): Promise<AxiosResponse<{ message: string }>> => {
    return api.delete(`/admin/categories/${id}`);
  },
};
