"use client";

import React from 'react';
import { Order } from '@/types/order';
import { X, Package, User, Calendar, DollarSign, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface OrderDetailsModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailsModal({ isOpen, order, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalles del Pedido</span>
            <Badge variant={order.status === 'completed' ? 'secondary' : 'default'}>
              {order.orderNumber}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información General */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Package className="h-4 w-4" />
                <span>Almacén</span>
              </div>
              <p className="text-sm font-medium">{order.warehouseName}</p>
              <p className="text-xs text-zinc-500">{order.branchName}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <User className="h-4 w-4" />
                <span>Cliente</span>
              </div>
              <p className="text-sm font-medium">{order.clientName || 'Cliente General'}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Calendar className="h-4 w-4" />
                <span>Fecha de Creación</span>
              </div>
              <p className="text-sm font-medium">{formatDate(order.createdAt)}</p>
              <p className="text-xs text-zinc-500">por {order.createdByName}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <CreditCard className="h-4 w-4" />
                <span>Método de Pago</span>
              </div>
              <p className="text-sm font-medium">{order.paymentMethod || 'No especificado'}</p>
            </div>
          </div>

          {/* Items del Pedido */}
          <div>
            <h3 className="text-sm font-medium text-zinc-900 mb-3">Artículos del Pedido</h3>
            <div className="border border-zinc-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500">Producto</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-zinc-500">Cantidad</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-zinc-500">Precio Unit.</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-zinc-500">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-zinc-900">{item.productName}</td>
                      <td className="px-4 py-3 text-sm text-center text-zinc-900">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-right text-zinc-900">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-zinc-900">
                        {formatCurrency(item.subtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumen de Pago */}
          <div className="bg-zinc-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">IVA (16%)</span>
              <span className="font-medium">{formatCurrency(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Descuento</span>
                <span className="font-medium text-green-600">
                  -{formatCurrency(order.discount)}
                </span>
              </div>
            )}
            <div className="border-t border-zinc-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-base font-semibold text-zinc-900">Total</span>
                <span className="text-lg font-bold text-zinc-900">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Notas */}
          {order.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <FileText className="h-4 w-4" />
                <span>Notas</span>
              </div>
              <p className="text-sm text-zinc-900 bg-zinc-50 rounded-lg p-3">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-zinc-200">
          <Button onClick={onClose} variant="outline">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
