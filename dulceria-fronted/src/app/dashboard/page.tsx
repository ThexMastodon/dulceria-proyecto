"use client";

import React, { useState } from 'react';
import { Sidebar, MENU_ITEMS } from '@/components/SideBar';
import { useAuth } from '@/Context/AuthContext';
import { Header } from '@/components/Header';
import { UsersView } from '@/components/users/UsersView';
import { RolesView } from '@/components/roles/RolesView';

export default function DashboardPage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('principal');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        <Header 
          title={getCurrentTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {activeTab === 'usuarios' && <UsersView />}
            {activeTab === 'roles' && <RolesView />}
          </div>
        </main>
      </div>
    </div>
  );
}