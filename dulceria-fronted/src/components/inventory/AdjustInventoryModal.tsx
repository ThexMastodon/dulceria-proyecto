"use client";

import React, { useMemo, useState } from 'react';
import { InventoryItem, InventoryMovement, InventoryMovementType } from '@/types/inventory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface AdjustInventoryModalProps {
  isOpen: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onConfirm: (movement: Omit<InventoryMovement, 'id'>) => Promise<void> | void;
}

export function AdjustInventoryModal({ isOpen, item, onClose, onConfirm }: AdjustInventoryModalProps) {
  const [type, setType] = useState<InventoryMovementType>('adjustment');
  const [quantity, setQuantity] = useState<number>(0);
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const previousQuantity = item?.quantity ?? 0;

  const computedNewQuantity = useMemo(() => {
    if (!item) return 0;
    if (type === 'entry') return previousQuantity + quantity;
    if (type === 'exit') return Math.max(0, previousQuantity - quantity);
    return quantity; // adjustment sets absolute value
  }, [item, previousQuantity, quantity, type]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!type) e.type = 'Requerido';
    if (type === 'adjustment') {
      if (quantity < 0) e.quantity = 'Debe ser mayor o igual a 0';
    } else {
      if (!quantity || quantity <= 0) e.quantity = 'Mayor a 0';
    }
    if (!reason.trim()) e.reason = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!item) return;
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: Omit<InventoryMovement, 'id'> = {
        warehouseId: item.warehouseId,
        warehouseName: item.warehouseName,
        productId: item.productId,
        productName: item.productName,
        productCode: item.productCode,
        type,
        quantity: type === 'adjustment' ? Math.abs(previousQuantity - quantity) : quantity,
        previousQuantity,
        newQuantity: computedNewQuantity,
        reason,
        performedBy: 'user-1',
        performedByName: 'Sistema',
        notes: notes || undefined,
        createdAt: new Date().toISOString(),
      };
      await onConfirm(payload);
      onClose();
      // reset
      setType('adjustment');
      setQuantity(0);
      setReason('');
      setNotes('');
      setErrors({});
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajuste de inventario</DialogTitle>
        </DialogHeader>

        {item ? (
          <form onSubmit={handleConfirm} className="space-y-4">
            <div className="rounded-lg border border-zinc-200 p-3 bg-zinc-50">
              <p className="text-sm font-medium text-zinc-900">{item.productName}</p>
              <p className="text-xs text-zinc-500">{item.productCode} • {item.warehouseName}</p>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="text-zinc-600">Actual:</span>
                <span className="font-semibold text-zinc-900">{previousQuantity}</span>
                <span className="text-zinc-400">→</span>
                <span className="text-zinc-600">Nuevo:</span>
                <span className="font-semibold text-zinc-900">{computedNewQuantity}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Tipo de movimiento</Label>
                <Select value={type} onValueChange={(v) => setType(v as InventoryMovementType)}>
                  <SelectTrigger className={cn(errors.type && 'border-red-400 focus-visible:ring-red-200')}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entrada</SelectItem>
                    <SelectItem value="exit">Salida</SelectItem>
                    <SelectItem value="adjustment">Ajuste</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-xs text-red-600">{errors.type}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Cantidad</Label>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 tracking-wide">REQUERIDO</span>
                </div>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={cn(errors.quantity && 'border-red-400 focus-visible:ring-red-200')}
                  min={type === 'adjustment' ? 0 : 1}
                  step={1}
                />
                {errors.quantity && <p className="text-xs text-red-600">{errors.quantity}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Motivo</Label>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 tracking-wide">REQUERIDO</span>
              </div>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ej. Reconteo, merma, corrección, recepción, salida a producción"
                className={cn(errors.reason && 'border-red-400 focus-visible:ring-red-200')}
              />
              {errors.reason && <p className="text-xs text-red-600">{errors.reason}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Notas (opcional)</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Detalles adicionales"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Confirmar'}</Button>
            </DialogFooter>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
