"use client";

import React from 'react';
import { Permission } from '@/interfaces/IPermissionRepository';
import { Shield, Eye, Plus, Edit, Trash, Settings } from 'lucide-react';

interface PermissionsTableProps {
  permissions: Permission[];
}

const actionIcons: Record<string, { icon: React.ComponentType<any>; color: string; label: string }> = {
  view: { icon: Eye, color: 'text-blue-500', label: 'Ver' },
  create: { icon: Plus, color: 'text-green-500', label: 'Crear' },
  edit: { icon: Edit, color: 'text-amber-500', label: 'Editar' },
  delete: { icon: Trash, color: 'text-red-500', label: 'Eliminar' },
  manage: { icon: Settings, color: 'text-purple-500', label: 'Gestionar' },
};

export function PermissionsTable({ permissions }: PermissionsTableProps) {
  const getActionInfo = (action: string) => {
    return actionIcons[action] || { icon: Shield, color: 'text-zinc-500', label: action };
  };

  if (permissions.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="mx-auto text-zinc-300 mb-3" size={48} />
        <p className="text-zinc-500">No se encontraron permisos</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Permiso
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Módulo
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Sub-Módulo
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {permissions.map((permission) => {
            const actionInfo = getActionInfo(permission.action);
            const ActionIcon = actionInfo.icon;

            return (
              <tr
                key={permission.id}
                className="hover:bg-zinc-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center flex-shrink-0">
                      <Shield className="text-pink-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">{permission.name}</p>
                      <p className="text-xs text-zinc-500">{permission.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-zinc-600">{permission.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {permission.moduleId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {permission.subModuleId ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                      {permission.subModuleId}
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ActionIcon className={actionInfo.color} size={16} />
                    <span className="text-sm text-zinc-700">{actionInfo.label}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
