"use client";

import React from 'react';
import { Order } from '@/types/order';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteOrderModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteOrderModal({ isOpen, order, onClose, onConfirm }: DeleteOrderModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Eliminar Pedido</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-zinc-600">
            ¿Estás seguro de que deseas eliminar el pedido{' '}
            <span className="font-semibold text-zinc-900">{order.orderNumber}</span>?
          </p>
          <div className="mt-3 space-y-1">
            <p className="text-sm text-zinc-500">
              • Cliente: {order.clientName || 'Cliente General'}
            </p>
            <p className="text-sm text-zinc-500">
              • Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(order.total)}
            </p>
            <p className="text-sm text-zinc-500">
              • Artículos: {order.items.length}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
