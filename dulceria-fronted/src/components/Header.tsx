"use client";

import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function Header ({ title, onMenuClick} : HeaderProps) {
  const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-zinc-200 px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 ml-2 text-zinc-500 hover:bg-zinc-100 rounded-lg md:hidden"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-bold text-zinc-800 capitalize hidden sm:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 w-64 transition-all"
          />
        </div>

        <button className="relative p-2 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-zinc-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block leading-tight">
            {user ? (
              <>
                <p className="text-sm font-bold text-zinc-900">Hola, {user.name}</p>
                <p className="text-xs text-zinc-500">{user.role}</p>
              </>
            ) : null}
          </div>
          <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-500">
            {user ? user.name.charAt(0).toUpperCase() : <Search size={20} />}
          </div>
        </div>
      </div>
    </header>
  )
}