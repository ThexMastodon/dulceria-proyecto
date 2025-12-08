"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Candy, Mail, Lock, ArrowRight, Loader2, Cookie, PartyPopper } from 'lucide-react';
import { FloatingCandies } from '@/components/FloatingCandies';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden font-sans text-zinc-900">
      <FloatingCandies />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-20"
      >
        <Card className="p-8 rounded-2xl shadow-xl bg-white/80 backdrop-blur-xl border-zinc-100">
          <div className='text-center mb-8'>
            <a href='/' className='inline-flex items-center justify-center w-16 h-16 bg-pink-600 rounded-2xl text-white mb-4 shadow-lg shadow-pink-200 hover:scale-105 transition-transform'>
              <Candy size={32} />
            </a>
            <h1 className="text-2xl font-bold text-zinc-900">Bienvenido a Dulcería</h1>
            <p className="text-zinc-500 text-sm mt-2">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <div className='relative'>
                <Mail size={20} className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400' />
                <Input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className="pl-12 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:border-pink-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className="relative">
                <Lock size={20} className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400' />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:border-pink-500 transition-all"
                  required
                />
              </div>
              <div className="flex justify-end">
                <a href="/recuperar" className="text-xs font-bold text-pink-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base shadow-lg shadow-zinc-200 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Cargando...</>
              ): (
                <>Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-zinc-100">
            <p className="text-sm text-zinc-500">
              ¿Aun no tienes una cuenta?{' '}
              <a href="/registro" className="font-bold text-pink-600 hover:underline">
                Regístrate aquí
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}