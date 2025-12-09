"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Role } from '@/interfaces/IRoleRepository';

interface DeleteRoleModalProps {
  isOpen: boolean;
  role: Role | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteRoleModal({ isOpen, role, onClose, onConfirm }: DeleteRoleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={32} />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 mb-2">¿Eliminar rol?</h3>
        <p className="text-zinc-500 mb-6">
          Estás a punto de eliminar el rol <span className="font-bold text-zinc-800">{role?.name}</span>.
          <br /><span className="text-xs text-red-500">Nota: Asegúrate de que no haya usuarios asignados a este rol antes de eliminarlo.</span>
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-lg shadow-red-200 transition-colors"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
