"use client";

import React, { useState } from 'react';
import { RouteOrder, RouteOrderItem, RouteOrderStatus } from '@/types/routeOrder';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCustomers } from '@/hooks/useCustomers';
import { customerRepository } from '@/repositories/CustomerRepository';
import { cn } from '@/lib/utils';
import { DateTimeField } from '@/components/shared/DateTimeField';

interface RouteOrderFormModalProps {
  isOpen: boolean;
  order: RouteOrder | null;
  formData: Partial<RouteOrder>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<RouteOrder>) => void;
}

export function RouteOrderFormModal({ isOpen, order, formData, onClose, onSave, onChange }: RouteOrderFormModalProps) {
  const isEditing = !!order;
  const { customers } = useCustomers(customerRepository);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    const newItem: RouteOrderItem = {
      id: `temp-${Date.now()}`,
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    };
    onChange({ ...formData, items: [...(formData.items || []), newItem] });
  };

  const removeItem = (index: number) => {
    const items = [...(formData.items || [])];
    items.splice(index, 1);
    onChange({ ...formData, items });
    calculateTotals(items);
  };

  const updateItem = (index: number, updates: Partial<RouteOrderItem>) => {
    const items = [...(formData.items || [])];
    items[index] = { ...items[index], ...updates };
    if (updates.quantity !== undefined || updates.unitPrice !== undefined) {
      items[index].subtotal = items[index].quantity * items[index].unitPrice;
    }
    onChange({ ...formData, items });
    calculateTotals(items);
  };

  const calculateTotals = (items: RouteOrderItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.16;
    const discount = formData.discount || 0;
    const total = subtotal + tax - discount;
    onChange({ ...formData, items, subtotal, tax, total });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.orderNumber?.trim()) e.orderNumber = 'Requerido';
    if (!formData.routeId?.trim()) e.routeId = 'Requerido';
    if (!formData.deliveryPersonId?.trim()) e.deliveryPersonId = 'Requerido';
    if (!formData.customerName?.trim()) e.customerName = 'Requerido';
    if (!formData.customerPhone?.trim()) e.customerPhone = 'Requerido';
    if (!formData.customerAddress?.trim()) e.customerAddress = 'Requerido';
    const items = formData.items || [];
    if (items.length === 0) e.items = 'Agrega al menos un producto';
    else if (items.some(it => !it.productName?.trim() || !it.quantity || it.quantity <= 0 || it.unitPrice === undefined || it.unitPrice < 0)) {
      e.items = 'Completa producto, cantidad y precio válidos';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) onSave(ev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Pedido' : 'Levantar Nuevo Pedido'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Número de Pedido</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                value={formData.orderNumber || ''}
                onChange={(e) => {
                  onChange({ ...formData, orderNumber: e.target.value });
                  if (errors.orderNumber) setErrors({ ...errors, orderNumber: '' });
                }}
                className={cn(errors.orderNumber && 'border-red-300 bg-red-50')}
                placeholder="ORD-0001"
              />
              {errors.orderNumber && <p className="text-xs text-red-600">{errors.orderNumber}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Ruta</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Select value={formData.routeId || ''} onValueChange={(value: string) => { onChange({ ...formData, routeId: value }); if (errors.routeId) setErrors({ ...errors, routeId: '' }); }}>
                <SelectTrigger className={cn(errors.routeId && 'border-red-300 bg-red-50')}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="route-1">Ruta Norte - Zona 1</SelectItem>
                  <SelectItem value="route-2">Ruta Sur - Zona 2</SelectItem>
                  <SelectItem value="route-3">Ruta Centro - Zona 3</SelectItem>
                </SelectContent>
              </Select>
              {errors.routeId && <p className="text-xs text-red-600">{errors.routeId}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Repartidor</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Select value={formData.deliveryPersonId || ''} onValueChange={(value: string) => { onChange({ ...formData, deliveryPersonId: value }); if (errors.deliveryPersonId) setErrors({ ...errors, deliveryPersonId: '' }); }}>
                <SelectTrigger className={cn(errors.deliveryPersonId && 'border-red-300 bg-red-50')}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery-1">Juan Pérez</SelectItem>
                  <SelectItem value="delivery-2">María González</SelectItem>
                  <SelectItem value="delivery-3">Carlos López</SelectItem>
                </SelectContent>
              </Select>
              {errors.deliveryPersonId && <p className="text-xs text-red-600">{errors.deliveryPersonId}</p>}
            </div>
          </div>

          {/* Fecha y hora de entrega */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-zinc-500 uppercase">Fecha y hora de entrega</Label>
              <DateTimeField
                value={formData.deliveryDate}
                onChange={(iso) => {
                  const time = iso.slice(11, 16);
                  onChange({ ...formData, deliveryDate: iso, deliveryTime: time });
                }}
                placeholder="Selecciona fecha y hora"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cliente existente</Label>
              <Select
                value={formData.customerId || 'none'}
                onValueChange={(value: string) => {
                  if (value === 'none') {
                    onChange({ ...formData, customerId: undefined });
                    return;
                  }
                  const selected = customers.find(c => c.id === value);
                  if (selected) {
                    onChange({
                      ...formData,
                      customerId: selected.id,
                      customerName: selected.name,
                      customerPhone: selected.phone,
                      customerAddress: selected.address,
                      routeId: formData.routeId || selected.routeId,
                      lat: selected.lat,
                      lng: selected.lng,
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nuevo cliente</SelectItem>
                  {customers.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} — {c.neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Cliente</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input required value={formData.customerName || ''} onChange={(e) => { onChange({ ...formData, customerName: e.target.value }); if (errors.customerName) setErrors({ ...errors, customerName: '' }); }} className={cn(errors.customerName && 'border-red-300 bg-red-50')} />
              {errors.customerName && <p className="text-xs text-red-600">{errors.customerName}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Teléfono</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input required value={formData.customerPhone || ''} onChange={(e) => { onChange({ ...formData, customerPhone: e.target.value }); if (errors.customerPhone) setErrors({ ...errors, customerPhone: '' }); }} className={cn(errors.customerPhone && 'border-red-300 bg-red-50')} />
              {errors.customerPhone && <p className="text-xs text-red-600">{errors.customerPhone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-semibold text-zinc-500 uppercase">Dirección</Label>
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
            </div>
            <Input required value={formData.customerAddress || ''} onChange={(e) => { onChange({ ...formData, customerAddress: e.target.value }); if (errors.customerAddress) setErrors({ ...errors, customerAddress: '' }); }} className={cn(errors.customerAddress && 'border-red-300 bg-red-50')} />
            {errors.customerAddress && <p className="text-xs text-red-600">{errors.customerAddress}</p>}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Productos</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Button type="button" onClick={addItem} size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />Agregar
              </Button>
            </div>
            <div className={cn('border rounded-lg overflow-hidden', errors.items && 'border-red-300 bg-red-50')}>
              <table className="w-full text-sm">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Producto</th>
                    <th className="px-3 py-2 text-center">Cantidad</th>
                    <th className="px-3 py-2 text-right">Precio</th>
                    <th className="px-3 py-2 text-right">Subtotal</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {(formData.items || []).map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2">
                        <Input required value={item.productName} onChange={(e) => updateItem(index, { productName: e.target.value })} className="h-8" />
                      </td>
                      <td className="px-3 py-2">
                        <Input required type="number" min="1" value={item.quantity} onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })} className="h-8 text-center" />
                      </td>
                      <td className="px-3 py-2">
                        <Input required type="number" step="0.01" value={item.unitPrice} onChange={(e) => updateItem(index, { unitPrice: Number(e.target.value) })} className="h-8 text-right" />
                      </td>
                      <td className="px-3 py-2 text-right font-medium">${item.subtotal.toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)} className="h-8 w-8 p-0 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {errors.items && <p className="text-xs text-red-600">{errors.items}</p>}
          </div>

          <div className="bg-zinc-50 rounded-lg p-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${(formData.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA (16%)</span>
              <span>${(formData.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t pt-1">
              <span>Total</span>
              <span>${(formData.total || 0).toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{isEditing ? 'Actualizar' : 'Crear Pedido'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
