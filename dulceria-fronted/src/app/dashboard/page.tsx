"use client";

import React, { useState } from 'react';
import { Sidebar, MENU_ITEMS } from '@/components/SideBar';
import { useAuth } from '@/Context/AuthContext';
import { Header } from '@/components/Header';
import { UsersView } from '@/components/users/UsersView';
import { RolesView } from '@/components/roles/RolesView';
import { PermissionsView } from '@/components/permissions/PermissionsView';
import { SuppliersView } from '@/components/suppliers/SuppliersView';
import { ProductsView } from '@/components/products/ProductsView';
import { BranchesView } from '@/components/branches/BranchesView';
import { WarehousesView } from '@/components/warehouses/WarehousesView';
import { OrdersView } from '@/components/orders/OrdersView';
import { OnlineOrdersView } from '@/components/online-orders/OnlineOrdersView';
import { RouteOrdersView } from '@/components/route-orders/RouteOrdersView';
import { CustomersView } from '@/components/customers/CustomersView';
import { InventoryView } from '@/components/inventory/InventoryView';
import { MovementsView } from '@/components/movements/MovementsView';

export default function DashboardPage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('principal');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Whitelist of tabs that Dashboard can render
  const ALL_TABS = [
    'usuarios','roles','permisos',
    'proveedores','productos','sucursales','almacenes','clientes',
    'pedidos-almacen','pedidos-online','pedidos-ruta',
    'inventario','movimientos'
  ];

  // Basic role-based allowlist (align with AuthService roles)
  const adminRoles = new Set(['admin','manager','almacen','cashier','delivery','promoter','RH']);
  const { user } = useAuth();
  const isAdmin = user ? adminRoles.has(String(user.role)) : true; // default permissive before login context
  const allowedTabs = isAdmin ? ALL_TABS : [];

  const safeSetActiveTab = (tab: string) => {
    if (allowedTabs.includes(tab)) setActiveTab(tab);
  };

  const getCurrentTitle = () => {
    for (const item of MENU_ITEMS) {
      if (item.id === activeTab) return item.label;
      if (item.subItems) {
        const sub = item.subItems.find((s: { id: string; label: string }) => s.id === activeTab);
        if (sub) return `${item.label} / ${sub.label}`;
      }
    }
    return 'Dashboard';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-900 flex">
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={safeSetActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
        allowedTabs={allowedTabs}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        <Header 
          title={getCurrentTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {activeTab === 'usuarios' && allowedTabs.includes('usuarios') && <UsersView />}
            {activeTab === 'roles' && <RolesView />}
            {activeTab === 'permisos' && allowedTabs.includes('permisos') && <PermissionsView />}
            {activeTab === 'proveedores' && allowedTabs.includes('proveedores') && <SuppliersView />}
            {activeTab === 'productos' && allowedTabs.includes('productos') && <ProductsView />}
            {activeTab === 'sucursales' && allowedTabs.includes('sucursales') && <BranchesView />}
            {activeTab === 'almacenes' && allowedTabs.includes('almacenes') && <WarehousesView />}
            {activeTab === 'clientes' && allowedTabs.includes('clientes') && <CustomersView />}
            {activeTab === 'pedidos-almacen' && allowedTabs.includes('pedidos-almacen') && <OrdersView />}
            {activeTab === 'pedidos-online' && allowedTabs.includes('pedidos-online') && <OnlineOrdersView />}
            {activeTab === 'pedidos-ruta' && allowedTabs.includes('pedidos-ruta') && <RouteOrdersView />}
            {activeTab === 'inventario' && allowedTabs.includes('inventario') && <InventoryView />}
            {activeTab === 'movimientos' && allowedTabs.includes('movimientos') && <MovementsView />}
          </div>
        </main>
      </div>
    </div>
  );
}