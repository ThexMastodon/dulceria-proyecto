"use client";

import React, { useState } from 'react';
import { Order, OrderItem, OrderStatus, PaymentStatus } from '@/types/order';
import { X, Plus, Trash2 } from 'lucide-react';
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
import { useSuppliers } from '@/hooks/useSuppliers';
import { supplierRepository } from '@/repositories/SupplierRepository';
import { useProducts } from '@/hooks/useProducts';
import { productRepository } from '@/repositories/ProductRepository';

interface OrderFormModalProps {
  isOpen: boolean;
  order: Order | null;
  formData: Partial<Order>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<Order>) => void;
}

export function OrderFormModal({
  isOpen,
  order,
  formData,
  onClose,
  onSave,
  onChange,
}: OrderFormModalProps) {
  const isEditing = !!order;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { suppliers } = useSuppliers(supplierRepository);
  const { products } = useProducts(productRepository);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('all');
  const [productQuery, setProductQuery] = useState<string>('');
  const [openProductPickerIndex, setOpenProductPickerIndex] = useState<number | null>(null);

  // Cerrar el panel de productos al hacer click fuera
  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (openProductPickerIndex === null) return;
      const target = e.target as HTMLElement;
      if (!target.closest('[data-role="product-picker-panel"]') && !target.closest('[data-role="product-picker-trigger"]')) {
        setOpenProductPickerIndex(null);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [openProductPickerIndex]);

  const addItem = () => {
    const newItem: OrderItem = {
      id: `temp-${Date.now()}`,
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    };
    
    onChange({
      ...formData,
      items: [...(formData.items || []), newItem],
    });
  };

  const removeItem = (index: number) => {
    const items = [...(formData.items || [])];
    items.splice(index, 1);
    onChange({ ...formData, items });
    calculateTotals(items);
  };

  const updateItem = (index: number, updates: Partial<OrderItem>) => {
    const items = [...(formData.items || [])];
    items[index] = { ...items[index], ...updates };
    
    // Recalculate subtotal for this item
    if (updates.quantity !== undefined || updates.unitPrice !== undefined) {
      items[index].subtotal = items[index].quantity * items[index].unitPrice;
    }
    
    onChange({ ...formData, items });
    calculateTotals(items);
  };

  const calculateTotals = (items: OrderItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.16; // 16% IVA
    const discount = formData.discount || 0;
    const total = subtotal + tax - discount;

    onChange({
      ...formData,
      items,
      subtotal,
      tax,
      total,
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.orderNumber?.trim()) e.orderNumber = 'Requerido';
    if (!formData.warehouseId?.trim()) e.warehouseId = 'Requerido';
    if (!formData.status?.toString().trim()) e.status = 'Requerido';
    if (!formData.paymentStatus?.toString().trim()) e.paymentStatus = 'Requerido';
    const items = formData.items || [];
    if (items.length === 0) e.items = 'Agrega al menos un artículo';
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
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Pedido' : 'Nuevo Pedido'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información General */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Número de Pedido</Label>
              <Input
                id="orderNumber"
                required
                value={formData.orderNumber || ''}
                onChange={(e) => { onChange({ ...formData, orderNumber: e.target.value }); if (errors.orderNumber) setErrors({ ...errors, orderNumber: '' }); }}
                placeholder="ORD-2024-001"
                className={cn(errors.orderNumber && 'border-red-300 bg-red-50')}
              />
              {errors.orderNumber && <p className="text-xs text-red-600">{errors.orderNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouseId">Almacén</Label>
              <Select
                value={formData.warehouseId || ''}
                onValueChange={(value: string) => { onChange({ ...formData, warehouseId: value }); if (errors.warehouseId) setErrors({ ...errors, warehouseId: '' }); }}
              >
                <SelectTrigger className={cn(errors.warehouseId && 'border-red-300 bg-red-50')}>
                  <SelectValue placeholder="Seleccionar almacén" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Almacén Principal Centro</SelectItem>
                  <SelectItem value="2">Almacén Refrigerado Centro</SelectItem>
                  <SelectItem value="3">Almacén Norte</SelectItem>
                  <SelectItem value="4">Almacén Sur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Cliente</Label>
              <Input
                id="clientName"
                value={formData.clientName || ''}
                onChange={(e) => onChange({ ...formData, clientName: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pago</Label>
              <Select
                value={formData.paymentMethod || ''}
                onValueChange={(value: string) => onChange({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Efectivo">Efectivo</SelectItem>
                  <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="Transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierFilter">Filtrar por proveedor</Label>
              <Select value={selectedSupplier} onValueChange={(value)=> setSelectedSupplier(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {suppliers.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado del Pedido</Label>
              <Select
                value={formData.status || 'pending'}
                onValueChange={(value: string) => { onChange({ ...formData, status: value as OrderStatus }); if (errors.status) setErrors({ ...errors, status: '' }); }}
              >
                <SelectTrigger className={cn(errors.status && 'border-red-300 bg-red-50')}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="processing">Procesando</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Estado de Pago</Label>
              <Select
                value={formData.paymentStatus || 'pending'}
                onValueChange={(value: string) => { onChange({ ...formData, paymentStatus: value as PaymentStatus }); if (errors.paymentStatus) setErrors({ ...errors, paymentStatus: '' }); }}
              >
                <SelectTrigger className={cn(errors.paymentStatus && 'border-red-300 bg-red-50')}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="paid">Pagado</SelectItem>
                  <SelectItem value="partial">Parcial</SelectItem>
                  <SelectItem value="refunded">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Items del Pedido */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Artículos del Pedido</Label>
              <Button type="button" onClick={addItem} size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Agregar Artículo
              </Button>
            </div>

            <div className={cn('border border-zinc-200 rounded-lg overflow-visible', errors.items && 'border-red-300 bg-red-50')}>
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500">Producto</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-zinc-500">Cantidad</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-zinc-500">Precio Unit.</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-zinc-500">Subtotal</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-zinc-500">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {(formData.items || []).map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2">
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start h-8 text-sm"
                            type="button"
                            onClick={() => setOpenProductPickerIndex(openProductPickerIndex === index ? null : index)}
                            data-role="product-picker-trigger"
                          >
                            {item.productName || 'Buscar producto...'}
                          </Button>
                          {openProductPickerIndex === index && (
                            <div className="absolute z-50 mt-2 w-80 rounded-xl border border-zinc-200 bg-white shadow-lg p-2" data-role="product-picker-panel">
                              <div className="space-y-2">
                                <Input
                                  placeholder="Buscar por nombre o SKU"
                                  value={productQuery}
                                  onChange={(e)=>setProductQuery(e.target.value)}
                                  className="h-8 text-sm"
                                />
                                <div className="max-h-48 overflow-y-auto border rounded-md">
                                  {products
                                    .filter(p => (selectedSupplier==='all' || p.supplierId===selectedSupplier))
                                    .filter(p => {
                                      const q = productQuery.trim().toLowerCase();
                                      if (!q) return true;
                                      return p.name.toLowerCase().includes(q) || (p.sku||'').toLowerCase().includes(q);
                                    })
                                    .map(p => (
                                      <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => {
                                          updateItem(index, { productId: p.id, productName: p.name, unitPrice: p.price, subtotal: (item.quantity||0) * p.price });
                                          setOpenProductPickerIndex(null);
                                        }}
                                        className="w-full text-left px-2 py-2 hover:bg-zinc-50"
                                      >
                                        <div className="text-sm font-medium text-zinc-900">{p.name}</div>
                                        <div className="text-xs text-zinc-500">SKU: {p.sku} · Proveedor: {p.supplierName} · Stock: {p.stock} {p.unit}</div>
                                      </button>
                                    ))}
                                  {products
                                    .filter(p => (selectedSupplier==='all' || p.supplierId===selectedSupplier))
                                    .filter(p => {
                                      const q = productQuery.trim().toLowerCase();
                                      if (!q) return true;
                                      return p.name.toLowerCase().includes(q) || (p.sku||'').toLowerCase().includes(q);
                                    }).length===0 && (
                                      <div className="px-2 py-4 text-center text-xs text-zinc-500">Sin resultados</div>
                                    )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          required
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
                          className="h-8 text-sm text-center"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          required
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, { unitPrice: Number(e.target.value) })}
                          className="h-8 text-sm text-right"
                        />
                      </td>
                      <td className="px-3 py-2 text-right text-sm font-medium">
                        ${item.subtotal.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {(formData.items || []).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-8 text-center text-sm text-zinc-500">
                        No hay artículos. Haz clic en "Agregar Artículo" para comenzar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {errors.items && <p className="text-xs text-red-600">{errors.items}</p>}
          </div>

          {/* Resumen de Totales */}
          <div className="bg-zinc-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium">${(formData.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">IVA (16%)</span>
              <span className="font-medium">${(formData.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-600">Descuento</span>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount || 0}
                  onChange={(e) => {
                    const discount = Number(e.target.value);
                    const subtotal = formData.subtotal || 0;
                    const tax = formData.tax || 0;
                    const total = subtotal + tax - discount;
                    onChange({ ...formData, discount, total });
                  }}
                  className="h-8 w-24 text-right"
                />
              </div>
            </div>
            <div className="border-t border-zinc-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-base font-semibold text-zinc-900">Total</span>
                <span className="text-lg font-bold text-zinc-900">
                  ${(formData.total || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas (Opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...formData, notes: e.target.value })}
              placeholder="Agregar notas adicionales sobre el pedido..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Actualizar Pedido' : 'Crear Pedido'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
