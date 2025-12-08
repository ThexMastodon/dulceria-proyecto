"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Candy, Mail, Lock, User, CheckCircle, Cookie, PartyPopper, Loader2 } from 'lucide-react';
import { FloatingCandies } from '@/components/FloatingCandies';


export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("¡Cuenta creada con éxito!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden font-sans text-zinc-900">
      <FloatingCandies />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-20"
      >
        <Card className="p-8 rounded-[2.5rem] shadow-xl bg-white/80 backdrop-blur-xl border-zinc-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-4">
              <Candy size={32} />
            </div>
            <h1 className="text-2xl font-black text-zinc-900">Únete al Club Dulce</h1>
            <p className="text-zinc-500 text-sm mt-2">Crea tu cuenta para obtener beneficios exclusivos</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                placeholder="Nombre Completo"
                className="pl-12 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:border-pink-500"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                className="pl-12 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:border-pink-500"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                type="password"
                placeholder="Contraseña"
                className="pl-12 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:border-pink-500"
                required
              />
            </div>

            <div className="relative">
              <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                type="password"
                placeholder="Confirmar Contraseña"
                className="pl-12 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:border-pink-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-base shadow-lg shadow-pink-200 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando cuenta...</>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-zinc-100">
            <p className="text-sm text-zinc-500">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="font-bold text-zinc-900 hover:underline">
                Inicia Sesión
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}