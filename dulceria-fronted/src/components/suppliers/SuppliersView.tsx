"use client";

import React, { useState } from 'react';
import { Supplier } from '@/types/supplier';
import { supplierRepository } from '@/repositories/SupplierRepository';
import { useSuppliers } from '@/hooks/useSuppliers';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { SuppliersToolbar } from './SuppliersToolbar';
import { SuppliersTable } from './SuppliersTable';
import { SupplierFormModal } from './SupplierFormModal';
import { DeleteSupplierModal } from './DeleteSupplierModal';
import { Pagination } from '../shared/Pagination';

export function SuppliersView() {
  const { suppliers, createSupplier, updateSupplier, deleteSupplier } = useSuppliers(supplierRepository);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Supplier>({
    items: suppliers,
    searchFields: ['name', 'contactName', 'email', 'city', 'rfc'],
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
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    rfc: '',
    logo: '',
    active: true,
  });

  const handleOpenCreate = () => {
    setCurrentSupplier(null);
    setFormData({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      rfc: '',
      logo: '',
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setFormData(supplier);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const handleSaveSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentSupplier) {
        await updateSupplier(currentSupplier.id, formData);
      } else {
        await createSupplier(formData as Omit<Supplier, 'id'>);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  const confirmDelete = async () => {
    if (currentSupplier) {
      try {
        await deleteSupplier(currentSupplier.id);
        setIsDeleteModalOpen(false);
        setCurrentSupplier(null);
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
  };

  const exportCSV = (rows: Supplier[]) => {
    const headers = ['id','name','contactName','email','phone','address','city','state','rfc','active'];
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
        r.contactName ?? '',
        r.email ?? '',
        r.phone ?? '',
        r.address ?? '',
        r.city ?? '',
        r.state ?? '',
        r.rfc ?? '',
        r.active ? 'true' : 'false'
      ].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proveedores_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: Supplier[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proveedores_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Proveedores</h1>
          <p className="text-zinc-500 mt-1">
            Gestiona los proveedores de tu negocio
          </p>
        </div>
      </div>

      <SuppliersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        onExportExcel={() => exportCSV(filteredItems)}
        onExportPdf={() => exportJSON(filteredItems)}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <SuppliersTable
            suppliers={paginatedItems}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteClick}
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

      <SupplierFormModal
        isOpen={isModalOpen}
        supplier={currentSupplier}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSupplier}
        onChange={setFormData}
      />

      <DeleteSupplierModal
        isOpen={isDeleteModalOpen}
        supplier={currentSupplier}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
