"use client";

import React from "react";
import { RouteCustomer } from "@/types/routeOrder";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DeleteCustomerModalProps {
  isOpen: boolean;
  customer: RouteCustomer | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteCustomerModal({ isOpen, customer, onClose, onConfirm }: DeleteCustomerModalProps) {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Eliminar Cliente</DialogTitle>
              <DialogDescription>Esta acción no se puede deshacer</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-zinc-600">
            ¿Estás seguro de eliminar al cliente <span className="font-semibold">{customer.name}</span>?
          </p>
          <p className="text-sm text-zinc-500 mt-2">Teléfono: {customer.phone}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
