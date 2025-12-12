"use client";

import React, { useState, useMemo } from 'react';
import { Permission } from '@/interfaces/IPermissionRepository';
import { permissionRepository } from '@/repositories/PermissionRepository';
import { usePermissions } from '@/hooks/usePermissions';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { PermissionsToolbar } from './PermissionsToolbar';
import { PermissionsTable } from './PermissionsTable';
import { Pagination } from '../shared/Pagination';

export function PermissionsView() {
  const { allPermissions, modules, loading } = usePermissions(permissionRepository);
  const [selectedModule, setSelectedModule] = useState('all');
  
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Permission>({
    items: allPermissions,
    searchFields: ['name', 'description', 'action'],
  });

  const filteredByModule = useMemo(() => {
    if (selectedModule === 'all') return filteredItems;
    return filteredItems.filter(p => p.moduleId === selectedModule);
  }, [filteredItems, selectedModule]);

  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({ items: filteredByModule, itemsPerPage: 10 });

  const modulesForFilter = modules.map(m => ({ id: m.id, name: m.name }));

  const exportCSV = (rows: Permission[]) => {
    const headers = ['id','name','description','moduleId','action'];
    const escape = (v: unknown) => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      if (s.includes('"') || s.includes(',') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const lines = [headers.join(',')];
    for (const r of rows) {
      const vals = [r.id, r.name, r.description ?? '', r.moduleId ?? '', r.action ?? ''].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `permisos_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: Permission[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `permisos_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Permisos</h1>
          <p className="text-zinc-500 mt-1">
            Visualiza los permisos disponibles del sistema
          </p>
        </div>
      </div>

      <PermissionsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedModule={selectedModule}
        onModuleChange={setSelectedModule}
        modules={modulesForFilter}
        onExportExcel={() => exportCSV(filteredByModule)}
        onExportPdf={() => exportJSON(filteredByModule)}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <PermissionsTable permissions={paginatedItems} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          totalItems={filteredByModule.length}
          displayedItems={paginatedItems.length}
        />
      </div>
    </div>
  );
}
