"use client";

import React, { useState } from 'react';
import { Branch } from '@/types/branch';
import { branchRepository } from '@/repositories/BranchRepository';
import { useBranches } from '@/hooks/useBranches';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { BranchesToolbar } from './BranchesToolbar';
import { BranchesTable } from './BranchesTable';
import { BranchFormModal } from './BranchFormModal';
import { DeleteBranchModal } from './DeleteBranchModal';
import { Pagination } from '../shared/Pagination';

export function BranchesView() {
  const { branches, createBranch, updateBranch, deleteBranch } = useBranches(branchRepository);
  
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Branch>({
    items: branches,
    searchFields: ['name', 'code', 'city', 'manager'],
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
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState<Partial<Branch>>({
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    manager: '',
    openingTime: '',
    closingTime: '',
    active: true,
  });

  const handleOpenCreate = () => {
    setCurrentBranch(null);
    setFormData({
      name: '',
      code: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      email: '',
      manager: '',
      openingTime: '',
      closingTime: '',
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (branch: Branch) => {
    setCurrentBranch(branch);
    setFormData(branch);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (branch: Branch) => {
    setCurrentBranch(branch);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentBranch) {
      await updateBranch(currentBranch.id, formData as Branch);
    } else {
      await createBranch(formData as Branch);
    }
    
    setIsModalOpen(false);
    setCurrentBranch(null);
  };

  const handleDelete = async () => {
    if (currentBranch) {
      await deleteBranch(currentBranch.id);
      setIsDeleteModalOpen(false);
      setCurrentBranch(null);
    }
  };

  const exportCSV = (rows: Branch[]) => {
    const headers = ['id','name','code','city','state','manager','phone','email','active'];
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
        r.code ?? '',
        r.city ?? '',
        r.state ?? '',
        r.manager ?? '',
        r.phone ?? '',
        r.email ?? '',
        r.active ? 'true' : 'false'
      ].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sucursales_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: Branch[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sucursales_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Sucursales</h1>
          <p className="text-zinc-500 mt-1">
            Gestiona las sucursales de tu negocio
          </p>
        </div>
      </div>

      <BranchesToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        onExportExcel={() => exportCSV(filteredItems)}
        onExportPdf={() => exportJSON(filteredItems)}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <BranchesTable
            branches={paginatedItems}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
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

      <BranchFormModal
        isOpen={isModalOpen}
        branch={currentBranch}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onChange={setFormData}
      />

      <DeleteBranchModal
        isOpen={isDeleteModalOpen}
        branch={currentBranch}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
