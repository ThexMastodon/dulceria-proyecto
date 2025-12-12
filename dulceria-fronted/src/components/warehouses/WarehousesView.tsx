"use client";

import React, { useState, useMemo } from 'react';
import { Warehouse } from '@/types/warehouse';
import { warehouseRepository } from '@/repositories/WarehouseRepository';
import { branchRepository } from '@/repositories/BranchRepository';
import { useWarehouses } from '@/hooks/useWarehouses';
import { useBranches } from '@/hooks/useBranches';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { WarehousesToolbar } from './WarehousesToolbar';
import { WarehousesTable } from './WarehousesTable';
import { WarehouseFormModal } from './WarehouseFormModal';
import { DeleteWarehouseModal } from './DeleteWarehouseModal';
import { Pagination } from '../shared/Pagination';

export function WarehousesView() {
  const { warehouses, createWarehouse, updateWarehouse, deleteWarehouse } = useWarehouses(warehouseRepository);
  const { branches } = useBranches(branchRepository);
  
  const [selectedBranch, setSelectedBranch] = useState('all');
  
  // Filter by branch if selected
  const branchFilteredWarehouses = useMemo(() => {
    if (selectedBranch === 'all') return warehouses;
    return warehouses.filter(w => w.branchId === selectedBranch);
  }, [warehouses, selectedBranch]);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Warehouse>({
    items: branchFilteredWarehouses,
    searchFields: ['name', 'code', 'type', 'manager', 'branchName'],
  });

  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({ items: filteredItems, itemsPerPage: 10 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [formData, setFormData] = useState<Partial<Warehouse>>({
    name: '',
    code: '',
    branchId: '',
    type: 'Principal',
    capacity: 0,
    currentStock: 0,
    manager: '',
    description: '',
    active: true,
  });

  const handleOpenCreate = () => {
    setCurrentWarehouse(null);
    setFormData({
      name: '',
      code: '',
      branchId: '',
      type: 'Principal',
      capacity: 0,
      currentStock: 0,
      manager: '',
      description: '',
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (warehouse: Warehouse) => {
    setCurrentWarehouse(warehouse);
    setFormData(warehouse);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (warehouse: Warehouse) => {
    setCurrentWarehouse(warehouse);
    setIsDeleteModalOpen(true);
  };

  const handleSaveWarehouse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentWarehouse) {
        await updateWarehouse(currentWarehouse.id, formData);
      } else {
        await createWarehouse(formData as Omit<Warehouse, 'id'>);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving warehouse:', error);
    }
  };

  const confirmDelete = async () => {
    if (currentWarehouse) {
      try {
        await deleteWarehouse(currentWarehouse.id);
        setIsDeleteModalOpen(false);
        setCurrentWarehouse(null);
      } catch (error) {
        console.error('Error deleting warehouse:', error);
      }
    }
  };

  const exportCSV = (rows: Warehouse[]) => {
    const headers = ['id','name','code','branchId','branchName','type','capacity','currentStock','manager','active'];
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
      const vals = [
        r.id,
        r.name,
        r.code,
        r.branchId ?? '',
        r.branchName ?? '',
        r.type ?? '',
        r.capacity ?? 0,
        r.currentStock ?? 0,
        r.manager ?? '',
        r.active ? 'true' : 'false'
      ].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `almacenes_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: Warehouse[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `almacenes_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Almacenes</h1>
          <p className="text-zinc-500 mt-1">
            Gestiona los almacenes de tus sucursales
          </p>
        </div>
      </div>

      <WarehousesToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchFilterChange={setSelectedBranch}
        onExportExcel={() => exportCSV(filteredItems)}
        onExportPdf={() => exportJSON(filteredItems)}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <WarehousesTable
            warehouses={paginatedItems}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteClick}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
          displayedItems={paginatedItems.length}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
        />
      </div>

      <WarehouseFormModal
        isOpen={isModalOpen}
        warehouse={currentWarehouse}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWarehouse}
        onChange={setFormData}
        branches={branches}
      />

      <DeleteWarehouseModal
        isOpen={isDeleteModalOpen}
        warehouse={currentWarehouse}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
