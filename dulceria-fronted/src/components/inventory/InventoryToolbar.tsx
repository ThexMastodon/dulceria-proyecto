"use client";

import React from 'react';
import { Toolbar } from '@/components/shared/Toolbar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { InventoryStatus } from '@/types/inventory';
import { Warehouse } from '@/types/warehouse';
import { Label } from '@/components/ui/label';
import { Building2, BadgeCheck, Layers } from 'lucide-react';

interface InventoryToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedWarehouse: string;
  onWarehouseChange: (value: string) => void;
  warehouses: Warehouse[];
  statusFilter: InventoryStatus | 'all';
  onStatusFilterChange: (status: InventoryStatus | 'all') => void;
  stockFilter: 'all' | 'low-stock' | 'out-of-stock' | 'normal';
  onStockFilterChange: (filter: 'all' | 'low-stock' | 'out-of-stock' | 'normal') => void;
  actions?: React.ReactNode;
}

export function InventoryToolbar({
  searchTerm,
  onSearchChange,
  selectedWarehouse,
  onWarehouseChange,
  warehouses,
  statusFilter,
  onStatusFilterChange,
  stockFilter,
  onStockFilterChange,
  actions,
}: InventoryToolbarProps) {
  const hasActiveFilters =
    statusFilter !== 'all' ||
    stockFilter !== 'all' ||
    selectedWarehouse !== 'all';

  const activeFiltersCount = [
    statusFilter !== 'all',
    stockFilter !== 'all',
    selectedWarehouse !== 'all',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    onStatusFilterChange('all');
    onStockFilterChange('all');
    onWarehouseChange('all');
  };

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar por producto, código, ubicación..."
      actions={actions}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={clearAllFilters}
      filters={(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="space-y-2">
            <Label className="text-xs text-zinc-600 flex items-center gap-2"><Building2 className="h-4 w-4 text-zinc-500" /> Almacén</Label>
            <Select value={selectedWarehouse} onValueChange={onWarehouseChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los almacenes</SelectItem>
                {warehouses.filter(w => w.active).map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id}>
                    🏪 {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-zinc-500">Selecciona el almacén para filtrar el stock.</p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-zinc-600 flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-zinc-500" /> Estado del Producto</Label>
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="available">✅ Disponible</SelectItem>
                <SelectItem value="reserved">🔒 Reservado</SelectItem>
                <SelectItem value="damaged">⚠️ Dañado</SelectItem>
                <SelectItem value="expired">❌ Vencido</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-zinc-500">Filtra por disponibilidad o condición.</p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-zinc-600 flex items-center gap-2"><Layers className="h-4 w-4 text-zinc-500" /> Nivel de Stock</Label>
            <Select value={stockFilter} onValueChange={onStockFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="out-of-stock">🚫 Sin stock</SelectItem>
                <SelectItem value="low-stock">📉 Stock bajo</SelectItem>
                <SelectItem value="normal">✓ Stock normal</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-zinc-500">Identifica productos con bajo inventario.</p>
          </div>
        </div>
      )}
    />
  );
}
