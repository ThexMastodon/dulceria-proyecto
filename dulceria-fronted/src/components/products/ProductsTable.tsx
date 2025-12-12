"use client";

import React from 'react';
import { Product } from '@/types/product';
import { Pencil, Trash2, Package, AlertCircle, TrendingUp } from 'lucide-react';

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto text-zinc-300 mb-3" size={48} />
        <p className="text-zinc-500">No se encontraron productos</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Proveedor
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {products.map((product) => {
            const isLowStock = product.stock <= product.minStock;
            const margin = ((product.price - product.cost) / product.price * 100).toFixed(1);

            return (
              <tr
                key={product.id}
                className="hover:bg-zinc-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-zinc-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                        <Package className="text-purple-600" size={24} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-zinc-900 truncate">{product.name}</p>
                      <p className="text-xs text-zinc-500 truncate">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-zinc-700">{product.sku}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-zinc-700">{product.supplierName}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div>
                    <p className="font-semibold text-zinc-900">{formatCurrency(product.price)}</p>
                    <div className="flex items-center justify-end gap-1 text-xs text-emerald-600">
                      <TrendingUp size={12} />
                      <span>{margin}%</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className={`font-bold ${isLowStock ? 'text-red-600' : 'text-zinc-900'}`}>
                      {product.stock}
                    </span>
                    <span className="text-xs text-zinc-500">{product.unit}</span>
                    {isLowStock && (
                      <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                        <AlertCircle size={12} />
                        <span>Bajo</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.active
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-red-50 text-red-700 border border-red-100'
                    }`}
                  >
                    {product.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
