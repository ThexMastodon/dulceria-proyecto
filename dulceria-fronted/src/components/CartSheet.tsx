"use client";

import { useCart } from "../Context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Trash2, Minus, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const PRODUCTS = [
  { id: 1, stock: 45, unitsPerBox: 6 },
  { id: 2, stock: 120, unitsPerBox: 24 },
  { id: 3, stock: 0, unitsPerBox: 20 },
  { id: 4, stock: 10, unitsPerBox: 1 },
  { id: 5, stock: 30, unitsPerBox: 12 },
  { id: 6, stock: 200, unitsPerBox: 24 },
  { id: 7, stock: 0, unitsPerBox: 36 },
  { id: 8, stock: 5, unitsPerBox: 1 },
  { id: 9, stock: 50, unitsPerBox: 20 },
  { id: 10, stock: 80, unitsPerBox: 24 },
];

export function CartSheet() {
  const { items, removeItem, total, itemCount, updateQuantity } = useCart();
  const [alert, setAlert] = useState<string | null>(null);

  const handleQuantityChange = (itemId: number, currentQuantity: number, isBox: boolean | undefined, delta: number) => {
    const newQuantity = currentQuantity + delta;
    const product = PRODUCTS.find(p => p.id === itemId);
    
    if (!product) return;

    const maxAvailable = isBox ? Math.floor(product.stock / product.unitsPerBox) : product.stock;

    if (newQuantity > maxAvailable) {
      setAlert(`Solo hay ${maxAvailable} ${isBox ? 'cajas' : 'piezas'} disponibles`);
      updateQuantity(itemId, maxAvailable, isBox);
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    if (newQuantity <= 0) {
      removeItem(itemId, isBox ?? false);
      return;
    }

    updateQuantity(itemId, newQuantity, isBox);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-500 group-hover:text-pink-600 group-hover:border-pink-200 transition-all shadow-sm">
            <ShoppingBag size={20} />
          </div>
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-pink-600 text-white text-[10px] border-2 border-white animate-in zoom-in font-bold">
              {itemCount}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-zinc-50/95 backdrop-blur-xl border-l border-zinc-200 p-0 flex flex-col z-100 shadow-2xl">
        
        {alert && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg animate-in slide-in-from-top">
            {alert}
          </div>
        )}

        <SheetHeader className="px-6 py-4 border-b border-zinc-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <ShoppingBag size={20} />
              Tu Carrito
              <span className="text-sm font-normal text-zinc-500">({itemCount} items)</span>
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-zinc-100"
              >
                <X size={18} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-3 py-4">
                <AnimatePresence initial={false}>
                  {items.map((item, index) => (
                    <motion.div 
                      key={`${item.id}-${item.isBox ? 'box' : 'pz'}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-3 py-4 border-b border-zinc-100 last:border-0"
                    >
                      <div className={`w-20 h-20 rounded-lg ${item.image} flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0`}>
                        IMG
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-zinc-900 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm font-bold text-zinc-900">${item.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-zinc-200 rounded-lg">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity, item.isBox, -1)}
                              className="p-1.5 hover:bg-zinc-100 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity, item.isBox, 1)}
                              className="p-1.5 hover:bg-zinc-100 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button 
                            onClick={() => removeItem(item.id, item.isBox ?? false)}
                            className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <div className="p-6 bg-white border-t border-zinc-200 sticky bottom-0 z-20">
              <div className="mb-4">
                <div className="flex justify-between text-lg font-bold text-zinc-900 mb-1">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-zinc-500 text-center">Impuestos y envío calculados al finalizar</p>
              </div>
              
              <Button className="w-full h-12 rounded-lg text-base font-bold bg-zinc-900 hover:bg-zinc-800 mb-2">
                Finalizar Compra
              </Button>

              <SheetClose asChild>
                <Link href="/carrito" className="block w-full">
                  <Button variant="outline" className="w-full h-12 rounded-lg text-sm font-bold border-zinc-900 text-zinc-900 hover:bg-zinc-50">
                    Ver Carrito Completo
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-12">
            <div className="w-32 h-32 bg-zinc-100 rounded-full flex items-center justify-center animate-pulse">
              <ShoppingBag size={48} className="text-zinc-300 opacity-50" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-zinc-900 mb-2">Tu canasta está vacía</h3>
              <p className="text-zinc-500 max-w-[200px] mx-auto leading-relaxed">
                ¡No dejes que se te escape la dulzura! Agrega tus favoritos.
              </p>
            </div>
            <SheetClose asChild>
              <Button variant="outline" className="rounded-full border-zinc-200 text-zinc-600 hover:text-pink-600 hover:border-pink-200">
                Seguir explorando
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}