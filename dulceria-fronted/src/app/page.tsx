import React from 'react';

import { Navbar } from '../components/Navbar';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight} from 'lucide-react';
import { Footer } from '@/components/Footer';

const BEST_SELLERS = [
  { id: 1, name: "Gummy Bears Mix", price: "$120", category: "Granel", image: "bg-red-100" },
  { id: 2, name: "Ferrero Giant", price: "$250", category: "Chocolates", image: "bg-amber-100" },
  { id: 3, name: "Spicy Mango", price: "$90", category: "Enchilados", image: "bg-orange-100" },
  { id: 4, name: "Kit Piñata", price: "$500", category: "Fiesta", image: "bg-purple-100" },
];

const BRANCHES = [
  { id: 1, name: "Sucursal Centro", address: "Av. Madero 123", status: "Abierto" },
  { id: 2, name: "Plaza Las Américas", address: "Local 45, Piso 2", status: "Cierra 9pm" },
  { id: 3, name: "Paseo Altozano", address: "Zona Food Court", status: "Abierto" },
];

export default function HomePage() {
  return (
    <div className='min-h-screen bg-white font-sans text-zinc-900'>
      <Navbar />

      <HeroCarousel />

      <section className='py-20 px-6 max-w-7xl mx-auto'>
        <div className='flex justify-between items-end mb-10'>
          <div>
            <h2 className='text-3xl font-black mb-2'>Favoritos de la semana</h2>
            <p className='text-zinc-500'>Lo que todo el mundo se está llevando.</p>
          </div>
          <Button variant="link" className='text-pink-600 font-bold  md:hidden-flex'>
            Ver todo <ArrowRight size={16} className='ml-2' />
          </Button>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {BEST_SELLERS.map((product) => (
            <Card key={product.id} className='border-0 shadow-none hover:shadow-xl transition-all duration-300 group cursor-pointer rounded-4xl'>
              <div className={`aspect-square rounded-4xl ${product.image} mb-4 relative overflow-hidden`}>
                <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm'>
                  Top {product.id}
                </div>
                <div className='w-full h-full flex items-center justify-center text-zinc-400 font-bold opacity-20 group-hover:scale-110 transition-transform duration-500'>
                  Imagen
                </div>
              </div>
              <div className='px-2 pb-4'>
                <p className='text-xs font-bold text-pink-600 uppercase tracking-wide mb-1'>{product.category}</p>
                <h3 className='font-bold text-lg leading-tight mb-2'>{product.name}</h3>
                <div className='flex justify-between items-center'>
                  <span className='text-zinc-900 font-bold text-lg'>{product.price}</span>
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-pink-600">
                    +
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className='py-10 px-6 bg-zinc-50'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl bg-pink-600 overflow-hidden text-white p-10 md:p-20 relative'>
          <div className='relative z-10'>
            <Badge className='bg-white/20 hover:bg-white/30 text-white mb-6 border-0 pointer-events-none'>Recomendacón del chef</Badge>
            <h2 className='text-4xl md:text-6xl font-black mb-6 leading-tight'>
              ¿No sabes qué regalar?
            </h2>
            <p className='text-pink-100 text-lg mb-8 font-medium max-w-md'>
              Prueba nuestra nueva caja de selección "Sugar Mix". Perfecto para cumpleaños, o simplemente para consentirte.
            </p>
            <Button size="lg" className='bg-white text-pink-600 hover:bg.zinc-100 rounded-full font-bold'>
              Descubir Sugar Mix
            </Button>
          </div>

          <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </section>

      <section className='py-20 px-6 max-w-7xl mx-auto'>
        <h2 className="text-3xl font-black mb-10 text-center">Nuestras Sucursales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES.map((branch) => (
            <Card key={branch.id} className="p-6 rounded-4xl border-zinc-100 hover:border-pink-200 transition-colors group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-pink-100 group-hover:text-pink-600 transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{branch.name}</h3>
                  <p className="text-zinc-500 text-sm">{branch.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${branch.status === 'Abierto' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                <span className="text-sm font-bold text-zinc-600">{branch.status}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}