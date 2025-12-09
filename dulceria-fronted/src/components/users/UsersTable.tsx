"use client";

import React from 'react';
import { Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { User } from '@/types';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-zinc-400">
        No se encontraron usuarios
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50/80 border-b border-zinc-100">
          <tr>
            <th className="px-6 py-4 font-semibold text-zinc-500">Nombre completo</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Email</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Rol</th>
            <th className="px-6 py-4 font-semibold text-zinc-500 text-center">Estado</th>
            <th className="px-6 py-4 font-semibold text-zinc-500 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900">
                    {user.name} {user.lastName}
                  </span>
                  {user.secondLastName && (
                    <span className="text-xs text-zinc-400">{user.secondLastName}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-zinc-600">{user.email}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {user.active ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    <CheckCircle size={12} /> Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-500">
                    <XCircle size={12} /> Inactivo
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
