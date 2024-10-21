// src/hooks/useCategories.ts

import { useState, useEffect, useCallback } from "react";
import { CategoryEntity, CategoryCreateDTO, CategoryUpdateDTO } from "./types";
import { categoryApi } from "./api";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getCategories();
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (category: CategoryCreateDTO) => {
    try {
      const response = await categoryApi.createCategory(category);
      const newCategory = response.data.category;
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError("Failed to create category");
      throw err;
    }
  };

  const updateCategory = async (id: number, category: CategoryUpdateDTO) => {
    try {
      const response = await categoryApi.updateCategory(id, category);
      const updatedCategory = response.data;
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      return updatedCategory;
    } catch (err) {
      setError("Failed to update category");
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryApi.deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      setError("Failed to delete category");
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
