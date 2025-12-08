"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Star, ArrowRight, Sparkles, Candy, Search, ShoppingBag, Menu } from 'lucide-react';
import { FloatingCandies } from '@/components/FloatingCandies';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Brand {
  id: string;
  name: string;
  slogan: string;
  description: string;
  logoColor: string;
  bgGradient: string;
  popularProducts: Product[];
}

const BRANDS: Brand[] = [
  {
    id: "ferrero",
    name: "Ferrero",
    slogan: "Golden Moments",
    description: "La excelencia del chocolate italiano. Famosos por sus avellanas tostadas y texturas crujientes que definen el lujo en cada bocado.",
    logoColor: "bg-amber-600",
    bgGradient: "from-amber-500 to-orange-400",
    popularProducts: [
      { id: 1, name: "Rocher T-24", price: "$280", image: "bg-amber-100" },
      { id: 2, name: "Raffaello", price: "$150", image: "bg-white border border-zinc-200" },
      { id: 3, name: "Nutella B-ready", price: "$45", image: "bg-amber-50" },
    ]
  },
  {
    id: "wonka",
    name: "Wonka",
    slogan: "Pura Imaginación",
    description: "Dulces que desafían la realidad. Colores vibrantes, sabores explosivos y texturas que cambian mientras las comes.",
    logoColor: "bg-purple-600",
    bgGradient: "from-purple-500 to-pink-500",
    popularProducts: [
      { id: 1, name: "Nerds Rope", price: "$35", image: "bg-purple-100" },
      { id: 2, name: "Laffy Taffy", price: "$15", image: "bg-pink-100" },
      { id: 3, name: "Everlasting Gobstopper", price: "$40", image: "bg-blue-100" },
    ]
  },
  {
    id: "vero",
    name: "Vero",
    slogan: "Fuego Mexicano",
    description: "Los maestros del picante. Paletas con el equilibrio perfecto entre dulce, ácido y picante que han marcado a generaciones.",
    logoColor: "bg-red-600",
    bgGradient: "from-red-500 to-orange-600",
    popularProducts: [
      { id: 1, name: "Mango Enchilado", price: "$12", image: "bg-orange-100" },
      { id: 2, name: "Paleta Elote", price: "$10", image: "bg-yellow-100" },
      { id: 3, name: "Pica Fresa", price: "$45", image: "bg-red-100" },
    ]
  },
  {
    id: "mars",
    name: "Mars",
    slogan: "Un universo de sabor",
    description: "Creadores de los clásicos mundiales. Barras de chocolate llenas de energía, caramelo y nougat.",
    logoColor: "bg-blue-800",
    bgGradient: "from-blue-700 to-indigo-900",
    popularProducts: [
      { id: 1, name: "Snickers King", price: "$35", image: "bg-amber-900" },
      { id: 2, name: "Milky Way", price: "$30", image: "bg-blue-900" },
      { id: 3, name: "M&Ms Peanut", price: "$40", image: "bg-yellow-400" },
    ]
  }
];

export default function BrandsPage() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    if (selectedBrand) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedBrand]);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16 relative z-10">
          <FloatingCandies />
          <Badge className="mb-4 bg-pink-100 text-pink-600 border-0 px-4 py-1 text-sm">Marcas oficiales</Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Nuestras <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600">Marcas</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Trabajamos directamente con los gigantes de la industria para traerte ediciones especiales y frescura garantizada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {BRANDS.map((brand) => (
            <motion.div
              layoutId={`card-${brand.id}`}
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`cursor-pointer group relative overflow-hidden rounded-[2.5rem] h-[300px] shadow-sm hover:shadow-2xl transition-all duration-500`}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${brand.bgGradient} opacity-90 transition-opacity`} />

              <div className="relative z-10 h-full p-10 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <motion.div
                    layoutId={`logo-${brand.id}`}
                    className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl font-black text-black shadow-lg"
                  >
                    {brand.name[0]}
                  </motion.div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                    Ver Productos
                  </div>
                </div>

                <div>
                  <motion.h2
                    layoutId={`title-${brand.id}`}
                    className="text-4xl font-black mb-2"
                  >
                    {brand.name}
                  </motion.h2>
                  <motion.p
                    layoutId={`slogan-${brand.id}`}
                    className="text-white/80 font-medium text-lg"
                  >
                    {brand.slogan}
                  </motion.p>
                </div>
              </div>

              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedBrand && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBrand(null)}
              className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedBrand.id}`}
                className="w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row max-h-[85vh]"
              >
                <div className={`md:w-2/5 p-10 text-white bg-linear-to-br ${selectedBrand.bgGradient} flex flex-col relative overflow-hidden`}>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={(e) => { e.stopPropagation(); setSelectedBrand(null); }}
                    className="absolute top-6 left-6 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors md:hidden"
                  >
                    <X size={20} />
                  </motion.button>

                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <motion.div
                      layoutId={`logo-${selectedBrand.id}`}
                      className="w-32 h-32 bg-white rounded-4xl flex items-center justify-center text-5xl font-black text-black shadow-2xl mb-8"
                    >
                      {selectedBrand.name[0]}
                    </motion.div>

                    <motion.h2 layoutId={`title-${selectedBrand.id}`} className="text-4xl font-black mb-4">
                      {selectedBrand.name}
                    </motion.h2>

                    <motion.p
                      layoutId={`slogan-${selectedBrand.id}`}
                      className="text-white/90 font-medium text-lg mb-8"
                    >
                      {selectedBrand.slogan}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-sm text-white/80 leading-relaxed font-medium">
                      {selectedBrand.description}
                    </p>
                  </motion.div>
                </div>

                <div className="md:w-3/5 p-8 md:p-12 bg-white flex flex-col overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
                      <Sparkles className="text-yellow-500" /> Top Sellers
                    </h3>
                    <button
                      onClick={() => setSelectedBrand(null)}
                      className="hidden md:block bg-zinc-100 p-2 rounded-full hover:bg-zinc-200 transition-colors"
                    >
                      <X size={24} className="text-zinc-500" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedBrand.popularProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="flex items-center gap-4 p-4 rounded-3xl bg-zinc-50 hover:bg-zinc-100 transition-colors group cursor-pointer border border-transparent hover:border-zinc-200"
                      >
                        <div className={`w-20 h-20 rounded-2xl ${product.image} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                          <div className="w-12 h-12 bg-black/5 rounded-lg" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-zinc-800">{product.name}</h4>
                          <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <span className="text-zinc-400 ml-1">(120)</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-black text-xl text-zinc-900">{product.price}</p>
                          <Button size="icon" className="w-8 h-8 rounded-full bg-zinc-900 text-white mt-1 hover:bg-pink-600 transition-colors">
                            <ArrowRight size={14} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100">
                    <Button className="w-full py-6 rounded-2xl text-lg font-bold bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-600/20">
                      Ver catálogo completo de {selectedBrand.name}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}