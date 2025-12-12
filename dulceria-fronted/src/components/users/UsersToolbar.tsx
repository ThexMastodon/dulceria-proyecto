"use client";

import React from 'react';
import { Plus, FileDown, FileSpreadsheet } from 'lucide-react';
import { Toolbar } from '@/components/shared/Toolbar';
import { Button } from '@/components/ui/button';

interface UsersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export function UsersToolbar({ searchTerm, onSearchChange, onCreateClick }: UsersToolbarProps) {
  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar usuario..."
      actions={(
        <>
          <Button variant="outline" className="gap-2">
            <FileSpreadsheet size={18} className="text-emerald-600" />
            Excel
          </Button>
          <Button variant="outline" className="gap-2">
            <FileDown size={18} className="text-red-500" />
            PDF
          </Button>
          <Button onClick={onCreateClick} className="gap-2">
            <Plus size={18} />
            Nuevo usuario
          </Button>
        </>
      )}
    />
  );
}
