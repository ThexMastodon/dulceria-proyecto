"use client";

import React from 'react';
import { Plus, FileDown, FileSpreadsheet } from 'lucide-react';
import { Toolbar } from '@/components/shared/Toolbar';

interface CustomersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
}

export function CustomersToolbar({ searchTerm, onSearchChange, onCreateClick, onExportExcel, onExportPdf }: CustomersToolbarProps) {
  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar cliente..."
      actions={(
        <>
          <button
            onClick={onExportExcel}
            className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-3 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors whitespace-nowrap"
          >
            <FileSpreadsheet size={18} className="text-emerald-600" />
            <span className="hidden sm:inline">Excel</span>
          </button>
          <button
            onClick={onExportPdf}
            className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-3 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors whitespace-nowrap"
          >
            <FileDown size={18} className="text-red-500" />
            <span className="hidden sm:inline">JSON</span>
          </button>
          <button
            onClick={onCreateClick}
            className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 shadow-lg shadow-zinc-200 transition-all whitespace-nowrap"
          >
            <Plus size={18} />
            Nuevo cliente
          </button>
        </>
      )}
    />
  );
}
