"use client";

import React from 'react';
import { Plus, FileDown, FileSpreadsheet } from 'lucide-react';
import { Branch } from '@/types/branch';
import { Toolbar } from '@/components/shared/Toolbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WarehousesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  branches: Branch[];
  selectedBranch: string;
  onBranchFilterChange: (branchId: string) => void;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
}

export function WarehousesToolbar({ 
  searchTerm, 
  onSearchChange, 
  onCreateClick,
  branches,
  selectedBranch,
  onBranchFilterChange,
  onExportExcel,
  onExportPdf
}: WarehousesToolbarProps) {
  const hasActiveFilters = selectedBranch !== 'all';

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar almacén..."
      actions={(
        <>
          <Button variant="outline" className="gap-2" onClick={onExportExcel}>
            <FileSpreadsheet size={18} className="text-emerald-600" />
            Excel
          </Button>
          <Button variant="outline" className="gap-2" onClick={onExportPdf}>
            <FileDown size={18} className="text-red-500" />
            PDF
          </Button>
          <Button onClick={onCreateClick} className="gap-2">
            <Plus size={18} />
            Nuevo Almacén
          </Button>
        </>
      )}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={hasActiveFilters ? 1 : 0}
      onClearFilters={() => onBranchFilterChange('all')}
      filters={(
        <div className="space-y-2 w-full">
          <Label className="text-xs text-zinc-600">Sucursal</Label>
          <Select value={selectedBranch} onValueChange={onBranchFilterChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las sucursales</SelectItem>
              {branches.filter(b => b.active).map(branch => (
                <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}
