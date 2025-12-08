"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Eye, Users, MapPin, Phone, Clock } from 'lucide-react';
import { Footer } from '@/components/Footer'; 
import { FloatingCandies } from '@/components/FloatingCandies';


const TEAM = [
  { id: 1, name: "Ana P.", role: "CEO & Fundadora", image: "bg-pink-100" },
  { id: 2, name: "Carlos M.", role: "Maestro Chocolatero", image: "bg-blue-100" },
  { id: 3, name: "Sofia R.", role: "Gerente de Operaciones", image: "bg-orange-100" },
  { id: 4, name: "David L.", role: "Director Creativo", image: "bg-purple-100" },
];

const LOCATIONS: Record<string, { name: string; address: string; phone: string; hours: string }[]> = {
  "CDMX": [
    { name: "Sugar Reforma", address: "Paseo de la Reforma 222", phone: "55-1234-5678", hours: "10:00 - 21:00" },
    { name: "Polanco Luxury", address: "Masaryk 501", phone: "55-8765-4321", hours: "11:00 - 22:00" },
    { name: "Coyoacán", address: "Jardín Centenario 12", phone: "55-5555-5555", hours: "09:00 - 20:00" },
  ],
  "Michoacán": [
    { name: "Morelia Centro", address: "Av. Madero Poniente 450", phone: "443-123-4567", hours: "10:00 - 21:00" },
    { name: "Plaza Las Américas", address: "Local 44, Zona Food Court", phone: "443-765-4321", hours: "11:00 - 21:00" },
  ],
  "Jalisco": [
    { name: "Andares", address: "Blvd. Puerta de Hierro 4965", phone: "33-1111-2222", hours: "11:00 - 23:00" },
    { name: "Punto Sur", address: "Av. Punto Sur 200", phone: "33-3333-4444", hours: "10:00 - 21:00" },
  ],
  "Nuevo León": [
    { name: "San Pedro", address: "Calzada del Valle 400", phone: "81-9999-8888", hours: "10:00 - 20:00" },
  ]
};

const STATES = Object.keys(LOCATIONS);

export default function AboutPage() {
  const [activeState, setActiveState] = useState(STATES[0]);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <Navbar />

      <section className="relative py-24 px-6 bg-zinc-50 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FloatingCandies />
          <Badge className="mb-4 bg-pink-100 text-pink-600 hover:bg-pink-200 border-0">Nuestra Historia</Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Creando momentos <span className="text-pink-600">dulces</span> desde 2010.
          </h1>
          <p className="text-xl text-zinc-500 leading-relaxed">
            Sugar OS nació con una idea simple: revolucionar la forma en que experimentas los dulces.
            Fusionamos la tradición confitera con la tecnología moderna para entregarte felicidad en cada bocado.
          </p>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50" />
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-10 rounded-[2.5rem] border-zinc-100 bg-white hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h2 className="text-2xl font-black mb-4">Nuestra Misión</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Transformar el antojo cotidiano en una experiencia extraordinaria, ofreciendo la selección más innovadora y fresca de dulces, enchilados y chocolates, siempre con un servicio tecnológico y humano de excelencia.
            </p>
          </Card>

          <Card className="p-10 rounded-[2.5rem] border-zinc-100 bg-zinc-900 text-white hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Eye size={32} />
            </div>
            <h2 className="text-2xl font-black mb-4">Nuestra Visión</h2>
            <p className="text-zinc-400 font-medium leading-relaxed">
              Ser la cadena de dulcerías líder en Latinoamérica, reconocida no solo por nuestros productos únicos, sino por crear el "Sistema Operativo de la Dulzura" (Sugar OS) que conecta personas, sabores y momentos inolvidables.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-20 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">El Equipo Sugar</h2>
            <p className="text-zinc-500">Las mentes creativas detrás de la magia.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.id} className="group text-center">
                <div className={`aspect-3/4 rounded-4xl ${member.image} mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="w-full h-full flex items-center justify-center opacity-30">
                    <Users size={48} />
                  </div>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-pink-600 font-bold uppercase tracking-wide">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-black mb-2">Encuéntranos</h2>
          <p className="text-zinc-500">Selecciona tu estado para ver las sucursales disponibles.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="p-4 rounded-4xl border-zinc-100 lg:w-1/3 h-fit">
            <div className="space-y-2">
              {STATES.map((state) => (
                <button
                  key={state}
                  onClick={() => setActiveState(state)}
                  className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex justify-between items-center ${activeState === state
                      ? "bg-zinc-900 text-white shadow-lg"
                      : "bg-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                >
                  {state}
                  {activeState === state && <div className="w-2 h-2 rounded-full bg-pink-500" />}
                </button>
              ))}
            </div>
          </Card>

          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {LOCATIONS[activeState].map((branch, idx) => (
                  <Card key={idx} className="p-6 rounded-4xl border-zinc-100 hover:border-pink-200 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                        <MapPin size={20} />
                      </div>
                      <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Abierto</Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{branch.name}</h3>

                    <div className="space-y-2 text-sm text-zinc-500">
                      <p className="flex items-center gap-2">
                        <MapPin size={14} className="shrink-0" /> {branch.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} className="shrink-0" /> {branch.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="shrink-0" /> {branch.hours}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-50">
                      <Button variant="link" className="p-0 h-auto text-pink-600 font-bold">
                        Ver en Mapa &rarr;
                      </Button>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}