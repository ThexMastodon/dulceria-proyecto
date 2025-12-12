"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Product } from '@/types/product';
import { Supplier } from '@/types/supplier';
import { X, Package, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductFormModalProps {
  isOpen: boolean;
  product: Product | null;
  formData: Partial<Product>;
  suppliers: Supplier[];
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<Product>) => void;
}

const categories = [
  'Chocolates',
  'Gomitas',
  'Caramelos',
  'Dulces Regionales',
  'Importados',
  'Otros',
];

const units = ['kg', 'g', 'l', 'ml', 'pza', 'caja', 'paquete'];

export function ProductFormModal({
  isOpen,
  product,
  formData,
  suppliers,
  onClose,
  onSave,
  onChange,
}: ProductFormModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setPreviewImage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        onChange({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const currentImage = previewImage || formData.image;

  const handleSupplierChange = (supplierId: string) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    onChange({
      ...formData,
      supplierId,
      supplierName: supplier?.name,
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name?.trim()) e.name = 'Este campo es requerido';
    if (!formData.description?.trim()) e.description = 'Este campo es requerido';
    if (!formData.sku?.trim()) e.sku = 'Este campo es requerido';
    if (!formData.category?.toString().trim()) e.category = 'Este campo es requerido';
    if (!formData.supplierId?.trim()) e.supplierId = 'Este campo es requerido';
    if (!formData.unit?.toString().trim()) e.unit = 'Este campo es requerido';
    if (formData.cost === undefined || formData.cost === null || isNaN(formData.cost as number)) e.cost = 'Este campo es requerido';
    if (formData.price === undefined || formData.price === null || isNaN(formData.price as number)) e.price = 'Este campo es requerido';
    if (formData.stock === undefined || formData.stock === null || isNaN(formData.stock as number)) e.stock = 'Este campo es requerido';
    if (formData.minStock === undefined || formData.minStock === null || isNaN(formData.minStock as number)) e.minStock = 'Este campo es requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(e);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
              <Package className="text-purple-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-3">
              Imagen del Producto
            </label>
            <div
              onClick={handleImageClick}
              className="relative w-full h-48 rounded-xl border-2 border-dashed border-zinc-300 hover:border-pink-400 transition-colors cursor-pointer group overflow-hidden"
            >
              {currentImage ? (
                <>
                  <img
                    src={currentImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white">
                      <Upload className="mx-auto mb-2" size={32} />
                      <p className="text-sm font-medium">Cambiar imagen</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 group-hover:text-pink-500 transition-colors">
                  <ImageIcon size={48} />
                  <p className="text-sm font-medium mt-3">Haz clic para subir la imagen del producto</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Formatos: JPG, PNG, GIF. Tamaño máximo: 2MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-xs text-zinc-500 mt-2">
              Haz clic en el área para subir una imagen. Formatos: JPG, PNG, GIF. Tamaño máximo: 2MB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Nombre del Producto
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => { onChange({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.name ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="Ej: Chocolate con Leche Premium"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Descripción
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <textarea
                required
                value={formData.description || ''}
                onChange={(e) => { onChange({ ...formData, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 resize-none", errors.description ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="Descripción del producto"
                rows={2}
              />
              {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  SKU
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.sku || ''}
                onChange={(e) => { onChange({ ...formData, sku: e.target.value.toUpperCase() }); if (errors.sku) setErrors({ ...errors, sku: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 font-mono", errors.sku ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="PROD-001"
              />
              {errors.sku && <p className="text-xs text-red-600 mt-1">{errors.sku}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Categoría
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <select
                required
                value={formData.category || ''}
                onChange={(e) => { onChange({ ...formData, category: e.target.value as any }); if (errors.category) setErrors({ ...errors, category: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.category ? "border-red-300 bg-red-50" : "border-zinc-200")}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Proveedor
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <select
                required
                value={formData.supplierId || ''}
                onChange={(e) => { handleSupplierChange(e.target.value); if (errors.supplierId) setErrors({ ...errors, supplierId: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.supplierId ? "border-red-300 bg-red-50" : "border-zinc-200")}
              >
                <option value="">Seleccionar proveedor</option>
                {suppliers.filter(s => s.active).map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.supplierId && <p className="text-xs text-red-600 mt-1">{errors.supplierId}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Unidad
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <select
                required
                value={formData.unit || ''}
                onChange={(e) => { onChange({ ...formData, unit: e.target.value as any }); if (errors.unit) setErrors({ ...errors, unit: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.unit ? "border-red-300 bg-red-50" : "border-zinc-200")}
              >
                <option value="">Seleccionar unidad</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              {errors.unit && <p className="text-xs text-red-600 mt-1">{errors.unit}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Costo
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.cost || ''}
                onChange={(e) => { onChange({ ...formData, cost: parseFloat(e.target.value) }); if (errors.cost) setErrors({ ...errors, cost: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.cost ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="0.00"
              />
              {errors.cost && <p className="text-xs text-red-600 mt-1">{errors.cost}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Precio de Venta
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.price || ''}
                onChange={(e) => { onChange({ ...formData, price: parseFloat(e.target.value) }); if (errors.price) setErrors({ ...errors, price: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.price ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="0.00"
              />
              {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Stock Actual
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="number"
                required
                min="0"
                value={formData.stock || ''}
                onChange={(e) => { onChange({ ...formData, stock: parseInt(e.target.value) }); if (errors.stock) setErrors({ ...errors, stock: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.stock ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="0"
              />
              {errors.stock && <p className="text-xs text-red-600 mt-1">{errors.stock}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Stock Mínimo
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="number"
                required
                min="0"
                value={formData.minStock || ''}
                onChange={(e) => { onChange({ ...formData, minStock: parseInt(e.target.value) }); if (errors.minStock) setErrors({ ...errors, minStock: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.minStock ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="0"
              />
              {errors.minStock && <p className="text-xs text-red-600 mt-1">{errors.minStock}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active ?? true}
                  onChange={(e) => onChange({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-pink-600 rounded focus:ring-pink-100"
                />
                <span className="text-sm font-medium text-zinc-700">Producto activo</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium shadow-lg shadow-zinc-200"
            >
              {product ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
