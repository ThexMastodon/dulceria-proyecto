"use client";

import React from 'react';
import { Branch } from '@/types/branch';
import { Pencil, Trash2, Building2, MapPin, Clock, User, Phone } from 'lucide-react';

interface BranchesTableProps {
  branches: Branch[];
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
}

export function BranchesTable({ branches, onEdit, onDelete }: BranchesTableProps) {
  if (branches.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="mx-auto text-zinc-300 mb-3" size={48} />
        <p className="text-zinc-500">No se encontraron sucursales</p>
      </div>
    );
  }

  const formatTime = (time: string) => {
    if (!time) return '-';
    return time;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Sucursal
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Ubicación
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Gerente
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Almacenes
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Horario
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {branches.map((branch) => (
            <tr
              key={branch.id}
              className="hover:bg-zinc-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {branch.image ? (
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-zinc-200"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center flex-shrink-0">
                      <Building2 className="text-pink-600" size={20} />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-zinc-900">{branch.name}</p>
                    <p className="text-xs text-zinc-500">{branch.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 text-xs font-mono font-medium">
                  {branch.code}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-start gap-2">
                  <MapPin className="text-zinc-400 mt-0.5 flex-shrink-0" size={14} />
                  <div>
                    <p className="text-sm text-zinc-900">{branch.city}</p>
                    <p className="text-xs text-zinc-500">{branch.state}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <User className="text-zinc-400 flex-shrink-0" size={14} />
                  <span className="text-sm text-zinc-700">{branch.manager}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold">
                  {branch.warehouseCount || 0}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Phone className="text-zinc-400 flex-shrink-0" size={14} />
                  <span className="text-sm text-zinc-700">{branch.phone}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Clock className="text-zinc-400 flex-shrink-0" size={14} />
                  <span className="text-sm text-zinc-700">
                    {formatTime(branch.openingTime)} - {formatTime(branch.closingTime)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    branch.active
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {branch.active ? 'Activa' : 'Inactiva'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(branch)}
                    className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(branch)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
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
