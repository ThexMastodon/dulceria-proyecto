"use client";

import React from 'react';
import { Plus, FileDown, FileSpreadsheet } from 'lucide-react';
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

interface ProductsToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
}

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'Chocolates', label: 'Chocolates' },
  { value: 'Gomitas', label: 'Gomitas' },
  { value: 'Caramelos', label: 'Caramelos' },
  { value: 'Dulces Regionales', label: 'Dulces Regionales' },
  { value: 'Importados', label: 'Importados' },
  { value: 'Otros', label: 'Otros' },
];

export function ProductsToolbar({ 
  searchTerm, 
  onSearchChange, 
  onCreateClick,
  selectedCategory,
  onCategoryChange,
  onExportExcel,
  onExportPdf
}: ProductsToolbarProps) {
  const hasActiveFilters = selectedCategory !== 'all';

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar producto..."
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
            Nuevo producto
          </Button>
        </>
      )}
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={hasActiveFilters ? 1 : 0}
      onClearFilters={() => onCategoryChange('all')}
      filters={(
        <div className="space-y-2 w-full">
          <Label className="text-xs text-zinc-600">Categoría</Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}
