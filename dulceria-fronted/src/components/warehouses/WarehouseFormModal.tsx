"use client";

import React, { useState } from 'react';
import { X, Warehouse as WarehouseIcon } from 'lucide-react';
import { Warehouse } from '@/types/warehouse';
import { Branch } from '@/types/branch';
import { cn } from '@/lib/utils';

interface WarehouseFormModalProps {
  isOpen: boolean;
  warehouse: Warehouse | null;
  formData: Partial<Warehouse>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<Warehouse>) => void;
  branches: Branch[];
}

const warehouseTypes = [
  { value: 'Principal', label: 'Principal' },
  { value: 'Secundario', label: 'Secundario' },
  { value: 'Refrigerado', label: 'Refrigerado' },
  { value: 'Temporal', label: 'Temporal' },
];

export function WarehouseFormModal({ 
  isOpen, 
  warehouse, 
  formData, 
  onClose, 
  onSave, 
  onChange,
  branches
}: WarehouseFormModalProps) {
  if (!isOpen) return null;

  const activeBranches = branches.filter(b => b.active);
  const maxStock = formData.capacity || 0;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name?.trim()) e.name = 'Este campo es requerido';
    if (!formData.code?.trim()) e.code = 'Este campo es requerido';
    if (!formData.branchId?.trim()) e.branchId = 'Este campo es requerido';
    if (!formData.type?.toString().trim()) e.type = 'Este campo es requerido';
    if (formData.capacity === undefined || formData.capacity === null || isNaN(formData.capacity as number)) e.capacity = 'Este campo es requerido';
    if (formData.currentStock === undefined || formData.currentStock === null || isNaN(formData.currentStock as number)) e.currentStock = 'Este campo es requerido';
    if ((formData.currentStock || 0) > (formData.capacity || 0)) e.currentStock = 'No puede exceder la capacidad';
    if (!formData.manager?.trim()) e.manager = 'Este campo es requerido';
    if (!formData.description?.trim()) e.description = 'Este campo es requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
              <WarehouseIcon className="text-amber-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              {warehouse ? 'Editar Almacén' : 'Nuevo Almacén'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">
                    Nombre del almacén
                  </label>
                  <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={e => { onChange({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                  className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.name ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                  placeholder="ej. Almacén Central"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">
                    Código
                  </label>
                  <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.code || ''}
                  onChange={e => { onChange({ ...formData, code: e.target.value.toUpperCase() }); if (errors.code) setErrors({ ...errors, code: '' }); }}
                  className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all font-mono', errors.code ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                  placeholder="ej. ALM-001"
                />
                {errors.code && <p className="text-xs text-red-600 mt-1">{errors.code}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">
                    Sucursal
                  </label>
                  <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
                </div>
                <select
                  required
                  value={formData.branchId || ''}
                  onChange={e => { onChange({ ...formData, branchId: e.target.value }); if (errors.branchId) setErrors({ ...errors, branchId: '' }); }}
                  className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all appearance-none cursor-pointer', errors.branchId ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                >
                  <option value="">Seleccionar sucursal</option>
                  {activeBranches.map(branch => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                {errors.branchId && <p className="text-xs text-red-600 mt-1">{errors.branchId}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">
                    Tipo
                  </label>
                  <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
                </div>
                <select
                  required
                  value={formData.type || ''}
                  onChange={e => { onChange({ ...formData, type: e.target.value as Warehouse['type'] }); if (errors.type) setErrors({ ...errors, type: '' }); }}
                  className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all appearance-none cursor-pointer', errors.type ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                >
                  <option value="">Seleccionar tipo</option>
                  {warehouseTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">
                    Capacidad
                  </label>
                  <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
                </div>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.capacity || ''}
                  onChange={e => {
                    const newCapacity = parseInt(e.target.value) || 0;
                    onChange({ 
                      ...formData, 
                      capacity: newCapacity,
                      currentStock: Math.min(formData.currentStock || 0, newCapacity)
                    });
                  }}
                  className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.capacity ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                  placeholder="ej. 10000"
                />
                {errors.capacity && <p className="text-xs text-red-600 mt-1">{errors.capacity}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase">
                    Stock actual
                  </label>
                  <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
                </div>
                <input
                  type="number"
                  required
                  min="0"
                  max={maxStock}
                  value={formData.currentStock || ''}
                  onChange={e => { onChange({ ...formData, currentStock: parseInt(e.target.value) || 0 }); if (errors.currentStock) setErrors({ ...errors, currentStock: '' }); }}
                  className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.currentStock ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                  placeholder="ej. 5000"
                />
                {maxStock > 0 && (
                  <p className="text-xs text-zinc-500">Máximo: {maxStock}</p>
                )}
                {errors.currentStock && <p className="text-xs text-red-600 mt-1">{errors.currentStock}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Encargado
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.manager || ''}
                onChange={e => { onChange({ ...formData, manager: e.target.value }); if (errors.manager) setErrors({ ...errors, manager: '' }); }}
                className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.manager ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                placeholder="ej. Juan Pérez"
              />
              {errors.manager && <p className="text-xs text-red-600 mt-1">{errors.manager}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Descripción
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <textarea
                required
                rows={3}
                value={formData.description || ''}
                onChange={e => { onChange({ ...formData, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: '' }); }}
                className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all resize-none', errors.description ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                placeholder="Describe el propósito y ubicación del almacén..."
              />
              {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Estado</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active !== false}
                    onChange={e => onChange({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-pink-600 bg-zinc-100 border-zinc-300 rounded focus:ring-pink-500 focus:ring-2"
                  />
                  <span className="text-sm">Almacén activo</span>
                </label>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 flex gap-3 border-t border-zinc-100 bg-white">
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
              {warehouse ? 'Guardar Cambios' : 'Crear Almacén'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
