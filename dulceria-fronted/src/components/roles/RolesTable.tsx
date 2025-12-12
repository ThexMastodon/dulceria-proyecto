"use client";

import React from 'react';
import { Pencil, Trash2, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Role } from '@/interfaces/IRoleRepository';

interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RolesTable({ roles, onEdit, onDelete }: RolesTableProps) {
  if (roles.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-zinc-400">
        No se encontraron roles
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50/80 border-b border-zinc-100">
          <tr>
            <th className="px-6 py-4 font-semibold text-zinc-500">Nombre del Rol</th>
            <th className="px-6 py-4 font-semibold text-zinc-500">Descripción</th>
            <th className="px-6 py-4 font-semibold text-zinc-500 text-center">Usuarios asignados</th>
            <th className="px-6 py-4 font-semibold text-zinc-500 text-center">Estado</th>
            <th className="px-6 py-4 font-semibold text-zinc-500 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-zinc-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                    <Shield size={16} />
                  </div>
                  <span className="font-medium text-zinc-900">{role.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-zinc-600 max-w-xs truncate" title={role.description}>
                {role.description}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600">
                  {role.usersCount} usuarios
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {role.active ? (
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
                    onClick={() => onEdit(role)}
                    className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(role)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
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
