"use client";

import React, { useState, useMemo } from 'react';
import { InventoryItem, InventoryStatus } from '@/types/inventory';
import { useInventory } from '@/hooks/useInventory';
import { useWarehouses } from '@/hooks/useWarehouses';
import { warehouseRepository } from '@/repositories/WarehouseRepository';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { InventoryToolbar } from './InventoryToolbar';
import { InventoryTable } from './InventoryTable';
import { Pagination } from '../shared/Pagination';
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  DollarSign,
  FileDown,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdjustInventoryModal } from './AdjustInventoryModal';
import { InventoryDetailsModal } from './InventoryDetailsModal';

export function InventoryView() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<InventoryStatus | 'all'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low-stock' | 'out-of-stock' | 'normal'>('all');
  
  const { warehouses } = useWarehouses(warehouseRepository);
  const { items, loading, movements, createMovement } = useInventory(
    selectedWarehouse !== 'all' ? selectedWarehouse : undefined
  );

  const filteredByStatus = useMemo(() => {
    let result = [...items];

    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }

    if (stockFilter !== 'all') {
      result = result.filter(item => {
        if (stockFilter === 'out-of-stock') return item.quantity === 0;
        if (stockFilter === 'low-stock') return item.quantity > 0 && item.quantity < item.minStock;
        if (stockFilter === 'normal') return item.quantity >= item.minStock && item.quantity <= item.maxStock;
        return true;
      });
    }

    return result;
  }, [items, statusFilter, stockFilter]);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch<InventoryItem>({
    items: filteredByStatus,
    searchFields: ['productName', 'productCode', 'location', 'warehouseName', 'batchNumber'],
  });

  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({ items: filteredItems, itemsPerPage: 10 });

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);

  const handleOpenView = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleOpenAdjust = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsAdjustOpen(true);
  };

  const stats = useMemo(() => {
    const totalProducts = items.length;
    const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
    const lowStockCount = items.filter(item => item.quantity > 0 && item.quantity < item.minStock).length;
    const outOfStockCount = items.filter(item => item.quantity === 0).length;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      totalProducts,
      totalValue,
      lowStockCount,
      outOfStockCount,
      totalQuantity,
    };
  }, [items]);

  const exportCSV = (rows: InventoryItem[]) => {
    const headers = [
      'id','warehouseId','warehouseName','productId','productName','productCode','quantity','minStock','maxStock','location','status','unitCost','totalValue','lastRestockDate','expirationDate','batchNumber','updatedAt'
    ];
    const escape = (v: unknown) => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      if (s.includes('"') || s.includes(',') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const lines = [headers.join(',')];
    for (const r of rows) {
      const vals = [
        r.id,
        r.warehouseId,
        r.warehouseName,
        r.productId,
        r.productName,
        r.productCode,
        r.quantity,
        r.minStock,
        r.maxStock,
        r.location,
        r.status,
        r.unitCost,
        r.totalValue,
        r.lastRestockDate ?? '',
        r.expirationDate ?? '',
        r.batchNumber ?? '',
        r.updatedAt,
      ].map(escape);
      lines.push(vals.join(','));
    }
    const csv = lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (rows: InventoryItem[]) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Inventario</h1>
          <p className="text-zinc-500 mt-1">
            Gestión y control de stock en almacenes
          </p>
        </div>
        
      </div>

      {/* Cards moved below filters for cleaner top section */}
      <InventoryToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedWarehouse={selectedWarehouse}
        onWarehouseChange={setSelectedWarehouse}
        warehouses={warehouses}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        actions={(
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportCSV(filteredItems)}
              className="gap-2"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportJSON(filteredItems)}
              className="gap-2"
            >
              <FileDown className="h-4 w-4 text-red-500" />
              JSON
            </Button>
          </>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">Total Productos</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">Unidades Totales</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{stats.totalQuantity.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">Valor Total</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">
                ${(stats.totalValue / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{stats.lowStockCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600">Sin Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.outOfStockCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <InventoryTable
            items={paginatedItems}
            onView={handleOpenView}
            onAdjust={handleOpenAdjust}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
          displayedItems={paginatedItems.length}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>

      <InventoryDetailsModal
        isOpen={isDetailsOpen}
        item={selectedItem}
        movements={movements}
        onClose={() => { setIsDetailsOpen(false); setSelectedItem(null); }}
      />

      <AdjustInventoryModal
        isOpen={isAdjustOpen}
        item={selectedItem}
        onClose={() => { setIsAdjustOpen(false); setSelectedItem(null); }}
        onConfirm={async (movement) => {
          await createMovement(movement);
        }}
      />
    </div>
  );
}
