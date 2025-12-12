"use client";

import React from 'react';
import { Plus, FileDown, FileSpreadsheet } from 'lucide-react';
import { Toolbar } from '@/components/shared/Toolbar';
import { Button } from '@/components/ui/button';

interface BranchesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
}

export function BranchesToolbar({ 
  searchTerm, 
  onSearchChange, 
  onCreateClick,
  onExportExcel,
  onExportPdf
}: BranchesToolbarProps) {
  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar sucursal..."
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
            Nueva Sucursal
          </Button>
        </>
      )}
    />
  );
}
