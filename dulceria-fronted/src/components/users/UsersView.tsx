"use client";

import React, { useState } from 'react';
import { User } from '@/types';
import { userRepository } from '@/repositories/UserRepository';
import { useUsers } from '@/hooks/useUsers';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { UsersToolbar } from './UsersToolbar';
import { UsersTable } from './UsersTable';
import { UserFormModal } from './UserFormModal';
import { DeleteUserModal } from './DeleteUserModal';
import { Pagination } from '../shared/Pagination';

export function UsersView() {
  const { users, createUser, updateUser, deleteUser } = useUsers(userRepository);
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<User>({
    items: users,
    searchFields: ['name', 'email', 'role'],
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    lastName: '',
    secondLastName: '',
    email: '',
    role: '',
    active: true,
  });

  const handleOpenCreate = () => {
    setCurrentUser(null);
    setFormData({ name: '', lastName: '', secondLastName: '', email: '', role: '', active: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setCurrentUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentUser) {
        await updateUser(currentUser.id, formData);
      } else {
        await createUser(formData as Omit<User, 'id'>);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const confirmDelete = async () => {
    if (currentUser) {
      try {
        await deleteUser(currentUser.id);
        setIsDeleteModalOpen(false);
        setCurrentUser(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      <UsersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <UsersTable
          users={paginatedItems}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteClick}
        />

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

      <UserFormModal
        isOpen={isModalOpen}
        user={currentUser}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        onChange={setFormData}
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        user={currentUser}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
