import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { IProductRepository } from '@/interfaces/IProductRepository';

export function useProducts(repository: IProductRepository) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const newProduct = await repository.create(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating product');
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const updatedProduct = await repository.update(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating product');
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await repository.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product');
      throw err;
    }
  };

  const getProductsBySupplierId = async (supplierId: string) => {
    try {
      return await repository.getBySupplierId(supplierId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading supplier products');
      return [];
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsBySupplierId,
    refresh: loadProducts,
  };
}
