"use client";

import React, { useState } from 'react';
import { Role } from '@/interfaces/IRoleRepository';
import { roleRepository } from '@/repositories/RoleRepository';
import { useRoles } from '@/hooks/useRoles';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { RolesToolbar } from './RolesToolbar';
import { RolesTable } from './RolesTable';
import { RoleFormModal } from './RoleFormModal';
import { DeleteRoleModal } from './DeleteRoleModal';
import { Pagination } from '../shared/Pagination';

export function RolesView() {
  const { roles, createRole, updateRole, deleteRole } = useRoles(roleRepository);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Role>({
    items: roles,
    searchFields: ['name', 'description'],
  });
  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({ items: filteredItems, itemsPerPage: 5 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<Partial<Role>>({
    name: '',
    description: '',
    active: true,
  });

  const handleOpenCreate = () => {
    setCurrentRole(null);
    setFormData({ name: '', description: '', active: true, permissions: [] });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (role: Role) => {
    setCurrentRole(role);
    setFormData(role);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (role: Role) => {
    setCurrentRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentRole) {
        await updateRole(currentRole.id, formData);
      } else {
        await createRole(formData as Omit<Role, 'id' | 'usersCount'>);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const confirmDelete = async () => {
    if (currentRole) {
      try {
        await deleteRole(currentRole.id);
        setIsDeleteModalOpen(false);
        setCurrentRole(null);
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Roles</h1>
          <p className="text-zinc-500 mt-1">
            Gestiona los roles y permisos del sistema
          </p>
        </div>
      </div>

      <RolesToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <RolesTable
            roles={paginatedItems}
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

      <RoleFormModal
        isOpen={isModalOpen}
        role={currentRole}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        onChange={setFormData}
      />

      <DeleteRoleModal
        isOpen={isDeleteModalOpen}
        role={currentRole}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
