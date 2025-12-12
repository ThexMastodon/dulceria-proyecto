"use client";

import React from 'react';
import { OnlineOrder } from '@/types/onlineOrder';
import { Package, User, Calendar, MapPin, CreditCard, FileText, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface OnlineOrderDetailsModalProps {
  isOpen: boolean;
  order: OnlineOrder | null;
  onClose: () => void;
}

export function OnlineOrderDetailsModal({ isOpen, order, onClose }: OnlineOrderDetailsModalProps) {
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
            <span>Detalles del Pedido Online</span>
            <Badge>{order.orderNumber}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del Cliente */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <User className="h-4 w-4" />
                <span>Cliente</span>
              </div>
              <p className="text-sm font-medium">{order.customerName}</p>
              <p className="text-xs text-zinc-500">{order.customerEmail}</p>
              <p className="text-xs text-zinc-500">{order.customerPhone}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Calendar className="h-4 w-4" />
                <span>Fecha de Pedido</span>
              </div>
              <p className="text-sm font-medium">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Tipo de Entrega */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              {order.deliveryType === 'delivery' ? (
                <Truck className="h-4 w-4" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              <span>{order.deliveryType === 'delivery' ? 'Entrega a Domicilio' : 'Recoger en Sucursal'}</span>
            </div>
            
            {order.deliveryType === 'delivery' && order.deliveryAddress && (
              <div className="bg-zinc-50 rounded-lg p-3">
                <p className="text-sm font-medium">
                  {order.deliveryAddress.street} {order.deliveryAddress.number}
                </p>
                <p className="text-sm text-zinc-600">
                  {order.deliveryAddress.neighborhood}, {order.deliveryAddress.city}
                </p>
                <p className="text-sm text-zinc-600">
                  {order.deliveryAddress.state}, C.P. {order.deliveryAddress.zipCode}
                </p>
                {order.deliveryAddress.references && (
                  <p className="text-xs text-zinc-500 mt-2">
                    Referencias: {order.deliveryAddress.references}
                  </p>
                )}
              </div>
            )}

            {order.deliveryType === 'pickup' && order.pickupBranchName && (
              <p className="text-sm font-medium">{order.pickupBranchName}</p>
            )}

            {order.assignedToName && (
              <p className="text-xs text-zinc-500">
                Asignado a: {order.assignedToName}
              </p>
            )}
          </div>

          {/* Items del Pedido */}
          <div>
            <h3 className="text-sm font-medium text-zinc-900 mb-3">Productos</h3>
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
            {order.shippingCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Costo de Envío</span>
                <span className="font-medium">{formatCurrency(order.shippingCost)}</span>
              </div>
            )}
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

          {/* Información de Pago */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-600">Método:</span>
              <span className="text-sm font-medium">{order.paymentMethod}</span>
            </div>
            <Badge variant={order.paymentStatus === 'paid' ? 'secondary' : 'outline'}>
              {order.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
            </Badge>
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
