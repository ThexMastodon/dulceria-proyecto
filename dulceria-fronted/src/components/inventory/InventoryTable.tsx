"use client";

import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { Eye, Pencil, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface InventoryTableProps {
  items: InventoryItem[];
  onView: (item: InventoryItem) => void;
  onAdjust: (item: InventoryItem) => void;
}

const statusColors = {
  available: 'bg-green-50 text-green-700 border-green-200',
  reserved: 'bg-blue-50 text-blue-700 border-blue-200',
  damaged: 'bg-red-50 text-red-700 border-red-200',
  expired: 'bg-zinc-50 text-zinc-700 border-zinc-200',
};

const statusLabels = {
  available: 'Disponible',
  reserved: 'Reservado',
  damaged: 'Dañado',
  expired: 'Vencido',
};

export function InventoryTable({ items, onView, onAdjust }: InventoryTableProps) {
  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity === 0) {
      return { color: 'text-red-600', icon: AlertTriangle, label: 'Sin stock' };
    } else if (item.quantity < item.minStock) {
      return { color: 'text-amber-600', icon: TrendingDown, label: 'Stock bajo' };
    } else if (item.quantity > item.maxStock) {
      return { color: 'text-purple-600', icon: TrendingUp, label: 'Sobrestock' };
    }
    return { color: 'text-green-600', icon: TrendingUp, label: 'Stock normal' };
  };

  const getStockPercentage = (item: InventoryItem) => {
    const percentage = (item.quantity / item.maxStock) * 100;
    return Math.min(percentage, 100);
  };

  const getProgressColor = (item: InventoryItem) => {
    if (item.quantity === 0) return 'bg-red-500';
    if (item.quantity < item.minStock) return 'bg-amber-500';
    if (item.quantity > item.maxStock) return 'bg-purple-500';
    return 'bg-green-500';
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-zinc-200">
          <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Producto
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Almacén
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Ubicación
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Cantidad
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Stock Min/Max
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Estado
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Valor Total
          </th>
          <th className="text-right py-3 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-100">
        {items.length === 0 ? (
          <tr>
            <td colSpan={8} className="text-center py-12 text-zinc-500">
              <Package className="h-12 w-12 mx-auto mb-3 text-zinc-300" />
              <p className="font-medium">No hay productos en inventario</p>
              <p className="text-sm">Los productos aparecerán aquí cuando se agreguen al almacén</p>
            </td>
          </tr>
        ) : (
          items.map((item) => {
            const stockStatus = getStockStatus(item);
            const stockPercentage = getStockPercentage(item);
            const progressColor = getProgressColor(item);

            return (
              <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {item.productImage ? (
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                        <Package className="h-5 w-5 text-zinc-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-zinc-900">{item.productName}</p>
                      <p className="text-xs text-zinc-500 font-mono">{item.productCode}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-zinc-900">{item.warehouseName}</p>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className="font-mono text-xs">
                    {item.location}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${stockStatus.color}`}>
                        {item.quantity}
                      </span>
                      <stockStatus.icon className={`h-4 w-4 ${stockStatus.color}`} />
                    </div>
                    <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${progressColor} transition-all`}
                        style={{ width: `${stockPercentage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-amber-600">
                      <span className="text-xs">Min:</span>
                      <span className="font-semibold">{item.minStock}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <span className="text-xs">Max:</span>
                      <span className="font-semibold">{item.maxStock}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={statusColors[item.status]}>
                    {statusLabels[item.status]}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-900">
                      ${item.totalValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-zinc-500">
                      @${item.unitCost.toFixed(2)} c/u
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => onView(item)}
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                      onClick={() => onAdjust(item)}
                      title="Ajustar inventario"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
