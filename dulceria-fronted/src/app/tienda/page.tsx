"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from "../../Context/CartContext";
import { CartSheet } from "../../components/CartSheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Star, Minus, Plus, AlertCircle, CheckCircle, Filter, LayoutGrid, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { FloatingCandies } from '@/components/FloatingCandies';
import { Footer } from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  flavor: string;
  packagingColor: string;
  presentation: string;
  price: number;
  stock: number;
  unitsPerBox: number;
  description: string;
  image: string;
  isTrending?: boolean;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Ferrero Rocher T-24", brand: "Ferrero", category: "Chocolates", flavor: "Avellana", packagingColor: "Dorado", presentation: "Caja", price: 280, stock: 45, unitsPerBox: 6, description: "La clásica caja de regalo con 24 piezas de chocolate con avellana.", image: "bg-amber-100", isTrending: true },
  { id: 2, name: "Gomitas Ácidas Mix", brand: "Wonka", category: "Gomitas", flavor: "Frutas", packagingColor: "Verde", presentation: "Bolsa", price: 85, stock: 120, unitsPerBox: 24, description: "Mezcla explosiva de sabores.", image: "bg-green-100", isTrending: true },
  { id: 3, name: "Mango Enchilado", brand: "Vero", category: "Enchilados", flavor: "Mango", packagingColor: "Naranja", presentation: "Bolsa", price: 45, stock: 0, unitsPerBox: 20, description: "Mango deshidratado con chile.", image: "bg-orange-100", isTrending: false },
  { id: 4, name: "Kit Piñata Party", brand: "Sugar OS", category: "Fiesta", flavor: "Surtido", packagingColor: "Morado", presentation: "Paquete", price: 550, stock: 10, unitsPerBox: 1, description: "3kg de surtido premium.", image: "bg-purple-100", isTrending: true },
  { id: 5, name: "Raffaello T-15", brand: "Ferrero", category: "Chocolates", flavor: "Coco", packagingColor: "Blanco", presentation: "Caja", price: 150, stock: 30, unitsPerBox: 12, description: "Coco con almendra entera.", image: "bg-white border border-zinc-200", isTrending: false },
  { id: 6, name: "Nerds Rope", brand: "Wonka", category: "Gomitas", flavor: "Uva", packagingColor: "Rosa", presentation: "Individual", price: 35, stock: 200, unitsPerBox: 24, description: "Cuerda de gomita crujiente.", image: "bg-pink-100", isTrending: true },
  { id: 7, name: "Pelón Pelo Rico", brand: "Vero", category: "Enchilados", flavor: "Tamarindo", packagingColor: "Amarillo", presentation: "Individual", price: 12, stock: 0, unitsPerBox: 36, description: "Tamarindo enchilado clásico.", image: "bg-yellow-100", isTrending: false },
  { id: 8, name: "Caja Sorpresa", brand: "Sugar OS", category: "Regalos", flavor: "Surtido", packagingColor: "Azul", presentation: "Caja", price: 300, stock: 5, unitsPerBox: 1, description: "Selección aleatoria.", image: "bg-blue-100", isTrending: false },
  { id: 9, name: "Pulparindo", brand: "De la Rosa", category: "Enchilados", flavor: "Tamarindo", packagingColor: "Amarillo", presentation: "Caja", price: 60, stock: 50, unitsPerBox: 20, description: "Dulce de tamarindo salado y enchilado.", image: "bg-yellow-200", isTrending: true },
  { id: 10, name: "Panditas", brand: "Ricolino", category: "Gomitas", flavor: "Frutas", packagingColor: "Transparente", presentation: "Bolsa", price: 25, stock: 80, unitsPerBox: 24, description: "Gomitas clásicas de ositos.", image: "bg-red-50", isTrending: false },
];

