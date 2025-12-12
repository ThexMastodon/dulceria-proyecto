"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Movement } from '@/types/movement';

interface DeleteMovementModalProps {
  isOpen: boolean;
  movement: Movement | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteMovementModal({ isOpen, movement, onClose, onConfirm }: DeleteMovementModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(o)=>!o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar movimiento</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-zinc-600">¿Seguro que deseas eliminar el movimiento {movement?.id}?</p>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm}>Eliminar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
