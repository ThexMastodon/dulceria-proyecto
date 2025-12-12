"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Users, Upload, Image as ImageIcon } from 'lucide-react';
import { User } from '@/types';
import { cn } from '@/lib/utils';

interface UserFormModalProps {
  isOpen: boolean;
  user: User | null;
  formData: Partial<User>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<User>) => void;
}

export function UserFormModal({ isOpen, user, formData, onClose, onSave, onChange }: UserFormModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) {
      setPreviewImage(null);
    }
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        onChange({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const currentImage = previewImage || formData.image;

  if (!isOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name?.trim()) e.name = 'Este campo es requerido';
    if (!formData.lastName?.trim()) e.lastName = 'Este campo es requerido';
    if (!formData.email?.trim()) e.email = 'Este campo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email inválido';
    if (!formData.role?.trim()) e.role = 'Este campo es requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <Users className="text-blue-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              {user ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-3">
              Foto de Perfil
            </label>
            <div
              onClick={handleImageClick}
              className="relative w-full h-48 rounded-xl border-2 border-dashed border-zinc-300 hover:border-pink-400 transition-colors cursor-pointer group overflow-hidden"
            >
              {currentImage ? (
                <>
                  <img
                    src={currentImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white">
                      <Upload className="mx-auto mb-2" size={32} />
                      <p className="text-sm font-medium">Cambiar imagen</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 group-hover:text-pink-500 transition-colors">
                  <ImageIcon size={48} />
                  <p className="text-sm font-medium mt-3">Haz clic para subir la foto de perfil</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Formatos: JPG, PNG, GIF. Tamaño máximo: 2MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-xs text-zinc-500 mt-2">
              Haz clic en el área para subir la foto de perfil. Formatos: JPG, PNG, GIF. Tamaño máximo: 2MB
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">Nombre</label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={e => { onChange({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.name ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                placeholder="Nombre del usuario"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">Apellido paterno</label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                required
                value={formData.lastName || ''}
                onChange={e => { onChange({ ...formData, lastName: e.target.value }); if (errors.lastName) setErrors({ ...errors, lastName: '' }); }}
                className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.lastName ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                placeholder="Apellido paterno"
              />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Apellido materno</label>
              <input
                type="text"
                value={formData.secondLastName || ''}
                onChange={e => onChange({ ...formData, secondLastName: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
                placeholder="Apellido materno"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">Correo Electrónico</label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={e => { onChange({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }}
                className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.email ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">Rol</label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <select
                value={formData.role || ''}
                onChange={e => { onChange({ ...formData, role: e.target.value }); if (errors.role) setErrors({ ...errors, role: '' }); }}
                className={cn('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all', errors.role ? 'border-red-300 bg-red-50' : 'border-zinc-200')}
              >
                <option value="">Seleccionar rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Gerente">Gerente</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Almacenista">Almacenista</option>
                <option value="Repartidor">Repartidor</option>
              </select>
              {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
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

          <div className="pt-4 flex gap-3 border-t border-zinc-100 mt-4">
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
              {user ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
