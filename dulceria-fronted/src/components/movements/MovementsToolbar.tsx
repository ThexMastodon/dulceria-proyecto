"use client";

import React from 'react';
import { FileDown, FileSpreadsheet, Plus } from 'lucide-react';
import { Toolbar } from '@/components/shared/Toolbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MovementsToolbarProps {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  onCreateClick: () => void;
  selectedType: string; // 'all' | 'Entrada' | 'Salida'
  onTypeChange: (v: string) => void;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
}

export function MovementsToolbar({ searchTerm, onSearchChange, onCreateClick, selectedType, onTypeChange, onExportExcel, onExportPdf }: MovementsToolbarProps) {
  const hasActiveFilters = selectedType !== 'all';

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar movimiento..."
      actions={(
        <>
          <Button variant="outline" className="gap-2" onClick={onExportExcel}>
            <FileSpreadsheet size={18} className="text-emerald-600" />
            <span className="hidden sm:inline">Excel</span>
          </Button>
          <Button variant="outline" className="gap-2" onClick={onExportPdf}>
            <FileDown size={18} className="text-red-500" />
            <span className="hidden sm:inline">PDF</span>
          </Button>
          <Button onClick={onCreateClick} className="gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">Nuevo movimiento</span>
          </Button>
        </>
      )}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={hasActiveFilters ? 1 : 0}
      onClearFilters={() => onTypeChange('all')}
      filters={(
        <div className="space-y-2 w-full">
          <Label className="text-xs text-zinc-600">Tipo de movimiento</Label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Entrada">Entrada</SelectItem>
              <SelectItem value="Salida">Salida</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}
