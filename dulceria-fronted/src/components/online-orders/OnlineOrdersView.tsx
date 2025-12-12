"use client";

import React, { useMemo, useState } from "react";
import { OnlineOrder, DeliveryType, OnlineOrderStatus } from "@/types/onlineOrder";
import { onlineOrderRepository } from "@/repositories/OnlineOrderRepository";
import { useOnlineOrders } from "@/hooks/useOnlineOrders";
import { useSearch } from "@/hooks/useSearch";
import { usePagination } from "@/hooks/usePagination";
import { OnlineOrdersToolbar } from "./OnlineOrdersToolbar";
import { OnlineOrdersTable } from "./OnlineOrdersTable";
import { OnlineOrderDetailsModal } from "./OnlineOrderDetailsModal";
import { OnlineOrderEditModal } from "./OnlineOrderEditModal";
import { Pagination } from "../shared/Pagination";

type DateRangeFilter = "today" | "week" | "month" | "all";

export function OnlineOrdersView() {
  const [statusFilter, setStatusFilter] = useState<OnlineOrderStatus | "all">("all");
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState<DeliveryType | "all">("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<OnlineOrder["paymentStatus"] | "all">("all");
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeFilter>("all");
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);

  const { orders, updateOrder } = useOnlineOrders(
    onlineOrderRepository,
    statusFilter !== "all" ? statusFilter : undefined
  );

  // Aplicar filtros adicionales
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Filtro por tipo de entrega
    if (deliveryTypeFilter !== "all") {
      result = result.filter((order) => order.deliveryType === deliveryTypeFilter);
    }

    // Filtro por estado de pago
    if (paymentStatusFilter !== "all") {
      result = result.filter((order) => order.paymentStatus === paymentStatusFilter);
    }

    // Filtro por rango de fecha por presets o manual
    if (dateRangeFilter !== "all") {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt);

        if (dateRangeFilter === "today") {
          return orderDate >= startOfDay;
        } else if (dateRangeFilter === "week") {
          const weekAgo = new Date(startOfDay);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return orderDate >= weekAgo;
        } else if (dateRangeFilter === "month") {
          const monthAgo = new Date(startOfDay);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return orderDate >= monthAgo;
        }

        return true;
      });
    }

    // Filtro por fechas manuales
    if (fromDate || toDate) {
      const from = fromDate ? new Date(fromDate) : undefined;
      const to = toDate ? new Date(toDate) : undefined;
      result = result.filter(order => {
        const d = new Date(order.createdAt);
        if (from && d < from) return false;
        if (to && d > to) return false;
        return true;
      });
    }

    return result;
  }, [orders, deliveryTypeFilter, paymentStatusFilter, dateRangeFilter]);

  const { searchTerm, setSearchTerm, filteredItems } = useSearch<OnlineOrder>({
    items: filteredOrders,
    searchFields: ["orderNumber", "customerName", "customerEmail", "customerPhone"],
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

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OnlineOrder | null>(null);

  const handleOpenView = (order: OnlineOrder) => {
    setCurrentOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleOpenEdit = (order: OnlineOrder) => {
    setCurrentOrder(order);
    setIsEditModalOpen(true);
  };

  const handleUpdateStatus = async (status: OnlineOrderStatus, assignedTo?: string) => {
    if (!currentOrder) return;

    const updates: Partial<OnlineOrder> = { status };

    if (assignedTo) {
      updates.assignedTo = assignedTo;
    }

    if (status === "confirmed" && !currentOrder.confirmedAt) {
      updates.confirmedAt = new Date().toISOString();
    } else if (status === "shipped" && !currentOrder.shippedAt) {
      updates.shippedAt = new Date().toISOString();
    } else if (status === "delivered" && !currentOrder.deliveredAt) {
      updates.deliveredAt = new Date().toISOString();
    }

    await updateOrder(currentOrder.id, updates);
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Pedidos en Línea</h1>
          <p className="text-zinc-500 mt-1">Gestiona los pedidos recibidos desde la tienda online</p>
        </div>
      </div>

      <OnlineOrdersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        deliveryTypeFilter={deliveryTypeFilter}
        onDeliveryTypeFilterChange={setDeliveryTypeFilter}
        paymentStatusFilter={paymentStatusFilter}
        onPaymentStatusFilterChange={setPaymentStatusFilter}
        dateRangeFilter={dateRangeFilter}
        onDateRangeFilterChange={setDateRangeFilter}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onClearFilters={() => {
          setSearchTerm("");
          setStatusFilter("all");
          setDeliveryTypeFilter("all");
          setPaymentStatusFilter("all");
          setDateRangeFilter("all");
          setFromDate(undefined);
          setToDate(undefined);
        }}
      />

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
        <div className="overflow-x-auto">
          <OnlineOrdersTable orders={paginatedItems} onView={handleOpenView} onEdit={handleOpenEdit} />
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

      <OnlineOrderDetailsModal
        isOpen={isDetailsModalOpen}
        order={currentOrder}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <OnlineOrderEditModal
        isOpen={isEditModalOpen}
        order={currentOrder}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
