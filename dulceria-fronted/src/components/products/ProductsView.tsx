"use client";

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { productRepository } from '@/repositories/ProductRepository';
import { supplierRepository } from '@/repositories/SupplierRepository';
import { useProducts } from '@/hooks/useProducts';
import { useSuppliers } from '@/hooks/useSuppliers';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { ProductsToolbar } from './ProductsToolbar';
import { ProductsTable } from './ProductsTable';
import { ProductFormModal } from './ProductFormModal';
import { DeleteProductModal } from './DeleteProductModal';
import { Pagination } from '../shared/Pagination';

export function ProductsView() {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts(productRepository);
  const { suppliers } = useSuppliers(supplierRepository);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Product>({
    items: products,
    searchFields: ['name', 'description', 'sku', 'category', 'supplierName'],
  });

  const filteredByCategory = useMemo(() => {
    if (selectedCategory === 'all') return filteredItems;
    return filteredItems.filter(p => p.category === selectedCategory);
  }, [filteredItems, selectedCategory]);

  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({ items: filteredByCategory, itemsPerPage: 10 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    sku: '',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 0,
    category: 'Chocolates',
    unit: 'pza',
    supplierId: '',
    supplierName: '',
    image: '',
    active: true,
  });

  const handleOpenCreate = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      sku: '',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      category: 'Chocolates',
      unit: 'pza',
      supplierId: '',
      supplierName: '',
      image: '',
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setCurrentProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await createProduct(formData as Omit<Product, 'id'>);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const confirmDelete = async () => {
    if (currentProduct) {
      try {
        await deleteProduct(currentProduct.id);
        setIsDeleteModalOpen(false);
        setCurrentProduct(null);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const exportCSV = (rows: Product[]) => {
    const headers = ['id','name','sku','category','price','cost','stock','supplierName','active'];
    const escape = (v: unknown) => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      if (s.includes('"') || s.includes(',') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const lines = [headers.join(',')];
    for (const r of rows) {
      const vals = [
        r.id,
        r.name,
        r.sku ?? '',
        r.category ?? '',
        r.price ?? 0,
        r.cost ?? 0,
        r.stock ?? 0,
        r.supplierName ?? '',
        r.active ? 'true' : 'false'
      ].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `productos_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: Product[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `productos_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Productos</h1>
          <p className="text-zinc-500 mt-1">
            Gestiona el catálogo de productos de tu negocio
          </p>
        </div>
      </div>

      <ProductsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onExportExcel={() => exportCSV(filteredByCategory)}
        onExportPdf={() => exportJSON(filteredByCategory)}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <ProductsTable
            products={paginatedItems}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteClick}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredByCategory.length}
          displayedItems={paginatedItems.length}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        product={currentProduct}
        formData={formData}
        suppliers={suppliers}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        onChange={setFormData}
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        product={currentProduct}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