const CATEGORIES = ["Chocolates", "Gomitas", "Enchilados", "Fiesta", "Regalos"];
const BRANDS = ["Ferrero", "Wonka", "Vero", "Sugar OS", "De la Rosa", "Ricolino"];
const FLAVORS = ["Avellana", "Frutas", "Mango", "Surtido", "Coco", "Uva", "Tamarindo"];
const PRESENTATIONS = ["Caja", "Bolsa", "Paquete", "Individual"];
const PACKAGING_COLORS: { name: string; class: string }[] = [
  { name: "Dorado", class: "bg-amber-400" },
  { name: "Verde", class: "bg-green-500" },
  { name: "Naranja", class: "bg-orange-500" },
  { name: "Morado", class: "bg-purple-600" },
  { name: "Blanco", class: "bg-white border border-zinc-300" },
  { name: "Rosa", class: "bg-pink-500" },
  { name: "Amarillo", class: "bg-yellow-400" },
  { name: "Azul", class: "bg-blue-500" },
  { name: "Transparente", class: "bg-zinc-200" },
];

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    onClick={onClick}
    className={`group bg-white rounded-4xl p-4 border transition-all cursor-pointer relative overflow-hidden ${product.stock === 0 ? 'border-zinc-100 opacity-60 grayscale-[0.8]' : 'border-zinc-100 hover:border-pink-200 hover:shadow-xl'}`}
  >
    {product.stock === 0 && (
      <div className="absolute top-4 right-4 z-10 bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
        <AlertCircle size={10} /> AGOTADO
      </div>
    )}
    {product.stock > 0 && product.isTrending && (
      <div className="absolute top-4 right-4 z-10 bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
        <Star size={10} fill="currentColor" /> HOT
      </div>
    )}

    <div className={`aspect-square rounded-3xl ${product.image} mb-4 relative overflow-hidden flex items-center justify-center`}>
      <div className={`w-24 h-24 rounded-full bg-black/5 flex items-center justify-center text-zinc-400 font-bold text-xs ${product.stock === 0 ? 'opacity-50' : ''}`}>IMG</div>
    </div>

    <div className="px-2 pb-2">
      <div className="flex justify-between items-start mb-1">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{product.brand}</p>
        <p className="text-[10px] font-bold text-zinc-400">{product.category}</p>
      </div>
      <h3 className={`font-bold text-lg leading-tight mb-2 ${product.stock === 0 ? 'text-zinc-400 line-through decoration-zinc-300' : 'text-zinc-900'}`}>{product.name}</h3>
      <div className="flex justify-between items-center mt-4">
        <span className={`font-black text-xl ${product.stock === 0 ? 'text-zinc-400' : 'text-zinc-900'}`}>${product.price}</span>
        <Button size="icon" className={`rounded-full h-8 w-8 ${product.stock === 0 ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed' : 'bg-zinc-900 text-white hover:bg-pink-600'}`} disabled={product.stock === 0}><Plus size={16} /></Button>
      </div>
    </div>
  </motion.div>
);

