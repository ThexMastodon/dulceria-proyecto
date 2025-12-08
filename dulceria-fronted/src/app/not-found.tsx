"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Candy, Home, Search, Ghost, Cookie, PartyPopper } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900 font-sans relative overflow-hidden">

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] text-pink-200 opacity-80"
      >
        <Candy size={64} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-[15%] text-orange-200 opacity-80"
      >
        <Cookie size={56} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 right-[10%] text-purple-200 opacity-80"
      >
        <Candy size={80} />
      </motion.div>

      <div className="absolute top-1/2 right-[20%] text-yellow-200 opacity-60">
         <PartyPopper size={40} />
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center z-10"
      >
        <motion.div 
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          className="w-24 h-24 bg-zinc-50 rounded-4xl flex items-center justify-center text-zinc-300 mx-auto mb-8 shadow-sm border border-zinc-100 relative"
        >
          <Ghost size={48} />
          <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-2 rounded-full shadow-lg">
             <Candy size={16} />
          </div>
        </motion.div>

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-orange-400 tracking-tighter mb-2">
          404
        </h1>
        
        <h2 className="text-2xl font-bold mb-4 text-zinc-900">
          ¡Ups! Se comieron esta página.
        </h2>
        
        <p className="text-zinc-500 mb-10 text-lg leading-relaxed">
          Buscamos por todas partes, pero solo encontramos envolturas vacías.
        </p>

        <div className="flex flex-col gap-3">
          <a href="/">
            <Button className="w-full h-12 rounded-full bg-zinc-900 text-white hover:bg-pink-600 transition-colors text-base font-bold shadow-xl shadow-zinc-900/10">
              <Home className="mr-2" size={18} />
              Regresar por Dulces
            </Button>
          </a>
          
          <a href="/tienda">
            <Button variant="outline" className="w-full h-12 rounded-full border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 font-medium">
              <Search className="mr-2" size={18} />
              Buscar en la Tienda
            </Button>
          </a>
        </div>

        <div className="mt-12">
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Error: SUGAR_NOT_FOUND</p>
        </div>
      </motion.div>
    </div>
  );
}