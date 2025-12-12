"use client";

import React from 'react';
import { RouteOrder } from '@/types/routeOrder';
import { MapPin, User, Calendar, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface RouteOrderDetailsModalProps {
  isOpen: boolean;
  order: RouteOrder | null;
  onClose: () => void;
}

export function RouteOrderDetailsModal({ isOpen, order, onClose }: RouteOrderDetailsModalProps) {
  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Pedido - {order.orderNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                <MapPin className="h-4 w-4" />
                <span>Ruta</span>
              </div>
              <p className="text-sm font-medium">{order.routeName}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                <User className="h-4 w-4" />
                <span>Repartidor</span>
              </div>
              <p className="text-sm font-medium">{order.deliveryPersonName}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Cliente</h3>
            <p className="text-sm">{order.customerName}</p>
            <p className="text-xs text-zinc-500">{order.customerPhone}</p>
            <p className="text-xs text-zinc-500">{order.customerAddress}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Productos</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Producto</th>
                    <th className="px-3 py-2 text-center">Cant.</th>
                    <th className="px-3 py-2 text-right">Precio</th>
                    <th className="px-3 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2">{item.productName}</td>
                      <td className="px-3 py-2 text-center">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-3 py-2 text-right font-medium">{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-lg p-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Descuento</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold border-t pt-1">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
