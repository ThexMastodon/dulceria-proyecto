"use client";

import React from 'react';
import { RouteOrder, RouteOrderStatus } from '@/types/routeOrder';
import { Eye, Pencil, Trash2, MapPin, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RouteOrdersTableProps {
  orders: RouteOrder[];
  onView: (order: RouteOrder) => void;
  onEdit: (order: RouteOrder) => void;
  onDelete: (order: RouteOrder) => void;
}

const statusConfig: Record<RouteOrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pendiente', variant: 'outline' },
  confirmed: { label: 'Confirmado', variant: 'default' },
  delivered: { label: 'Entregado', variant: 'secondary' },
  rejected: { label: 'Rechazado', variant: 'destructive' },
  rescheduled: { label: 'Reagendado', variant: 'outline' },
};

export function RouteOrdersTable({ orders, onView, onEdit, onDelete }: RouteOrdersTableProps) {
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
    }).format(new Date(dateString));
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
        <p className="text-zinc-500 text-sm">No hay pedidos de ruta</p>
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
            Ruta
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Cliente
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Repartidor
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
            Entrega
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
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-zinc-900">{order.routeName}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-zinc-900">{order.customerName}</div>
                <div className="text-xs text-zinc-500">{order.customerPhone}</div>
                <div className="text-xs text-zinc-500 max-w-xs truncate">
                  {order.customerAddress}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm text-zinc-900">
                    {order.deliveryPersonName}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-zinc-900">
                  {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                </div>
                <div className="text-xs text-zinc-500">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} unidades
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-zinc-900">
                  {formatCurrency(order.total)}
                </div>
                {order.discount > 0 && (
                  <div className="text-xs text-green-600">
                    Desc. {formatCurrency(order.discount)}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={statusInfo.variant}>
                  {statusInfo.label}
                </Badge>
                <div className="mt-1">
                  <Badge 
                    variant={order.paymentStatus === 'paid' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {order.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                  </Badge>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-zinc-900">
                  {formatDate(order.deliveryDate)}
                </div>
                {order.deliveryTime && (
                  <div className="text-xs text-zinc-500">
                    {order.deliveryTime}
                  </div>
                )}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(order)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
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
