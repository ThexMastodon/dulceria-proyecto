"use client";

import React, { useState } from 'react';
import { LayoutDashboard, Users, Settings, LogOut, Package, Candy,ChevronDown, Warehouse, Megaphone, ArrowUpDown, Monitor, Map, UserCog, Shield, Truck, Box, Building2, PackageSearch, ClipboardList, ArrowRightLeft, Tags, UserCircle, Route, ShoppingCart, Navigation } from 'lucide-react';

export type MenuItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  subItems?: { id: string; label: string; icon?: React.ElementType }[];
};

export const MENU_ITEMS: MenuItem[] = [
  { 
    id: 'principal', 
    label: 'Principal', 
    icon: LayoutDashboard 
  },
  { 
    id: 'configuracion', 
    label: 'Configuración', 
    icon: Settings,
    subItems: [
      { id: 'usuarios', label: 'Usuarios', icon: Users },
      { id: 'roles', label: 'Roles', icon: UserCog },
      { id: 'permisos', label: 'Permisos', icon: Shield },
    ]
  },
  { 
    id: 'catalogos', 
    label: 'Catálogos', 
    icon: Package,
    subItems: [
      { id: 'proveedores', label: 'Proveedores', icon: Truck },
      { id: 'productos', label: 'Productos', icon: Box },
      { id: 'sucursales', label: 'Sucursales', icon: Building2 },
      { id: 'almacenes', label: 'Almacenes', icon: Warehouse },
      { id: 'clientes', label: 'Clientes', icon: Users },
    ]
  },
  { 
    id: 'almacen', 
    label: 'Almacén', 
    icon: Warehouse,
    subItems: [
      { id: 'pedidos-almacen', label: 'Pedidos Almacén', icon: ClipboardList },
      { id: 'pedidos-online', label: 'Pedidos en Línea', icon: ShoppingCart },
      { id: 'pedidos-ruta', label: 'Pedidos de Ruta', icon: Navigation },
      { id: 'inventario', label: 'Inventario', icon: PackageSearch },
      { id: 'movimientos', label: 'Movimientos (E/S)', icon: ArrowRightLeft },
    ]
  },
  { 
    id: 'promotoria', 
    label: 'Promotoría', 
    icon: Megaphone,
    subItems: [
      { id: 'promociones', label: 'Promociones', icon: Tags },
    ]
  },
  { 
    id: 'movimiento-cajas', 
    label: 'Movimiento cajas', 
    icon: ArrowUpDown 
  },
  { 
    id: 'caja', 
    label: 'Caja', 
    icon: Monitor 
  },
  { 
    id: 'rutas', 
    label: 'Rutas', 
    icon: Map,
    subItems: [
      { id: 'repartidores', label: 'Repartidores', icon: UserCircle },
      { id: 'rutas-listado', label: 'Rutas', icon: Route },
    ]
  },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout?: () => void;
  allowedTabs?: string[];
}

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, onLogout, allowedTabs }: SidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId) 
        : [...prev, sectionId]
    );
  };

  return (
    <>
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-zinc-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center gap-3 px-6 border-b border-zinc-100 shrink-0">
          <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Candy size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">Dulcería<span className="text-pink-600">Admin</span></span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {MENU_ITEMS.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isSectionOpen = openSections.includes(item.id);
            const isActiveParent = activeTab === item.id || item.subItems?.some(sub => sub.id === activeTab);

            // Hide parent items with subItems if none of their subItems are allowed
            const visibleSubItems = item.subItems?.filter(sub => !allowedTabs || allowedTabs.includes(sub.id)) ?? [];
            if (hasSubItems && visibleSubItems.length === 0) {
              return null;
            }

            return (
              <div key={item.id} className="mb-1">
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleSection(item.id);
                    } else {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                    !hasSubItems && activeTab === item.id
                      ? 'bg-pink-50 text-pink-700' 
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActiveParent ? "text-pink-600" : "text-zinc-400"} />
                    <span className={isActiveParent ? "text-zinc-900 font-semibold" : ""}>{item.label}</span>
                  </div>
                  {hasSubItems && (
                    <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-200 ${isSectionOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {hasSubItems && isSectionOpen && (
                  <div className="mt-1 ml-4 pl-3 border-l border-zinc-100 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                    {visibleSubItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActiveTab(sub.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeTab === sub.id
                            ? 'bg-pink-50 text-pink-700 font-medium'
                            : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                        }`}
                      >
                        {sub.icon && <sub.icon size={16} className={activeTab === sub.id ? 'text-pink-600' : 'text-zinc-400'} />}
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-100 shrink-0">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}