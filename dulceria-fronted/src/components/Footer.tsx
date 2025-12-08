"use client";

import React from 'react';
import { Button } from './ui/button';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-6">Sugar OS</h3>
          <p className="text-zinc-400 max-w-sm mb-6">
            La dulcería más moderna de la ciudad. Llevamos dulzura a tu vida con la mejor tecnología y sabor.
          </p>
          <div className="flex gap-4">
            <Button size="icon" variant="secondary" className="rounded-full"><Instagram size={18} /></Button>
            <Button size="icon" variant="secondary" className="rounded-full"><Facebook size={18} /></Button>
            <Button size="icon" variant="secondary" className="rounded-full"><Twitter size={18} /></Button>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Explorar</h4>
          <ul className="space-y-4 text-zinc-400">
            <li className="hover:text-white cursor-pointer">Tienda</li>
            <li className="hover:text-white cursor-pointer">Promociones</li>
            <li className="hover:text-white cursor-pointer">Nosotros</li>
            <li className="hover:text-white cursor-pointer">Sucursales</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-zinc-400">
            <li className="hover:text-white cursor-pointer">Términos y Condiciones</li>
            <li className="hover:text-white cursor-pointer">Política de Privacidad</li>
            <li className="hover:text-white cursor-pointer">Envíos y Devoluciones</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
        <p>© 2024 Sugar OS Inc. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}