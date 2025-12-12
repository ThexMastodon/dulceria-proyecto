"use client";

import React, { useEffect, useRef, useState } from "react";
import { RouteCustomer } from "@/types/routeOrder";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, UserCircle, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerFormModalProps {
  isOpen: boolean;
  customer: RouteCustomer | null;
  onClose: () => void;
  onSave: (data: Omit<RouteCustomer, "id">, id?: string) => void | Promise<void>;
}

export function CustomerFormModal({ isOpen, customer, onClose, onSave }: CustomerFormModalProps) {
  const isEditing = !!customer;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Omit<RouteCustomer, "id">>({
    name: "",
    phone: "",
    businessName: "",
    email: "",
    address: "",
    neighborhood: "",
    city: "",
    zipCode: "",
    imageUrl: "",
    rfc: "",
    routeId: "route-1",
    routeName: "Ruta Norte - Zona 1",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name,
        phone: customer.phone,
        businessName: customer.businessName,
        email: customer.email,
        address: customer.address,
        neighborhood: customer.neighborhood,
        city: customer.city,
        zipCode: customer.zipCode,
        imageUrl: customer.imageUrl,
        rfc: customer.rfc,
        routeId: customer.routeId,
        routeName: customer.routeName,
        lat: customer.lat,
        lng: customer.lng,
      });
      setPreviewImage(customer.imageUrl || null);
    } else {
      setForm({
        name: "",
        phone: "",
        businessName: "",
        email: "",
        address: "",
        neighborhood: "",
        city: "",
        zipCode: "",
        imageUrl: "",
        rfc: "",
        routeId: "route-1",
        routeName: "Ruta Norte - Zona 1",
      });
      setPreviewImage(null);
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name?.trim()) newErrors.name = "Este campo es requerido";
    if (!form.phone?.trim()) newErrors.phone = "Este campo es requerido";
    if (!form.businessName?.trim()) newErrors.businessName = "Este campo es requerido";
    if (!form.email?.trim()) newErrors.email = "Este campo es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Email inválido";
    if (!form.address?.trim()) newErrors.address = "Este campo es requerido";
    if (!form.neighborhood?.trim()) newErrors.neighborhood = "Este campo es requerido";
    if (!form.city?.trim()) newErrors.city = "Este campo es requerido";
    if (!form.zipCode?.trim()) newErrors.zipCode = "Este campo es requerido";
    if (!form.routeId?.trim()) newErrors.routeId = "Este campo es requerido";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    await onSave(form, customer?.id);
    setErrors({});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setForm({ ...form, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  const currentImage = previewImage || form.imageUrl || undefined;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
              <UserCircle className="text-pink-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-3">Imagen del Cliente</label>
            <div
              onClick={handleImageClick}
              className="relative w-full h-40 rounded-xl border-2 border-dashed border-zinc-300 hover:border-pink-400 transition-colors cursor-pointer group overflow-hidden"
            >
              {currentImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white">
                      <Upload className="mx-auto mb-2" size={28} />
                      <p className="text-sm font-medium">Cambiar imagen</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 group-hover:text-pink-500 transition-colors">
                  <ImageIcon size={40} />
                  <p className="text-sm font-medium mt-3">Haz clic para subir la imagen del cliente</p>
                  <p className="text-xs text-zinc-500 mt-1">Formatos: JPG, PNG. Tamaño máx: 2MB</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <p className="text-xs text-zinc-500 mt-2">Haz clic en el área para subir la imagen. Formatos: JPG, PNG. Tamaño máximo: 2MB</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Nombre</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={cn(errors.name && "border-red-300 bg-red-50")}
                placeholder="Nombre del cliente"
              />
              {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Teléfono</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className={cn(errors.phone && "border-red-300 bg-red-50")}
                placeholder="555 123 4567"
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Nombre del Negocio</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                value={form.businessName}
                onChange={(e) => {
                  setForm({ ...form, businessName: e.target.value });
                  if (errors.businessName) setErrors({ ...errors, businessName: "" });
                }}
                className={cn(errors.businessName && "border-red-300 bg-red-50")}
                placeholder="Nombre comercial"
              />
              {errors.businessName && <p className="text-xs text-red-600">{errors.businessName}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Email</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={cn(errors.email && "border-red-300 bg-red-50")}
                placeholder="cliente@correo.com"
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-semibold text-zinc-500 uppercase">Dirección</Label>
              <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
            </div>
            <Input
              required
              value={form.address}
              onChange={(e) => {
                setForm({ ...form, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: "" });
              }}
              className={cn(errors.address && "border-red-300 bg-red-50")}
              placeholder="Calle, número, colonia"
            />
            {errors.address && <p className="text-xs text-red-600">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Colonia</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                value={form.neighborhood}
                onChange={(e) => {
                  setForm({ ...form, neighborhood: e.target.value });
                  if (errors.neighborhood) setErrors({ ...errors, neighborhood: "" });
                }}
                className={cn(errors.neighborhood && "border-red-300 bg-red-50")}
                placeholder="Colonia"
              />
              {errors.neighborhood && <p className="text-xs text-red-600 mt-1">{errors.neighborhood}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Ciudad</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                value={form.city}
                onChange={(e) => {
                  setForm({ ...form, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: "" });
                }}
                className={cn(errors.city && "border-red-300 bg-red-50")}
                placeholder="Ciudad"
              />
              {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Código Postal</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Input
                required
                value={form.zipCode}
                onChange={(e) => {
                  setForm({ ...form, zipCode: e.target.value });
                  if (errors.zipCode) setErrors({ ...errors, zipCode: "" });
                }}
                className={cn(errors.zipCode && "border-red-300 bg-red-50")}
                placeholder="12345"
              />
              {errors.zipCode && <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Ruta</Label>
                <span className="px-1.5 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-semibold rounded">REQUERIDO</span>
              </div>
              <Select
                value={form.routeId}
                onValueChange={(value: string) => {
                  const routeName =
                    value === "route-1"
                      ? "Ruta Norte - Zona 1"
                      : value === "route-2"
                      ? "Ruta Sur - Zona 2"
                      : "Ruta Centro - Zona 3";
                  setForm({ ...form, routeId: value, routeName });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="route-1">Ruta Norte - Zona 1</SelectItem>
                  <SelectItem value="route-2">Ruta Sur - Zona 2</SelectItem>
                  <SelectItem value="route-3">Ruta Centro - Zona 3</SelectItem>
                </SelectContent>
              </Select>
              {errors.routeId && <p className="text-xs text-red-600 mt-1">{errors.routeId}</p>}
            </div>
            <div className="space-y-2">
              <Label>Coordenadas (opcional)</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Lat"
                  value={form.lat ?? ""}
                  onChange={(e) => setForm({ ...form, lat: e.target.value ? Number(e.target.value) : undefined })}
                />
                <Input
                  placeholder="Lng"
                  value={form.lng ?? ""}
                  onChange={(e) => setForm({ ...form, lng: e.target.value ? Number(e.target.value) : undefined })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-semibold text-zinc-500 uppercase">RFC</Label>
            </div>
            <Input value={form.rfc || ""} onChange={(e) => setForm({ ...form, rfc: e.target.value })} placeholder="RFC del cliente (opcional)" />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{isEditing ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
