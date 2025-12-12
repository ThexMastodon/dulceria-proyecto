"use client";

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ToolbarProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode; // Right-aligned actions (create/export)
  filters?: React.ReactNode; // Grid with filter controls
  hasActiveFilters?: boolean;
  activeFiltersCount?: number;
  onClearFilters?: () => void;
}

export function Toolbar({
  searchTerm,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  actions,
  filters,
  hasActiveFilters,
  activeFiltersCount,
  onClearFilters,
}: ToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
            className="w-full pl-10"
          />
        </div>
        {actions && (
          <div className="flex gap-2 w-full lg:w-auto flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {filters && (
        <div className="bg-zinc-50 rounded-lg border border-zinc-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-600" />
              <span className="text-sm font-medium text-zinc-700">Filtros</span>
              {hasActiveFilters ? (
                <Badge variant="secondary" className="text-xs">
                  {activeFiltersCount ?? 0} activos
                </Badge>
              ) : null}
            </div>
            {hasActiveFilters && onClearFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-8 gap-1 text-xs"
              >
                <X className="h-3 w-3" />
                Limpiar filtros
              </Button>
            )}
          </div>

          {filters}
        </div>
      )}
    </div>
  );
}
