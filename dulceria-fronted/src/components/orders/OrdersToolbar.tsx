"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toolbar } from '@/components/shared/Toolbar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface OrdersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  selectedWarehouseId: string;
  onWarehouseChange: (id: string) => void;
  dateRangeFilter?: 'today' | 'week' | 'month' | 'all';
  onDateRangeFilterChange: (range: 'today' | 'week' | 'month' | 'all') => void;
}

export function OrdersToolbar({ 
  searchTerm, 
  onSearchChange, 
  onCreateClick,
  selectedWarehouseId,
  onWarehouseChange,
  dateRangeFilter = 'all',
  onDateRangeFilterChange
}: OrdersToolbarProps) {
  const hasActiveFilters = dateRangeFilter !== 'all';

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar por número de pedido, cliente..."
      actions={(
        <Button onClick={onCreateClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Pedido
        </Button>
      )}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={hasActiveFilters ? 1 : 0}
      onClearFilters={() => onDateRangeFilterChange('all')}
      filters={(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label className="text-xs text-zinc-600">Almacén</Label>
            <Select value={selectedWarehouseId} onValueChange={onWarehouseChange}>
              <SelectTrigger>
                <SelectValue />
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
            <Label className="text-xs text-zinc-600">Período</Label>
            <Select value={dateRangeFilter} onValueChange={onDateRangeFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo el historial</SelectItem>
                <SelectItem value="today">📅 Hoy</SelectItem>
                <SelectItem value="week">📆 Esta semana</SelectItem>
                <SelectItem value="month">🗓️ Este mes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    />
  );
}
