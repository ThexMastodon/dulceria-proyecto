"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { RouteOrder } from '@/types/routeOrder';
import { routeOrderRepository } from '@/repositories/RouteOrderRepository';
import { useRouteOrders } from '@/hooks/useRouteOrders';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { RouteOrdersToolbar } from './RouteOrdersToolbar';
import { RouteOrdersTable } from './RouteOrdersTable';
import { RouteOrderFormModal } from './RouteOrderFormModal';
import { RouteOrderDetailsModal } from './RouteOrderDetailsModal';
import { DeleteRouteOrderModal } from './DeleteRouteOrderModal';
import { Pagination } from '../shared/Pagination';
import { Button } from '@/components/ui/button';
import { Map, List } from 'lucide-react';

const RouteMap = dynamic(() => import('./RouteMap').then(mod => ({ default: mod.RouteMap })), {
  ssr: false,
  loading: () => <div className="h-96 bg-zinc-100 rounded-xl flex items-center justify-center">Cargando mapa...</div>
});

export function RouteOrdersView() {
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [dateRangeFilter, setDateRangeFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const { orders, createOrder, updateOrder, deleteOrder } = useRouteOrders(
    routeOrderRepository,
    selectedRoute !== 'all' ? { routeId: selectedRoute } : undefined
  );
  
  // Aplicar filtro de fecha (por deliveryDate)
  const filteredOrdersByDate = useMemo(() => {
    if (dateRangeFilter === 'all') return orders;

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return orders.filter(order => {
      const deliveryDate = new Date(order.deliveryDate);
      
      if (dateRangeFilter === 'today') {
        return deliveryDate >= startOfDay && deliveryDate < new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
      } else if (dateRangeFilter === 'week') {
        const weekEnd = new Date(startOfDay);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return deliveryDate >= startOfDay && deliveryDate < weekEnd;
      } else if (dateRangeFilter === 'month') {
        const monthEnd = new Date(startOfDay);
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        return deliveryDate >= startOfDay && deliveryDate < monthEnd;
      }
      
      return true;
    });
  }, [orders, dateRangeFilter]);
  
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<RouteOrder>({
    items: filteredOrdersByDate,
    searchFields: ['orderNumber', 'customerName', 'customerAddress'],
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

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<RouteOrder | null>(null);
  const [formData, setFormData] = useState<Partial<RouteOrder>>({});

  const handleOpenCreate = () => {
    setCurrentOrder(null);
    setFormData({
      orderNumber: `RUT-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      routeId: selectedRoute !== 'all' ? selectedRoute : 'route-1',
      deliveryPersonId: 'delivery-1',
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      status: 'pending',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      deliveryDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (order: RouteOrder) => {
    setCurrentOrder(order);
    setFormData(order);
    setIsFormModalOpen(true);
  };

  const handleOpenView = (order: RouteOrder) => {
    setCurrentOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleOpenDelete = (order: RouteOrder) => {
    setCurrentOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentOrder) {
      await updateOrder(currentOrder.id, formData as RouteOrder);
    } else {
      await createOrder(formData as Omit<RouteOrder, 'id'>);
    }
    
    setIsFormModalOpen(false);
    setCurrentOrder(null);
  };

  const handleDelete = async () => {
    if (currentOrder) {
      await deleteOrder(currentOrder.id);
      setIsDeleteModalOpen(false);
      setCurrentOrder(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Pedidos de Ruta</h1>
          <p className="text-zinc-500 mt-1">
            Levanta y gestiona pedidos de clientes en ruta
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Lista
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            onClick={() => setViewMode('map')}
            className="gap-2"
          >
            <Map className="h-4 w-4" />
            Mapa
          </Button>
        </div>
      </div>

      <RouteOrdersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        selectedRoute={selectedRoute}
        onRouteChange={setSelectedRoute}
        dateRangeFilter={dateRangeFilter}
        onDateRangeFilterChange={setDateRangeFilter}
      />

      {viewMode === 'map' ? (
        <div className="space-y-4">
          <RouteMap 
            orders={filteredItems} 
            onOrderClick={handleOpenView}
          />
          
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-zinc-900">{filteredItems.length}</p>
                <p className="text-sm text-zinc-500">Total Pedidos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredItems.filter(o => o.status === 'confirmed').length}
                </p>
                <p className="text-sm text-zinc-500">Confirmados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {filteredItems.filter(o => o.status === 'delivered').length}
                </p>
                <p className="text-sm text-zinc-500">Entregados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredItems.filter(o => o.status === 'pending').length}
                </p>
                <p className="text-sm text-zinc-500">Pendientes</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
          <div className="overflow-x-auto">
            <RouteOrdersTable
              orders={paginatedItems}
              onView={handleOpenView}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
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
      )}

      <RouteOrderFormModal
        isOpen={isFormModalOpen}
        order={currentOrder}
        formData={formData}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSave}
        onChange={setFormData}
      />

      <RouteOrderDetailsModal
        isOpen={isDetailsModalOpen}
        order={currentOrder}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <DeleteRouteOrderModal
        isOpen={isDeleteModalOpen}
        order={currentOrder}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
