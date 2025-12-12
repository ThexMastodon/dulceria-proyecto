"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toolbar } from '@/components/shared/Toolbar';

interface RouteOrdersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  selectedRoute: string;
  onRouteChange: (route: string) => void;
  dateRangeFilter?: 'today' | 'week' | 'month' | 'all';
  onDateRangeFilterChange: (range: 'today' | 'week' | 'month' | 'all') => void;
}

export function RouteOrdersToolbar({ 
  searchTerm, 
  onSearchChange, 
  onCreateClick,
  selectedRoute,
  onRouteChange,
  dateRangeFilter = 'all',
  onDateRangeFilterChange
}: RouteOrdersToolbarProps) {
  const hasActiveFilters = selectedRoute !== 'all' || dateRangeFilter !== 'all';
  const activeFiltersCount = [selectedRoute !== 'all', dateRangeFilter !== 'all'].filter(Boolean).length;

  const clearAllFilters = () => {
    onRouteChange('all');
    onDateRangeFilterChange('all');
  };

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar por pedido, cliente, dirección..."
      actions={(
        <Button onClick={onCreateClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Levantar Pedido
        </Button>
      )}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={clearAllFilters}
      filters={(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-zinc-600">Ruta</Label>
            <Select value={selectedRoute} onValueChange={onRouteChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las Rutas</SelectItem>
                <SelectItem value="route-1">🚚 Ruta Norte - Zona 1</SelectItem>
                <SelectItem value="route-2">🚚 Ruta Sur - Zona 2</SelectItem>
                <SelectItem value="route-3">🚚 Ruta Centro - Zona 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-zinc-600">Período de Entrega</Label>
            <Select value={dateRangeFilter} onValueChange={onDateRangeFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fechas</SelectItem>
                <SelectItem value="today">📅 Entregas de hoy</SelectItem>
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
 