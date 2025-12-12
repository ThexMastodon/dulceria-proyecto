"use client";

import React, { useMemo } from 'react';
import { InventoryItem, InventoryMovement } from '@/types/inventory';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Package, CalendarDays, Hash } from 'lucide-react';

interface InventoryDetailsModalProps {
  isOpen: boolean;
  item: InventoryItem | null;
  movements: InventoryMovement[];
  onClose: () => void;
}

export function InventoryDetailsModal({ isOpen, item, movements, onClose }: InventoryDetailsModalProps) {
  const recentMovements = useMemo(() => {
    if (!item) return [] as InventoryMovement[];
    return movements
      .filter(m => m.productId === item.productId && m.warehouseId === item.warehouseId)
      .slice(0, 10);
  }, [item, movements]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalle de inventario</DialogTitle>
        </DialogHeader>

        {item ? (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              {item.productImage ? (
                <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-zinc-400" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-900">{item.productName}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-zinc-600">
                  <span className="font-mono">{item.productCode}</span>
                  <span>•</span>
                  <span>{item.warehouseName}</span>
                  {item.location && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="font-mono">{item.location}</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border border-zinc-200 p-3 bg-white">
                <p className="text-xs text-zinc-500">Cantidad</p>
                <p className="text-xl font-bold text-zinc-900">{item.quantity}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-3 bg-white">
                <p className="text-xs text-zinc-500">Min/Max</p>
                <p className="text-xl font-semibold text-zinc-900">{item.minStock} / {item.maxStock}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-3 bg-white">
                <p className="text-xs text-zinc-500">Costo Unitario</p>
                <p className="text-xl font-semibold text-zinc-900">${item.unitCost.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-3 bg-white">
                <p className="text-xs text-zinc-500">Valor Total</p>
                <p className="text-xl font-bold text-zinc-900">${item.totalValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-zinc-200 p-3 bg-white">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <CalendarDays className="h-4 w-4" />
                  Último reabastecimiento
                </div>
                <p className="text-sm font-medium text-zinc-900 mt-1">{item.lastRestockDate || '—'}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-3 bg-white">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <CalendarDays className="h-4 w-4" />
                  Caducidad
                </div>
                <p className="text-sm font-medium text-zinc-900 mt-1">{item.expirationDate || '—'}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-3 bg-white">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <Hash className="h-4 w-4" />
                  Lote
                </div>
                <p className="text-sm font-medium text-zinc-900 mt-1">{item.batchNumber || '—'}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-800 mb-2">Movimientos recientes</h4>
              <div className="rounded-lg border border-zinc-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200">
                      <th className="text-left text-xs font-medium text-zinc-600 uppercase tracking-wider p-2">Fecha</th>
                      <th className="text-left text-xs font-medium text-zinc-600 uppercase tracking-wider p-2">Tipo</th>
                      <th className="text-left text-xs font-medium text-zinc-600 uppercase tracking-wider p-2">Cantidad</th>
                      <th className="text-left text-xs font-medium text-zinc-600 uppercase tracking-wider p-2">Previo → Nuevo</th>
                      <th className="text-left text-xs font-medium text-zinc-600 uppercase tracking-wider p-2">Motivo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {recentMovements.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-sm text-zinc-500 p-4">Sin movimientos</td>
                      </tr>
                    ) : recentMovements.map(m => (
                      <tr key={m.id}>
                        <td className="p-2 text-sm text-zinc-700">{new Date(m.createdAt).toLocaleString()}</td>
                        <td className="p-2 text-sm">
                          <Badge variant="outline">{m.type}</Badge>
                        </td>
                        <td className="p-2 text-sm text-zinc-900 font-medium">{m.quantity}</td>
                        <td className="p-2 text-sm text-zinc-700">{m.previousQuantity} → {m.newQuantity}</td>
                        <td className="p-2 text-sm text-zinc-700">{m.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
