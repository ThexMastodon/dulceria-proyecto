"use client";

import React from 'react';
import { Supplier } from '@/types/supplier';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteSupplierModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteSupplierModal({
  isOpen,
  supplier,
  onClose,
  onConfirm,
}: DeleteSupplierModalProps) {
  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Eliminar Proveedor
          </h2>
          <p className="text-zinc-600 mb-6">
            ¿Estás seguro de que deseas eliminar al proveedor <strong>{supplier.name}</strong>?
            Esta acción no se puede deshacer.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-200"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
