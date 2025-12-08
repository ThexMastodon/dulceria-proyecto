"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Temporada de navidad 2025",
    subtitle: "Dulces y golosinas para celebrar en familia",
    bg: "bg-orange-500",
    accent: "text-orange-100",
    button: "Ver colección navideña"
  }, {
    id: 2,
    title: "Chocolates premium",
    subtitle: "Importados directamente desde Suiza",
    bg: "bg-zinc-900",
    accent: "text-zinc-300",
    button: "Comprar ahora"
  }, {
    id: 3,
    title: "Ofertas exclusivas",
    subtitle: "Descuentos especiales en gomitas y caramelos",
    bg: "bg-pink-600",
    accent: "text-pink-100",
    button: "Aprovechar ofertas"
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () =>  clearInterval(timer);
  }, []);

  return (
    <div className='relative h-[500px] w-full overflow-hidden bg-zinc-100'>
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0, x:100 }}
            animate={{ opacity: 1, x:0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 flex items-center justify-center text-center px-4 ${slides[current].bg}`}
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttexturas.com/patterns/cubes.png')]"></div>

            <div className='relative z-10 max-w-2xl'>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-sm font-bold tracking-widest uppercase mb-4 block ${slides[current].accent}`}
              >
                Tendencias 2025
              </motion.span>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight`}
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-xl text-white/90 font-medium mb-10`}
              >
                {slides[current].subtitle}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button size="lg" className='rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-zinc-100 hover:scale-105 transition-all'>
                  {slides[current].button} <ChevronRight className='ml-2' size={20} />
                </Button>
              </motion.div>
            </div>'
          </motion.div>
        </AnimatePresence>

        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20'>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === current ? "w-8 bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
    </div>
  );
}