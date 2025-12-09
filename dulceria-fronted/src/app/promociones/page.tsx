"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { FloatingCandies } from '@/components/FloatingCandies';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, Copy, CheckCircle, Timer, Gift, Sparkles, Candy} from 'lucide-react';
import { Footer } from '@/components/Footer';

const PROMOTIONS = [
  {
    id: "welcome",
    title: "¡Bienvenido a Mega Dulces!",
    description: "Regístrate hoy y obtén un 15% de descuento en tu primera compra. ¡Dulces momentos te esperan!",
    discount: "15% de descuento",
    code: "MEGADULCES15",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    icon: Sparkles
  },
  {
    id: "shipping",
    title: "Envío Gratis",
    description: "En pedidos mayores a $599 MXN.",
    discount: "GRATIS",
    code: "ENVIOSUGAR",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    icon: TruckIcon
  },
  {
    id: "bulk",
    title: "Jueves de Granel",
    description: "Compra 1kg de gomitas y llévate 1/2kg gratis.",
    discount: "2x1",
    code: "JUEVESGOMITA",
    color: "bg-pink-50 border-pink-200 text-pink-700",
    icon: Candy
  },
  {
    id: "party",
    title: "Paquete Fiesta",
    description: "10% adicional al comprar 3 cajas surtidas.",
    discount: "10% EXTRA",
    code: "FIESTATIME",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    icon: Gift
  }
];

function TruckIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>    
  )
}

export default function PromotionsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 relative">
      <Navbar />

      <section className="pt-12 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <FloatingCandies />
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-600 border-0 px-4 py-1 text-sm">Ofertas Limitadas</Badge>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6">
              Promociones <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-500">Frecas</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Aprovecha estos códigos excluxivos para endulzar tu día sin amagar tu cartera. ¡Date prisa, las ofertas son por tiempo limitado!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-zinc-900 text-white p-8 md:p-16 relative overflow-hidden mb-20 shadow-2xl"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/2">
                <div className="flex items-center gap-2 mb-4 text-yellow-400 font-bold  uppercase tracking-widest text-sm">
                  <Timer size={18} /> Expira en 24 horas
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  Flash Sale: <br /> Todo el chocolate.
                </h2>
                <p className="text-zinc-400 text-lg mb-8 max-w-md">
                  Solo por hoy, obtén un descuento masivo en todos las marcas de chocolate. ¡No te lo pierdas!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-200 font-bold h-14 px-8 text-lg">
                    Ir a la tienda
                  </Button>
                  <div className="flex items-center gap-3 bg-zinc-800/50 rounded-full px-6 py-2 border border-zinc-700">
                    <span className="text-zinc-400 text-sm font-medium">Usa el código: </span>
                    <span className="text-white font-bold text-lg tracking-widest">CHOCOFLASH</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-linear-to-r from-red-500 to-yellow-600 rounded-full animate-pulse blur-3xl absolute opacity-30" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 md:w-80 md:h-80 border-2 border-white/10 rounded-full flex items-center justify-center relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 p-2 rounded-full border border-zinc-700">
                    <Tag className="text-pink-500" />
                  </div>
                  <div className="text-center">
                    <span className="block text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
                      30%
                    </span>
                    <span className="text-2xl font-bold tracking-widest uppercase">
                      Descuento
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMOTIONS.map((promo, idx) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className={`p-0 overflow-hidden border-2 border-dashed ${promo.color?.split(' ')[1]} bg-white hover:shadow-lg transition-shadow rounded-4xl`}>
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className={`sm:w-1/3 p-6 flex flex-col items-center justify-center text-center gap-2 ${promo.color?.split(' ')[0]}`}>
                      {promo.icon && <promo.icon size={32} className="mb-2" />}
                      <span className="font-black text-3xl tracking-tighter">{promo.discount}</span>
                    </div>

                    <div className="sm:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-1 text-zinc-900">{promo.title}</h3>
                        <p className="text-sm text-zinc-500 mb-4">{promo.description}</p>
                      </div>

                      <div className="bg-zinc-50 rounded-xl p-2 flex items-center justify-between border border-zinc-200">
                        <code className="font-mono font-bold text-zinc-700 px-2 tracking-wide">
                          {promo.code}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={'hover:bg-white hover:text-green-600 ${copiedCode === promo.code ? "text-green-600 bg-green-50" : "text-zinc-400"}'}
                          onClick={() => promo.code && handleCopyCode(promo.code)}
                        >
                          {copiedCode === promo.code ? (
                            <span className="flex items-center gap-1 font-bold text-xs">
                              <CheckCircle size={16} /> ¡Copiado!
                            </span>
                          ): (
                            <Copy size={16} />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-zinc-50 py-20 px-6 border-t border-zinc-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black mb4">¿Quieres mas recompensas?</h2>
            <p className="text-zinc-500 mb-8 max-w-lg mx-auto">
              Únete al **Mega Dulces Club** y acumula "Caramelos" por cada compra para canjearlas por productos exclusivos.
            </p>

            <div className="flex justify-center gap-4">
              <Button className="rounded-full bg-pink-600 hover:bg-pink-700 text-white h-12 px-8 font-bold shadow-lg shadow-pink-600/20">
                Unirme gratis
              </Button>
              <Button variant="outline" className="rounded-full border-zinc-200 h-12 px-8 font-bold">
                Leer beneficios
              </Button>
            </div>
          </div>
      </section>
      <Footer />
    </div>
  );
}