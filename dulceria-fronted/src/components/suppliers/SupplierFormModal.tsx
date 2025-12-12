"use client";

import React, { useState, useRef } from 'react';
import { Supplier } from '@/types/supplier';
import { X, Building2, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupplierFormModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  formData: Partial<Supplier>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<Supplier>) => void;
}

export function SupplierFormModal({
  isOpen,
  supplier,
  formData,
  onClose,
  onSave,
  onChange,
}: SupplierFormModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        onChange({ ...formData, logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const currentLogo = previewImage || formData.logo;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name?.trim()) e.name = 'Este campo es requerido';
    if (!formData.contactName?.trim()) e.contactName = 'Este campo es requerido';
    if (!formData.rfc?.trim()) e.rfc = 'Este campo es requerido';
    if (!formData.email?.trim()) e.email = 'Este campo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email inválido';
    if (!formData.phone?.trim()) e.phone = 'Este campo es requerido';
    if (!formData.address?.trim()) e.address = 'Este campo es requerido';
    if (!formData.city?.trim()) e.city = 'Este campo es requerido';
    if (!formData.state?.trim()) e.state = 'Este campo es requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(e);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <Building2 className="text-blue-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              {supplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}
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
              Logotipo del Proveedor
            </label>
            <div
              onClick={handleImageClick}
              className="relative w-full h-48 rounded-xl border-2 border-dashed border-zinc-300 hover:border-pink-400 transition-colors cursor-pointer group overflow-hidden"
            >
              {currentLogo ? (
                <>
                  <img
                    src={currentLogo}
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
                  <p className="text-sm font-medium mt-3">Haz clic para subir el logotipo del proveedor</p>
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
              Haz clic en el área para subir el logotipo. Formatos: JPG, PNG, GIF. Tamaño máximo: 2MB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Nombre del Proveedor
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => { onChange({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.name ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="Ej: Dulces Tradicionales SA"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Nombre de Contacto
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.contactName || ''}
                onChange={(e) => { onChange({ ...formData, contactName: e.target.value }); if (errors.contactName) setErrors({ ...errors, contactName: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.contactName ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="Ej: María González"
              />
              {errors.contactName && <p className="text-xs text-red-600 mt-1">{errors.contactName}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  RFC
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.rfc || ''}
                onChange={(e) => { onChange({ ...formData, rfc: e.target.value.toUpperCase() }); if (errors.rfc) setErrors({ ...errors, rfc: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 font-mono", errors.rfc ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="Ej: ABC123456XYZ"
                maxLength={13}
              />
              {errors.rfc && <p className="text-xs text-red-600 mt-1">{errors.rfc}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Email
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => { onChange({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.email ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="ejemplo@proveedor.com"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Teléfono
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="tel"
                required
                value={formData.phone || ''}
                onChange={(e) => { onChange({ ...formData, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.phone ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="55-1234-5678"
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Dirección
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.address || ''}
                onChange={(e) => { onChange({ ...formData, address: e.target.value }); if (errors.address) setErrors({ ...errors, address: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.address ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="Av. Principal 123"
              />
              {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Ciudad
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.city || ''}
                onChange={(e) => { onChange({ ...formData, city: e.target.value }); if (errors.city) setErrors({ ...errors, city: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.city ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="Ciudad de México"
              />
              {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Estado
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.state || ''}
                onChange={(e) => { onChange({ ...formData, state: e.target.value }); if (errors.state) setErrors({ ...errors, state: '' }); }}
                className={cn("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100", errors.state ? "border-red-300 bg-red-50" : "border-zinc-200")}
                placeholder="CDMX"
              />
              {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active ?? true}
                  onChange={(e) => onChange({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-pink-600 rounded focus:ring-pink-100"
                />
                <span className="text-sm font-medium text-zinc-700">Proveedor activo</span>
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
              {supplier ? 'Guardar Cambios' : 'Crear Proveedor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
