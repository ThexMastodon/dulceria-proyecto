"use client";

import React from 'react';
import { Movement, MovementType } from '@/types/movement';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateTimeField } from '@/components/shared/DateTimeField';
import { useSuppliers } from '@/hooks/useSuppliers';
import { supplierRepository } from '@/repositories/SupplierRepository';
import { useProducts } from '@/hooks/useProducts';
import { productRepository } from '@/repositories/ProductRepository';

interface MovementFormModalProps {
  isOpen: boolean;
  movement: Movement | null;
  formData: Partial<Movement>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<Movement>) => void;
}

export function MovementFormModal({ isOpen, movement, formData, onClose, onSave, onChange }: MovementFormModalProps) {
  const { suppliers } = useSuppliers(supplierRepository);
  const { products } = useProducts(productRepository);
  const [selectedSupplier, setSelectedSupplier] = React.useState<string>('all');
  const [productQuery, setProductQuery] = React.useState<string>('');
  const [openPicker, setOpenPicker] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!openPicker) return;
      const target = e.target as HTMLElement;
      if (!target.closest('[data-role="product-picker-panel"]') && !target.closest('[data-role="product-picker-trigger"]')) {
        setOpenPicker(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [openPicker]);

  return (
    <Dialog open={isOpen} onOpenChange={(o)=>!o && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{movement ? 'Editar movimiento' : 'Nuevo movimiento'}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e)=>{
            e.preventDefault();
            const prod = products.find(p => p.id === (formData.productId||'')) || products.find(p => p.name === (formData.productName||''));
            if ((formData.type as MovementType) === 'Salida' && prod && (formData.quantity||0) > (prod.stock||0)) {
              return; // bloquea submit si excede stock
            }
            onSave(e);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={(formData.type as MovementType) ?? 'Entrada'} onValueChange={(v)=>onChange({ ...formData, type: v as MovementType })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entrada">Entrada</SelectItem>
                  <SelectItem value="Salida">Salida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fecha</Label>
              <DateTimeField value={formData.date as string | undefined} onChange={(iso)=>onChange({ ...formData, date: iso })} />
            </div>
            <div className="space-y-2">
              <Label>Filtrar por proveedor</Label>
              <Select value={selectedSupplier} onValueChange={(v)=> setSelectedSupplier(v)}>
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
              <Label>Producto</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                  onClick={()=> setOpenPicker(v => !v)}
                  data-role="product-picker-trigger"
                >
                  {formData.productName || 'Buscar producto...'}
                </Button>
                {openPicker && (
                  <div className="absolute z-50 mt-2 w-[28rem] rounded-xl border border-zinc-200 bg-white shadow-lg p-2" data-role="product-picker-panel">
                    <div className="space-y-2">
                      <Input
                        placeholder="Buscar por nombre o SKU"
                        value={productQuery}
                        onChange={(e)=>setProductQuery(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <div className="max-h-60 overflow-y-auto border rounded-md">
                        {products
                          .filter(p => p.active !== false)
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
                                onChange({ ...formData, productId: p.id, productName: p.name, unit: p.unit ?? formData.unit });
                                setOpenPicker(false);
                              }}
                              className="w-full text-left px-2 py-2 hover:bg-zinc-50"
                            >
                              <div className="text-sm font-medium text-zinc-900">{p.name}</div>
                              <div className="text-xs text-zinc-500">SKU: {p.sku} · Proveedor: {p.supplierName} · Stock: {p.stock} {p.unit}</div>
                            </button>
                          ))}
                        {products
                          .filter(p => p.active !== false)
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
            </div>
            <div className="space-y-2">
              <Label>Almacén</Label>
              <Input value={formData.warehouseName ?? ''} onChange={e=>onChange({ ...formData, warehouseName: e.target.value })} placeholder="Nombre del almacén" />
            </div>
            <div className="space-y-2">
              <Label>Cantidad</Label>
              {(() => {
                const prod = products.find(p => p.id === (formData.productId||'')) || products.find(p => p.name === (formData.productName||''));
                const isSalida = (formData.type as MovementType) === 'Salida';
                const exceeds = isSalida && prod ? (formData.quantity||0) > (prod.stock||0) : false;
                return (
                  <>
                    <Input
                      type="number"
                      value={formData.quantity ?? 0}
                      onChange={e=>onChange({ ...formData, quantity: Number(e.target.value) })}
                      className={exceeds ? 'border-red-300 bg-red-50' : ''}
                    />
                    {isSalida && prod && (
                      <p className={`text-xs mt-1 ${exceeds ? 'text-red-600' : 'text-zinc-500'}`}>
                        Stock disponible: {prod.stock} {prod.unit}
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="space-y-2">
              <Label>Unidad</Label>
              <Input value={formData.unit ?? 'pza'} onChange={e=>onChange({ ...formData, unit: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Referencia</Label>
              <Input value={formData.reference ?? ''} onChange={e=>onChange({ ...formData, reference: e.target.value })} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Notas</Label>
              <Input value={formData.notes ?? ''} onChange={e=>onChange({ ...formData, notes: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            {(() => {
              const prod = products.find(p => p.id === (formData.productId||'')) || products.find(p => p.name === (formData.productName||''));
              const isSalida = (formData.type as MovementType) === 'Salida';
              const exceeds = isSalida && prod ? (formData.quantity||0) > (prod.stock||0) : false;
              return (
                <Button type="submit" disabled={exceeds}>Guardar</Button>
              );
            })()}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
