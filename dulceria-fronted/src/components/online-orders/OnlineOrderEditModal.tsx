"use client";

import React, { useState } from 'react';
import { OnlineOrder, OnlineOrderStatus } from '@/types/onlineOrder';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface OnlineOrderEditModalProps {
  isOpen: boolean;
  order: OnlineOrder | null;
  onClose: () => void;
  onUpdateStatus: (status: OnlineOrderStatus, assignedTo?: string) => void | Promise<void>;
}

export function OnlineOrderEditModal({ isOpen, order, onClose, onUpdateStatus }: OnlineOrderEditModalProps) {
  const [status, setStatus] = useState<OnlineOrderStatus>('new');
  const [assignedTo, setAssignedTo] = useState<string>('none');
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (order) {
      setStatus(order.status);
      setAssignedTo(order.assignedTo || 'none');
    }
  }, [order]);

  if (!order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eMap: Record<string, string> = {};
    if (!status) eMap.status = 'Requerido';
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;
    onUpdateStatus(status, assignedTo !== 'none' ? assignedTo : undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Actualizar Estado del Pedido</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Pedido</Label>
            <p className="text-sm font-medium">{order.orderNumber}</p>
            <p className="text-xs text-zinc-500">{order.customerName}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="status" className="text-xs font-semibold text-zinc-500 uppercase">Estado del Pedido</Label>
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
            </div>
            <Select value={status} onValueChange={(value: string) => { setStatus(value as OnlineOrderStatus); if (errors.status) setErrors({ ...errors, status: '' }); }}>
              <SelectTrigger id="status" className={cn(errors.status && 'border-red-300 bg-red-50')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Nuevo</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="preparing">Preparando</SelectItem>
                <SelectItem value="ready">Listo</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-xs text-red-600">{errors.status}</p>}
          </div>

          {order.deliveryType === 'delivery' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="assignedTo" className="text-xs font-semibold text-zinc-500 uppercase">Asignar a Repartidor</Label>
                <span className="px-1.5 py-0.5 bg-zinc-50 text-zinc-500 text-[10px] font-semibold rounded">OPCIONAL</span>
              </div>
              <Select value={assignedTo} onValueChange={(value: string) => setAssignedTo(value)}>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Seleccionar repartidor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin asignar</SelectItem>
                  <SelectItem value="delivery-1">Juan Pérez</SelectItem>
                  <SelectItem value="delivery-2">María González</SelectItem>
                  <SelectItem value="delivery-3">Carlos López</SelectItem>
                  <SelectItem value="delivery-4">Ana Martínez</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Actualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
