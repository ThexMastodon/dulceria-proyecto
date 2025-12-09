"use client";

import React from 'react';
import { Search, Plus, FileDown, FileSpreadsheet } from 'lucide-react';

interface RolesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export function RolesToolbar({ searchTerm, onSearchChange, onCreateClick }: RolesToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input
          type="text"
          placeholder="Buscar rol..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
        />
      </div>

      <div className="flex gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">
          <FileSpreadsheet size={18} className="text-emerald-600" />
          <span className="hidden sm:inline">Excel</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">
          <FileDown size={18} className="text-red-500" />
          <span className="hidden sm:inline">PDF</span>
        </button>
        <button
          onClick={onCreateClick}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 shadow-lg shadow-zinc-200 transition-all"
        >
          <Plus size={18} />
          Nuevo rol
        </button>
      </div>
    </div>
  );
}
