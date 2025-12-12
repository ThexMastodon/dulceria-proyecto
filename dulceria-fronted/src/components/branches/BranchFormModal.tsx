"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Branch } from '@/types/branch';
import { X, Building2, Clock, Upload, Image as ImageIcon } from 'lucide-react';

interface BranchFormModalProps {
  isOpen: boolean;
  branch: Branch | null;
  formData: Partial<Branch>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onChange: (data: Partial<Branch>) => void;
}

const TimeSelector = ({ 
  value, 
  onChange, 
  required 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  required?: boolean;
}) => {
  const parseTime = (timeStr: string) => {
    if (!timeStr) return { hour: '09', minute: '00', period: 'AM' };
    const [hours, minutes] = timeStr.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    return {
      hour: hour12.toString().padStart(2, '0'),
      minute: minutes || '00',
      period
    };
  };

  const formatTime24 = (hour: string, minute: string, period: string) => {
    let hour24 = parseInt(hour);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    return `${hour24.toString().padStart(2, '0')}:${minute}`;
  };

  const { hour, minute, period } = parseTime(value);

  const handleChange = (newHour?: string, newMinute?: string, newPeriod?: string) => {
    const h = newHour || hour;
    const m = newMinute || minute;
    const p = newPeriod || period;
    onChange(formatTime24(h, m, p));
  };

  return (
    <div className="flex gap-2">
      <select
        required={required}
        value={hour}
        onChange={(e) => handleChange(e.target.value, undefined, undefined)}
        className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all text-center font-medium"
      >
        {Array.from({ length: 12 }, (_, i) => {
          const h = (i + 1).toString().padStart(2, '0');
          return <option key={h} value={h}>{h}</option>;
        })}
      </select>
      <span className="flex items-center text-zinc-400 font-bold">:</span>
      <select
        required={required}
        value={minute}
        onChange={(e) => handleChange(undefined, e.target.value, undefined)}
        className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all text-center font-medium"
      >
        {Array.from({ length: 60 }, (_, i) => {
          const m = i.toString().padStart(2, '0');
          return <option key={m} value={m}>{m}</option>;
        })}
      </select>
      <select
        required={required}
        value={period}
        onChange={(e) => handleChange(undefined, undefined, e.target.value)}
        className="px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all text-center font-medium"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export function BranchFormModal({
  isOpen,
  branch,
  formData,
  onClose,
  onSave,
  onChange,
}: BranchFormModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Este campo es requerido';
    if (!formData.code?.trim()) newErrors.code = 'Este campo es requerido';
    if (!formData.address?.trim()) newErrors.address = 'Este campo es requerido';
    if (!formData.city?.trim()) newErrors.city = 'Este campo es requerido';
    if (!formData.state?.trim()) newErrors.state = 'Este campo es requerido';
    if (!formData.phone?.trim()) newErrors.phone = 'Este campo es requerido';
    if (!formData.email?.trim()) {
      newErrors.email = 'Este campo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.manager?.trim()) newErrors.manager = 'Este campo es requerido';
    if (!formData.openingTime?.trim()) newErrors.openingTime = 'Este campo es requerido';
    if (!formData.closingTime?.trim()) newErrors.closingTime = 'Este campo es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(e);
      setErrors({});
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
              <Building2 className="text-pink-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              {branch ? 'Editar Sucursal' : 'Nueva Sucursal'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-3">
              Imagen de la Fachada
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
                  <p className="text-sm font-medium mt-3">Haz clic para subir la imagen de la fachada</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB
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
              Haz clic en el área para subir la imagen de la fachada. Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Nombre
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => {
                  onChange({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-zinc-300'
                }`}
                placeholder="Nombre de la sucursal"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Código
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                value={formData.code || ''}
                onChange={(e) => {
                  onChange({ ...formData, code: e.target.value.toUpperCase() });
                  if (errors.code) setErrors({ ...errors, code: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all font-mono ${
                  errors.code ? 'border-red-300 bg-red-50' : 'border-zinc-300'
                }`}
                placeholder="SUC-001"
              />
              {errors.code && <p className="text-xs text-red-600 mt-1">{errors.code}</p>}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">
                Dirección
              </label>
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
            </div>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => {
                onChange({ ...formData, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all ${
                errors.address ? 'border-red-300 bg-red-50' : 'border-zinc-300'
              }`}
              placeholder="Av. Principal #123"
            />
            {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Ciudad
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => {
                  onChange({ ...formData, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all ${
                  errors.city ? 'border-red-300 bg-red-50' : 'border-zinc-300'
                }`}
                placeholder="Ciudad"
              />
              {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Estado
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="text"
                value={formData.state || ''}
                onChange={(e) => {
                  onChange({ ...formData, state: e.target.value });
                  if (errors.state) setErrors({ ...errors, state: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all ${
                  errors.state ? 'border-red-300 bg-red-50' : 'border-zinc-300'
                }`}
                placeholder="Estado"
              />
              {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Teléfono
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => {
                  onChange({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-zinc-300'
                }`}
                placeholder="Teléfono"
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Email
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => {
                  onChange({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-zinc-300'
                }`}
                placeholder="Email"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">
                Gerente
              </label>
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
            </div>
            <input
              type="text"
              value={formData.manager || ''}
              onChange={(e) => {
                onChange({ ...formData, manager: e.target.value });
                if (errors.manager) setErrors({ ...errors, manager: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all ${
                errors.manager ? 'border-red-300 bg-red-50' : 'border-zinc-300'
              }`}
              placeholder="Nombre del gerente"
            />
            {errors.manager && <p className="text-xs text-red-600 mt-1">{errors.manager}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Hora de Apertura
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none z-10" size={18} />
                <div className="pl-10">
                  <TimeSelector 
                    value={formData.openingTime || ''} 
                    onChange={(time) => {
                      onChange({ ...formData, openingTime: time });
                      if (errors.openingTime) setErrors({ ...errors, openingTime: '' });
                    }}
                    required
                  />
                </div>
              </div>
              {errors.openingTime && <p className="text-xs text-red-600 mt-1">{errors.openingTime}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  Hora de Cierre
                </label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none z-10" size={18} />
                <div className="pl-10">
                  <TimeSelector 
                    value={formData.closingTime || ''} 
                    onChange={(time) => {
                      onChange({ ...formData, closingTime: time });
                      if (errors.closingTime) setErrors({ ...errors, closingTime: '' });
                    }}
                    required
                  />
                </div>
              </div>
              {errors.closingTime && <p className="text-xs text-red-600 mt-1">{errors.closingTime}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active ?? true}
                onChange={(e) => onChange({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-pink-600 border-zinc-300 rounded focus:ring-pink-500"
              />
              <span className="text-sm font-medium text-zinc-700">Sucursal Activa</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium shadow-lg shadow-zinc-200"
            >
              {branch ? 'Guardar Cambios' : 'Crear Sucursal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
