"use client";

import React, { useMemo, useState } from 'react';
import { Movement, MovementType } from '@/types/movement';
import { movementRepository } from '@/repositories/MovementRepository';
import { useMovements } from '@/hooks/useMovements';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { MovementsToolbar } from './MovementsToolbar';
import { MovementsTable } from './MovementsTable';
import { MovementFormModal } from './MovementFormModal';
import { DeleteMovementModal } from './DeleteMovementModal';
import { Pagination } from '@/components/shared/Pagination';

export function MovementsView() {
  const { movements, loading, error, createMovement, updateMovement, deleteMovement } = useMovements(movementRepository);
  const [selectedType, setSelectedType] = useState<string>('all');

  const typeFiltered = useMemo(() => {
    if (selectedType === 'all') return movements;
    return movements.filter(m => m.type === selectedType);
  }, [movements, selectedType]);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Movement>({
    items: typeFiltered,
    searchFields: ['productName','warehouseName','reference','notes','type']
  });

  const { paginatedItems, currentPage, totalPages, goToNextPage, goToPreviousPage, hasNextPage, hasPreviousPage } = usePagination({ items: filteredItems, itemsPerPage: 10 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentMovement, setCurrentMovement] = useState<Movement | null>(null);
  const [formData, setFormData] = useState<Partial<Movement>>({
    date: new Date().toISOString().slice(0,16),
    type: 'Entrada' as MovementType,
    productId: '',
    productName: '',
    warehouseId: '',
    warehouseName: '',
    quantity: 0,
    unit: 'pza',
    reference: '',
    notes: ''
  });

  const handleOpenCreate = () => {
    setCurrentMovement(null);
    setFormData({
      date: new Date().toISOString().slice(0,16),
      type: 'Entrada',
      productId: '', productName: '', warehouseId: '', warehouseName: '', quantity: 0, unit: 'pza', reference: '', notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: Movement) => { setCurrentMovement(m); setFormData(m); setIsModalOpen(true); };
  const handleOpenDelete = (m: Movement) => { setCurrentMovement(m); setIsDeleteOpen(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMovement) {
      await updateMovement(currentMovement.id, formData);
    } else {
      await createMovement(formData as Omit<Movement,'id'>);
    }
    setIsModalOpen(false);
    setCurrentMovement(null);
  };

  const confirmDelete = async () => {
    if (currentMovement) {
      await deleteMovement(currentMovement.id);
      setIsDeleteOpen(false);
      setCurrentMovement(null);
    }
  };

  const exportCSV = (rows: Movement[]) => {
    const headers = ['id','date','type','productName','warehouseName','quantity','unit','reference','notes'];
    const escape = (v: unknown) => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      if (s.includes('"') || s.includes(',') || s.includes('\n')) { return '"' + s.replace(/"/g, '""') + '"'; }
      return s;
    };
    const lines = [headers.join(',')];
    for (const r of rows) {
      const vals = [r.id, r.date, r.type, r.productName, r.warehouseName, r.quantity, r.unit, r.reference ?? '', r.notes ?? ''].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `movimientos_${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: Movement[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `movimientos_${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Movimientos E/S</h1>
          <p className="text-zinc-500 mt-1">Entradas y salidas de inventario</p>
        </div>
      </div>

      <MovementsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onExportExcel={() => exportCSV(filteredItems)}
        onExportPdf={() => exportJSON(filteredItems)}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <MovementsTable movements={paginatedItems} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
          displayedItems={paginatedItems.length}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>

      <MovementFormModal isOpen={isModalOpen} movement={currentMovement} formData={formData} onClose={() => setIsModalOpen(false)} onSave={handleSave} onChange={setFormData} />
      <DeleteMovementModal isOpen={isDeleteOpen} movement={currentMovement} onClose={() => setIsDeleteOpen(false)} onConfirm={confirmDelete} />
    </div>
  );
}
