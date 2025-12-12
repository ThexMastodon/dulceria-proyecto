"use client";

import React from 'react';
import { RouteOrder } from '@/types/routeOrder';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DeleteRouteOrderModalProps {
  isOpen: boolean;
  order: RouteOrder | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteRouteOrderModal({ isOpen, order, onClose, onConfirm }: DeleteRouteOrderModalProps) {
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
              <DialogTitle>Eliminar Pedido de Ruta</DialogTitle>
              <DialogDescription>Esta acción no se puede deshacer</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-zinc-600">
            ¿Estás seguro de eliminar el pedido <span className="font-semibold">{order.orderNumber}</span>?
          </p>
          <p className="text-sm text-zinc-500 mt-2">Cliente: {order.customerName}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
