"use client";

import React, { useEffect, useState } from 'react';
import { X, Shield } from 'lucide-react';
import { Role } from '@/interfaces/IRoleRepository';
import { usePermissions } from '@/hooks/usePermissions';
import { permissionRepository } from '@/repositories/PermissionRepository';
import { cn } from '@/lib/utils';

interface RoleFormModalProps {
  isOpen: boolean;
  role: Role | null;
  formData: Partial<Role>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<Role>) => void;
}

export function RoleFormModal({ isOpen, role, formData, onClose, onSave, onChange }: RoleFormModalProps) {
  const { modules, loading } = usePermissions(permissionRepository);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Ensure permissions array exists
    if (formData && !formData.permissions) {
      onChange({ ...formData, permissions: [] });
    }
  }, [formData]);

  if (!isOpen) return null;

  const handlePermissionToggle = (permissionId: string) => {
    const currentPermissions = formData.permissions || [];
    const newPermissions = currentPermissions.includes(permissionId)
      ? currentPermissions.filter(id => id !== permissionId)
      : [...currentPermissions, permissionId];
    
    onChange({ ...formData, permissions: newPermissions });
  };

  const handleModuleToggle = (moduleId: string, modulePermissions: string[]) => {
    const currentPermissions = formData.permissions || [];
    const allSelected = modulePermissions.every(permId => currentPermissions.includes(permId));
    
    if (allSelected) {
      // Deselect all permissions from this module
      const newPermissions = currentPermissions.filter(id => !modulePermissions.includes(id));
      onChange({ ...formData, permissions: newPermissions });
    } else {
      // Select all permissions from this module
      const newPermissions = [...new Set([...currentPermissions, ...modulePermissions])];
      onChange({ ...formData, permissions: newPermissions });
    }
  };

  const isPermissionChecked = (permissionId: string) => {
    return (formData.permissions || []).includes(permissionId);
  };

  const isModuleChecked = (modulePermissions: string[]) => {
    const currentPermissions = formData.permissions || [];
    return modulePermissions.length > 0 && modulePermissions.every(permId => currentPermissions.includes(permId));
  };

  const isModuleIndeterminate = (modulePermissions: string[]) => {
    const currentPermissions = formData.permissions || [];
    const checkedCount = modulePermissions.filter(permId => currentPermissions.includes(permId)).length;
    return checkedCount > 0 && checkedCount < modulePermissions.length;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name?.trim()) e.name = 'Este campo es requerido';
    if (!formData.description?.trim()) e.description = 'Este campo es requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
              <Shield className="text-purple-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              {role ? 'Editar Rol' : 'Nuevo Rol'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Nombre del rol</label>
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
            </div>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={e => { onChange({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
              className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.name ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
              placeholder="ej. Supervisor de Ventas"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Descripción</label>
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
            </div>
            <textarea
              required
              rows={3}
              value={formData.description || ''}
              onChange={e => { onChange({ ...formData, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: '' }); }}
              className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all resize-none', errors.description ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
              placeholder="Describe las responsabilidades de este rol..."
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase">Estado</label>
            <div className="flex items-center gap-3 h-[42px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  checked={formData.active}
                  onChange={() => onChange({ ...formData, active: true })}
                  className="text-pink-600 focus:ring-pink-500"
                />
                <span className="text-sm">Activo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  checked={!formData.active}
                  onChange={() => onChange({ ...formData, active: false })}
                  className="text-pink-600 focus:ring-pink-500"
                />
                <span className="text-sm">Inactivo</span>
              </label>
            </div>
          </div>

          {/* Sección de Permisos por Módulos */}
          <div className="space-y-3 border-t border-zinc-100 pt-4">
            <label className="text-xs font-semibold text-zinc-500 uppercase">Permisos por módulo</label>
            
            {loading ? (
              <div className="text-center py-8 text-sm text-zinc-500">Cargando permisos...</div>
            ) : (
              <div className="max-h-96 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {modules.map(module => {
                  const modulePermissionIds = [
                    ...module.permissions.map(p => p.id),
                    ...(module.subModules?.flatMap(sm => sm.permissions.map(p => p.id)) || [])
                  ];

                  return (
                    <div key={module.id} className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id={`module-${module.id}`}
                          checked={isModuleChecked(modulePermissionIds)}
                          ref={el => {
                            if (el) el.indeterminate = isModuleIndeterminate(modulePermissionIds);
                          }}
                          onChange={() => handleModuleToggle(module.id, modulePermissionIds)}
                          className="rounded text-pink-600 focus:ring-pink-500"
                        />
                        <label htmlFor={`module-${module.id}`} className="font-semibold text-sm text-zinc-700 cursor-pointer">
                          {module.name}
                        </label>
                      </div>

                      {/* Permisos del módulo principal */}
                      {module.permissions.length > 0 && (
                        <div className="ml-6 grid grid-cols-2 gap-2 mb-2">
                          {module.permissions.map(permission => (
                            <label key={permission.id} className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isPermissionChecked(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="rounded text-pink-600 focus:ring-pink-500" 
                              />
                              {permission.name}
                            </label>
                          ))}
                        </div>
                      )}

                      {/* Submódulos */}
                      {module.subModules && module.subModules.length > 0 && (
                        <div className="ml-6 space-y-2">
                          {module.subModules.map(subModule => (
                            <div key={subModule.id}>
                              <div className="text-xs font-semibold text-zinc-500 uppercase mb-1.5 pt-1">{subModule.name}:</div>
                              <div className="grid grid-cols-2 gap-2 ml-2">
                                {subModule.permissions.map(permission => (
                                  <label key={permission.id} className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                                    <input 
                                      type="checkbox"
                                      checked={isPermissionChecked(permission.id)}
                                      onChange={() => handlePermissionToggle(permission.id)}
                                      className="rounded text-pink-600 focus:ring-pink-500" 
                                    />
                                    {permission.name}
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          </div>

          <div className="px-6 py-4 flex gap-3 border-t border-zinc-100 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium shadow-lg shadow-zinc-200"
            >
              {role ? 'Guardar Cambios' : 'Crear Rol'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
