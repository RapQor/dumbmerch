// src/hooks/useProduct.ts

import { useState, useCallback } from "react";
import { productApi } from "./api";
import { Product, ProductCreateDTO, ProductUpdateDTO } from "./types";

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productApi.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productApi.getProductById(id);
      setProducts([response.data]);
    } catch (err) {
      setError("Failed to fetch products");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (product: ProductCreateDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productApi.createProduct(product);
      setProducts((prevProducts) => [...prevProducts, response.data.product]);
      return response.data.product;
    } catch (err) {
      setError("Failed to create product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(
    async (id: number, product: ProductUpdateDTO) => {
      setLoading(true);
      setError(null);
      try {
        const response = await productApi.updateProduct(id, product);
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === id ? response.data.product : p))
        );
        return response.data.product;
      } catch (err) {
        setError("Failed to update product");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await productApi.deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
