"use client";

import React, { useState } from 'react';
import { Search, Menu, X, Candy} from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { CartSheet } from './CartSheet';

export function Navbar() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const [ user, setUser ] = useState<{name: string} | null>(null);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Tienda", href: "/tienda" },
    { name: "Promociones", href: "/promociones" },
    { name: "Nosotros", href: "/nosotros" }, 
    { name: "Marcas", href: "/marcas" },
  ];

  return (
    <nav className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 h-16 items-center flex justify-between'>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white'>
            <Candy size={20} />
          </div>
          <span className='font-bold text-xl tracking-tight text-zinc-900 hidden sm:block'>
            Dulcería
          </span>
        </div>

        <div className='hidden md:flex items-center gap-6 flex-1 justify-center'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-sm font-medium text-zinc-700 hover:text-pink-600 transition-colors'
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-pink-600">
            <Search size={20} />
          </Button>

          <CartSheet />

          <div className='h-6 w-px bg-zinc-200 mx-2 hidden md:block' />

          {user ? (
            <div className='hidden md:flex items-center gap-2 pl-2'>
              <div className='text-right hidden lg:block'>
                <p className='text-xs font-bold text-zinc-900'>Hola, {user.name}</p>
                <p className='text-[10px] text-pink-600 font-medium cursor-pointer hover:underline'>Mi cuenta</p>
              </div>
              <div className='w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs border border-pink-200'>
                {user.name.charAt(0)}
              </div>
            </div>
          ) : (
            <Link href="/login">
              <Button
                className='hidden md:flex bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-6 text-xs font-bold'
              >
                Iniciar Sesión
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className='md:hidden text-zinc-900'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='md:hidden absolute top-16 left-0 w-full bg-white border-b border-zinc-100 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-lg font-medium text-zinc-800 py-2 border-b border-zinc-50 last:border-0'
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className='w-full bg-pink-600 hover:bg-pink-700 mt-2'>
            {user ? `Hola, ${user.name}` : 'Iniciar Sesión'}
          </Button>
        </div>
      )}
    </nav>
  );
}