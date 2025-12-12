"use client";

import React from 'react';
import { Pencil, Trash2, CheckCircle, XCircle, Warehouse } from 'lucide-react';
import { Warehouse as WarehouseType } from '@/types/warehouse';

interface WarehousesTableProps {
  warehouses: WarehouseType[];
  onEdit: (warehouse: WarehouseType) => void;
  onDelete: (warehouse: WarehouseType) => void;
}

const getTypeBadgeColor = (type: string) => {
  const colors = {
    'Principal': 'bg-blue-50 text-blue-700',
    'Secundario': 'bg-purple-50 text-purple-700',
    'Refrigerado': 'bg-cyan-50 text-cyan-700',
    'Temporal': 'bg-amber-50 text-amber-700'
  };
  return colors[type as keyof typeof colors] || 'bg-zinc-100 text-zinc-600';
};

const getStockProgressColor = (percentage: number) => {
  if (percentage > 70) return 'bg-emerald-500';
  if (percentage >= 30) return 'bg-yellow-500';
  return 'bg-red-500';
};

export function WarehousesTable({ warehouses, onEdit, onDelete }: WarehousesTableProps) {
  if (warehouses.length === 0) {
    return (
      <div className="px-6 py-12 text-center">
        <div className="w-16 h-16 bg-zinc-50 text-zinc-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <Warehouse size={32} />
        </div>
        <p className="text-zinc-400">No se encontraron almacenes</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50/80 border-b border-zinc-100">
          <tr>
            <th className="px-6 py-4 font-semibold text-zinc-500">Nombre</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Código</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Sucursal</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Tipo</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Capacidad / Stock</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Encargado</th>
            <th className="px-6 py-4 font-semibold text-zinc-500 text-center">Estado</th>
            <th className="px-6 py-4 font-semibold text-zinc-500 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {warehouses.map((warehouse) => {
            const stockPercentage = warehouse.capacity > 0 
              ? (warehouse.currentStock / warehouse.capacity) * 100 
              : 0;
            
            return (
              <tr key={warehouse.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                      <Warehouse size={16} />
                    </div>
                    <span className="font-medium text-zinc-900">{warehouse.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs bg-zinc-100 px-2 py-1 rounded text-zinc-600">
                    {warehouse.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-600">
                  {warehouse.branchName || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(warehouse.type)}`}>
                    {warehouse.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-zinc-600">
                      <span>{warehouse.currentStock} / {warehouse.capacity}</span>
                      <span className="font-medium">{stockPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full ${getStockProgressColor(stockPercentage)} transition-all`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-600">
                  {warehouse.manager}
                </td>
                <td className="px-6 py-4 text-center">
                  {warehouse.active ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                      <CheckCircle size={12} /> Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-500">
                      <XCircle size={12} /> Inactivo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(warehouse)}
                      className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(warehouse)}
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
