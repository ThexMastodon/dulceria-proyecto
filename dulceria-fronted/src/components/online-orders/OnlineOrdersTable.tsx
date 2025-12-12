"use client";

import React from 'react';
import { OnlineOrder, OnlineOrderStatus } from '@/types/onlineOrder';
import { Eye, Pencil, Truck, Package, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OnlineOrdersTableProps {
  orders: OnlineOrder[];
  onView: (order: OnlineOrder) => void;
  onEdit: (order: OnlineOrder) => void;
}

const statusConfig: Record<OnlineOrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  new: { label: 'Nuevo', variant: 'default' },
  confirmed: { label: 'Confirmado', variant: 'default' },
  preparing: { label: 'Preparando', variant: 'outline' },
  ready: { label: 'Listo', variant: 'secondary' },
  shipped: { label: 'Enviado', variant: 'default' },
  delivered: { label: 'Entregado', variant: 'secondary' },
  cancelled: { label: 'Cancelado', variant: 'destructive' },
};

export function OnlineOrdersTable({ orders, onView, onEdit }: OnlineOrdersTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
        <p className="text-zinc-500 text-sm">No hay pedidos en línea</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-zinc-200 bg-zinc-50/50">
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Pedido
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Cliente
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Tipo
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Artículos
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Total
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Estado
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Pago
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200">
        {orders.map((order) => {
          const statusInfo = statusConfig[order.status];

          return (
            <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-zinc-900">
                  {order.orderNumber}
                </div>
                <div className="text-xs text-zinc-500">
                  {formatDate(order.createdAt)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-zinc-900">{order.customerName}</div>
                <div className="text-xs text-zinc-500">{order.customerPhone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {order.deliveryType === 'delivery' ? (
                    <>
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-zinc-900">Entrega</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-zinc-900">Recoger</span>
                    </>
                  )}
                </div>
                {order.deliveryType === 'pickup' && order.pickupBranchName && (
                  <div className="text-xs text-zinc-500 ml-6">
                    {order.pickupBranchName}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-zinc-900">
                  {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-zinc-900">
                  {formatCurrency(order.total)}
                </div>
                {order.shippingCost > 0 && (
                  <div className="text-xs text-zinc-500">
                    + {formatCurrency(order.shippingCost)} envío
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={statusInfo.variant}>
                  {statusInfo.label}
                </Badge>
                {order.assignedToName && (
                  <div className="text-xs text-zinc-500 mt-1">
                    {order.assignedToName}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3 text-zinc-400" />
                  <span className="text-xs text-zinc-900">{order.paymentMethod}</span>
                </div>
                <Badge 
                  variant={order.paymentStatus === 'paid' ? 'secondary' : 'outline'}
                  className="mt-1"
                >
                  {order.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(order)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(order)}
                    className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
