"use client";

import React, { useState, useMemo } from 'react';
import { Order } from '@/types/order';
import { orderRepository } from '@/repositories/OrderRepository';
import { useOrders } from '@/hooks/useOrders';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { OrdersToolbar } from './OrdersToolbar';
import { OrdersTable } from './OrdersTable';
import { OrderFormModal } from './OrderFormModal';
import { OrderDetailsModal } from './OrderDetailsModal';
import { DeleteOrderModal } from './DeleteOrderModal';
import { Pagination } from '../shared/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function OrdersView() {
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('1');
  const [dateRangeFilter, setDateRangeFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const { orders, createOrder, updateOrder, deleteOrder } = useOrders(orderRepository, selectedWarehouseId);
  
  // Aplicar filtro de fecha
  const filteredOrdersByDate = useMemo(() => {
    if (dateRangeFilter === 'all') return orders;

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      
      if (dateRangeFilter === 'today') {
        return orderDate >= startOfDay;
      } else if (dateRangeFilter === 'week') {
        const weekAgo = new Date(startOfDay);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return orderDate >= weekAgo;
      } else if (dateRangeFilter === 'month') {
        const monthAgo = new Date(startOfDay);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return orderDate >= monthAgo;
      }
      
      return true;
    });
  }, [orders, dateRangeFilter]);
  
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Order>({
    items: filteredOrdersByDate,
    searchFields: ['orderNumber', 'clientName', 'warehouseName'],
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState<Partial<Order>>({
    orderNumber: '',
    warehouseId: selectedWarehouseId,
    branchId: '1',
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    status: 'pending',
    paymentStatus: 'pending',
    createdBy: 'user-1',
    createdAt: new Date().toISOString(),
  });

  const handleOpenCreate = () => {
    setCurrentOrder(null);
    setFormData({
      orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      warehouseId: selectedWarehouseId,
      branchId: '1',
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      status: 'pending',
      paymentStatus: 'pending',
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (order: Order) => {
    setCurrentOrder(order);
    setFormData(order);
    setIsModalOpen(true);
  };

  const handleOpenView = (order: Order) => {
    setCurrentOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleOpenDelete = (order: Order) => {
    setCurrentOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentOrder) {
      await updateOrder(currentOrder.id, formData as Order);
    } else {
      await createOrder(formData as Omit<Order, 'id'>);
    }
    
    setIsModalOpen(false);
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
          <h1 className="text-3xl font-bold text-zinc-900">Pedidos</h1>
          <p className="text-zinc-500 mt-1">
            Gestiona los pedidos del almacén
          </p>
        </div>
      </div>

      {/* Filtros integrados en el Toolbar */}

      <OrdersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={handleOpenCreate}
        selectedWarehouseId={selectedWarehouseId}
        onWarehouseChange={setSelectedWarehouseId}
        dateRangeFilter={dateRangeFilter}
        onDateRangeFilterChange={setDateRangeFilter}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <OrdersTable
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

      <OrderFormModal
        isOpen={isModalOpen}
        order={currentOrder}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onChange={setFormData}
      />

      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        order={currentOrder}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <DeleteOrderModal
        isOpen={isDeleteModalOpen}
        order={currentOrder}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
