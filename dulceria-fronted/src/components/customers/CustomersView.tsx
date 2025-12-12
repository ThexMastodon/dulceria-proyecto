"use client";

import React, { useState } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import { customerRepository } from "@/repositories/CustomerRepository";
import { Input } from "@/components/ui/input";
import { CustomersTable } from "./CustomersTable";
import { Pagination } from "@/components/shared/Pagination";
import { useSearch } from "@/hooks/useSearch";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CustomerFormModal } from "./CustomerFormModal";
import { DeleteCustomerModal } from "./DeleteCustomerModal";
import { RouteCustomer } from "@/types/routeOrder";
import { CustomersToolbar } from "./CustomersToolbar";

export function CustomersView() {
  const { customers, loading, error, createCustomer, updateCustomer, deleteCustomer } = useCustomers(customerRepository);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch({
    items: customers,
    searchFields: ["name", "businessName", "email", "phone", "address", "neighborhood", "city", "zipCode"],
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
  const [currentCustomer, setCurrentCustomer] = useState<RouteCustomer | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenCreate = () => {
    setCurrentCustomer(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer: RouteCustomer) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (customer: RouteCustomer) => {
    setCurrentCustomer(customer);
    setIsDeleteOpen(true);
  };

  const handleSave = async (data: Omit<RouteCustomer, 'id'>, id?: string) => {
    if (id) {
      await updateCustomer(id, data);
    } else {
      await createCustomer(data);
    }
    setIsModalOpen(false);
    setCurrentCustomer(null);
  };

  const exportCSV = (rows: RouteCustomer[]) => {
    const headers = [
      'id','name','phone','address','neighborhood','city','routeId','routeName','lat','lng'
    ];
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
        r.phone,
        r.address,
        r.neighborhood,
        r.city,
        r.routeId,
        r.routeName ?? '',
        r.lat ?? '',
        r.lng ?? ''
      ].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clientes_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: RouteCustomer[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clientes_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Clientes</h1>
          <p className="text-zinc-500 mt-1">Directorio de clientes de ruta</p>
        </div>
      </div>

      <CustomersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        onExportExcel={() => exportCSV(filteredItems)}
        onExportPdf={() => exportJSON(filteredItems)}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-sm text-zinc-500">Cargando clientes...</div>
        ) : error ? (
          <div className="py-12 text-center text-sm text-red-600">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <CustomersTable customers={paginatedItems} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
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
          </>
        )}
      </div>

      <CustomerFormModal
        isOpen={isModalOpen}
        customer={currentCustomer}
        onClose={() => { setIsModalOpen(false); setCurrentCustomer(null); }}
        onSave={handleSave}
      />

      <DeleteCustomerModal
        isOpen={isDeleteOpen}
        customer={currentCustomer}
        onClose={() => { setIsDeleteOpen(false); setCurrentCustomer(null); }}
        onConfirm={async () => {
          if (currentCustomer) {
            await deleteCustomer(currentCustomer.id);
            setIsDeleteOpen(false);
            setCurrentCustomer(null);
          }
        }}
      />
    </div>
  );
}