export default function ShopPage() {
  const { addItem } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedPresentations, setSelectedPresentations] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [manualQty, setManualQty] = useState<string>("1");
  const [showFilters, setShowFilters] = useState(true);

  const [buyingMode, setBuyingMode] = useState<'piece' | 'box'>('piece');

  const toggleFilter = (item: string, currentList: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedFlavors([]);
    setSelectedPresentations([]);
    setSelectedColors([]);
    setSearchQuery("");
    setMaxPrice(1000);
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategories.length > 0) result = result.filter(p => selectedCategories.includes(p.category));
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    if (selectedFlavors.length > 0) result = result.filter(p => selectedFlavors.includes(p.flavor));
    if (selectedPresentations.length > 0) result = result.filter(p => selectedPresentations.includes(p.presentation));
    if (selectedColors.length > 0) result = result.filter(p => selectedColors.includes(p.packagingColor));
    result = result.filter(p => p.price <= maxPrice);

    const isFiltering = searchQuery !== "" || selectedCategories.length > 0 || selectedBrands.length > 0 || selectedFlavors.length > 0 || selectedPresentations.length > 0 || selectedColors.length > 0 || maxPrice < 1000;

    if (!isFiltering) {
      return result.filter(p => p.isTrending);
    }
    return result;
  }, [searchQuery, selectedCategories, selectedBrands, selectedFlavors, selectedPresentations, selectedColors, maxPrice]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setManualQty("1");
    setBuyingMode('piece');
  };

  const getMaxStock = () => {
    if (!selectedProduct) return 0;
    if (buyingMode === 'box') {
      return Math.floor(selectedProduct.stock / (selectedProduct.unitsPerBox || 1));
    }
    return selectedProduct.stock;
  };

  const handleQuantityChange = (delta: number) => {
    if (!selectedProduct) return;
    const max = getMaxStock();
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= max) {
      setQuantity(newQty);
      setManualQty(newQty.toString());
    }
  };

  const handleManualQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setManualQty(val);
    const parsed = parseInt(val);
    const max = getMaxStock();
    if (!isNaN(parsed) && parsed >= 1) {
      if (parsed > max) {
        setQuantity(max);
      } else {
        setQuantity(parsed);
      }
    }
  };

  const handleManualQtyBlur = () => {
    const max = getMaxStock();
    if (!manualQty || isNaN(parseInt(manualQty)) || parseInt(manualQty) < 1) {
      setManualQty("1");
      setQuantity(1);
    } else if (parseInt(manualQty) > max) {
      setManualQty(max.toString());
      setQuantity(max);
    }
  };

  const getCurrentPrice = () => {
    if (!selectedProduct) return 0;
    if (buyingMode === 'box') {
      return selectedProduct.price * selectedProduct.unitsPerBox;
    }
    return selectedProduct.price;
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const priceToAdd = getCurrentPrice();
    const displayName = buyingMode === 'box'
      ? `${selectedProduct.name} - Caja`
      : selectedProduct.name;

    addItem({
      id: selectedProduct.id,
      name: displayName,
      price: priceToAdd,
      image: selectedProduct.image,
      quantity: quantity,
      isBox: buyingMode === 'box'
    });

    setSelectedProduct(null);
  };

  const isFiltering = searchQuery !== "" || selectedCategories.length > 0 || selectedBrands.length > 0 || selectedFlavors.length > 0 || selectedPresentations.length > 0 || selectedColors.length > 0 || maxPrice < 1000;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 relative">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-8">
          <FloatingCandies />
          <h1 className="text-4xl font-black mb-2">La Tienda</h1>
          <p className="text-zinc-500">Encuentra exactamente lo que se te antoja.</p>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-zinc-100 mb-8 transition-all">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input className="pl-12 rounded-full border-zinc-200 bg-zinc-50 h-12 w-full" placeholder="Buscar por nombre..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" className="rounded-full h-12 px-6 border-zinc-200 gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={18} /> {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-6">
                <div className="h-px bg-zinc-100 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Precio Máximo: ${maxPrice}</h3>
                      <input type="range" min="0" max="1000" step="10" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-full accent-pink-600 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer" />
                      <div className="flex justify-between text-xs text-zinc-400 mt-1"><span>$0</span><span>$1000+</span></div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Categoría</h3>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => <button key={cat} onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategories.includes(cat) ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}>{cat}</button>)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Marcas</h3>
                    <div className="flex flex-wrap gap-2">
                      {BRANDS.map(brand => <button key={brand} onClick={() => toggleFilter(brand, selectedBrands, setSelectedBrands)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedBrands.includes(brand) ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}>{brand}</button>)}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Sabor</h3>
                      <div className="flex flex-wrap gap-2">
                        {FLAVORS.map(flavor => <button key={flavor} onClick={() => toggleFilter(flavor, selectedFlavors, setSelectedFlavors)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedFlavors.includes(flavor) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}>{flavor}</button>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Presentación</h3>
                      <div className="flex flex-wrap gap-2">
                        {PRESENTATIONS.map(pres => <button key={pres} onClick={() => toggleFilter(pres, selectedPresentations, setSelectedPresentations)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedPresentations.includes(pres) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}>{pres}</button>)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Color de Empaque</h3>
                    <div className="flex flex-wrap gap-3">
                      {PACKAGING_COLORS.map(color => <button key={color.name} onClick={() => toggleFilter(color.name, selectedColors, setSelectedColors)} className={`w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 flex items-center justify-center ${color.class} ${selectedColors.includes(color.name) ? 'ring-2 ring-offset-2 ring-zinc-900 scale-110' : ''}`} title={color.name}>{selectedColors.includes(color.name) && <CheckCircle size={14} className={color.name === "Blanco" || color.name === "Transparente" ? "text-black" : "text-white"} />}</button>)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-50 pt-4">
                  <span className="text-sm font-bold text-zinc-400">{filteredProducts.length} productos</span>
                  {isFiltering && <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 text-xs font-bold"><X size={14} className="mr-1" /> Limpiar todo</Button>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <Star className={`fill-current ${isFiltering ? 'text-zinc-300' : 'text-yellow-500'}`} />
          <h2 className="text-xl font-bold">
            {isFiltering ? "Resultados de búsqueda" : "Tendencias & Más Vendidos"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300"><Search size={32} /></div>
                <h3 className="text-xl font-bold text-zinc-400">No encontramos dulces con esos filtros.</h3>
                <p className="text-zinc-400 text-sm">Intenta ajustar tu búsqueda.</p>
                <Button variant="link" onClick={clearFilters} className="text-pink-600 font-bold mt-2">Limpiar filtros</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isFiltering && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="mb-6 flex items-center gap-2 pt-8 border-t border-zinc-200">
              <LayoutGrid className="text-zinc-400" />
              <h2 className="text-xl font-bold text-zinc-900">Catálogo Completo</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} onClick={() => handleProductClick(product)} />
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" />

              <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <div className={`h-40 ${selectedProduct.image} relative`}>
                  <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full transition-colors backdrop-blur-md z-20"><X size={20} /></button>
                  {selectedProduct.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-grayscale z-10">
                      <span className="bg-zinc-900 text-white px-6 py-2 rounded-full font-bold text-lg tracking-widest border-2 border-white shadow-xl">AGOTADO</span>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="secondary">{selectedProduct.category}</Badge>
                        <Badge variant="outline" className="border-pink-200 text-pink-600">{selectedProduct.flavor}</Badge>
                      </div>
                      <h2 className="text-3xl font-black leading-tight text-zinc-900">{selectedProduct.name}</h2>
                      <p className="text-pink-600 font-bold">{selectedProduct.brand}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-3xl font-black">${getCurrentPrice()}</span>
                      <span className={`text-xs font-bold ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>{selectedProduct.stock > 0 ? `${selectedProduct.stock} Disponibles` : 'Sin Stock'}</span>
                    </div>
                  </div>

                  <p className="text-zinc-500 my-6 leading-relaxed">{selectedProduct.description}</p>

                  {selectedProduct.stock > 0 ? (
                    <div className="mb-6">
                      {selectedProduct.unitsPerBox > 1 && (
                        <div className="flex bg-zinc-100 p-1 rounded-xl mb-6">
                          <button
                            onClick={() => { setBuyingMode('piece'); setQuantity(1); setManualQty("1"); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${buyingMode === 'piece' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                          >
                            Pieza
                          </button>
                          <button
                            onClick={() => { setBuyingMode('box'); setQuantity(1); setManualQty("1"); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${buyingMode === 'box' ? 'bg-white shadow-sm text-pink-600' : 'text-zinc-400 hover:text-zinc-600'}`}
                          >
                            Caja
                          </button>
                        </div>
                      )}

                      <div className="bg-zinc-50 rounded-2xl p-4 flex justify-between items-center border border-zinc-100">
                        <span className="font-bold text-sm text-zinc-600">
                          Cantidad ({buyingMode === 'box' ? 'Cajas' : 'Piezas'}):
                        </span>
                        <div className="flex items-center gap-4">
                          <button onClick={() => handleQuantityChange(-1)} className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 disabled:opacity-50" disabled={quantity <= 1}><Minus size={14} /></button>
                          <input
                            type="number"
                            value={manualQty}
                            onChange={handleManualQtyChange}
                            onBlur={handleManualQtyBlur}
                            className="font-black text-xl w-16 text-center bg-transparent border-b border-zinc-300 focus:border-pink-500 focus:outline-none appearance-none"
                          />
                          <button onClick={() => handleQuantityChange(1)} className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-pink-600 disabled:opacity-50 disabled:bg-zinc-300" disabled={quantity >= getMaxStock()}><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-center text-sm font-bold border border-red-100 flex items-center justify-center gap-2">
                      <AlertCircle size={16} /> Lo sentimos, este producto no está disponible.
                    </div>
                  )}

                  <Button className="w-full h-14 rounded-xl text-lg font-bold gap-2" disabled={selectedProduct.stock === 0} onClick={handleAddToCart}>
                    {selectedProduct.stock > 0 ? <><ShoppingBag size={20} /> Agregar al Carrito (${(quantity * getCurrentPrice()).toLocaleString()})</> : "No Disponible"}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}