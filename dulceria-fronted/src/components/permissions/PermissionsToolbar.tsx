"use client";

import React from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { Toolbar } from '@/components/shared/Toolbar';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface PermissionsToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedModule: string;
  onModuleChange: (value: string) => void;
  modules: Array<{ id: string; name: string }>;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
}

export function PermissionsToolbar({ 
  searchTerm, 
  onSearchChange, 
  selectedModule,
  onModuleChange,
  modules,
  onExportExcel,
  onExportPdf
}: PermissionsToolbarProps) {
  const hasActiveFilters = selectedModule !== 'all';

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar permiso..."
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
        </>
      )}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={hasActiveFilters ? 1 : 0}
      onClearFilters={() => onModuleChange('all')}
      filters={(
        <div className="space-y-2 w-full">
          <Label className="text-xs text-zinc-600">Módulo</Label>
          <Select value={selectedModule} onValueChange={onModuleChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los módulos</SelectItem>
              {modules.map((module) => (
                <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}
