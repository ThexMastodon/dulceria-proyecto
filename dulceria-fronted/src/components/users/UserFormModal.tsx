"use client";

import React from 'react';
import { X } from 'lucide-react';
import { User } from '@/types';

interface UserFormModalProps {
  isOpen: boolean;
  user: User | null;
  formData: Partial<User>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<User>) => void;
}

export function UserFormModal({ isOpen, user, formData, onClose, onSave, onChange }: UserFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <h3 className="text-lg font-bold text-zinc-900">
            {user ? 'Editar usuario' : 'Crear nuevo usuario'}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Nombre</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={e => onChange({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Apellido paterno</label>
              <input
                type="text"
                required
                value={formData.lastName || ''}
                onChange={e => onChange({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Apellido materno</label>
              <input
                type="text"
                value={formData.secondLastName || ''}
                onChange={e => onChange({ ...formData, secondLastName: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Correo Electrónico</label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={e => onChange({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Rol</label>
              <select
                value={formData.role || ''}
                onChange={e => onChange({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              >
                <option>Administrador</option>
                <option>Gerente</option>
                <option>Vendedor</option>
                <option>Almacenista</option>
                <option>Repartidor</option>
              </select>
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
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-zinc-100 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium shadow-lg shadow-pink-200 transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
