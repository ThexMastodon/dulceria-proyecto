"use client";

import React from 'react';
import { Supplier } from '@/types/supplier';
import { Pencil, Trash2, Phone, Mail, MapPin, Building2 } from 'lucide-react';

interface SuppliersTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export function SuppliersTable({ suppliers, onEdit, onDelete }: SuppliersTableProps) {
  if (suppliers.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="mx-auto text-zinc-300 mb-3" size={48} />
        <p className="text-zinc-500">No se encontraron proveedores</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Proveedor
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Contacto
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Ubicación
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              RFC
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="hover:bg-zinc-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {supplier.logo ? (
                    <img
                      src={supplier.logo}
                      alt={supplier.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-zinc-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Building2 className="text-blue-600" size={20} />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-zinc-900">{supplier.name}</p>
                    <p className="text-xs text-zinc-500">{supplier.contactName}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Mail size={14} className="text-zinc-400" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Phone size={14} className="text-zinc-400" />
                    {supplier.phone}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-zinc-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-zinc-600">
                    <p>{supplier.city}</p>
                    <p className="text-xs text-zinc-500">{supplier.state}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-sm text-zinc-700">{supplier.rfc}</span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    supplier.active
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {supplier.active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(supplier)}
                    className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(supplier)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
