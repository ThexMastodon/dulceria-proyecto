"use client";

import React from "react";
import { DeliveryType, OnlineOrderStatus, OnlineOrder } from "@/types/onlineOrder";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { Toolbar } from "@/components/shared/Toolbar";
import { DateTimeField } from "@/components/shared/DateTimeField";

export type DateRangeFilter = "today" | "week" | "month" | "all";

interface OnlineOrdersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;

  statusFilter: OnlineOrderStatus | "all";
  onStatusFilterChange: (value: OnlineOrderStatus | "all") => void;

  deliveryTypeFilter: DeliveryType | "all";
  onDeliveryTypeFilterChange: (value: DeliveryType | "all") => void;

  paymentStatusFilter: OnlineOrder["paymentStatus"] | "all";
  onPaymentStatusFilterChange: (value: OnlineOrder["paymentStatus"] | "all") => void;

  dateRangeFilter: DateRangeFilter;
  onDateRangeFilterChange: (value: DateRangeFilter) => void;
  fromDate?: string;
  toDate?: string;
  onFromDateChange?: (value?: string) => void;
  onToDateChange?: (value?: string) => void;
  onClearFilters: () => void;
}

export function OnlineOrdersToolbar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  deliveryTypeFilter,
  onDeliveryTypeFilterChange,
  paymentStatusFilter,
  onPaymentStatusFilterChange,
  dateRangeFilter,
  onDateRangeFilterChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onClearFilters,
}: OnlineOrdersToolbarProps) {
  const hasActiveFilters =
    statusFilter !== 'all' ||
    deliveryTypeFilter !== 'all' ||
    paymentStatusFilter !== 'all' ||
    dateRangeFilter !== 'all' || !!fromDate || !!toDate;

  const activeFiltersCount = [
    statusFilter !== 'all',
    deliveryTypeFilter !== 'all',
    paymentStatusFilter !== 'all',
    dateRangeFilter !== 'all',
    !!fromDate,
    !!toDate,
  ].filter(Boolean).length;

  return (
    <Toolbar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Buscar por pedido, cliente, email, teléfono"
      hasActiveFilters={hasActiveFilters}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={onClearFilters}
      filters={(
        <div className="grid gap-3 md:grid-cols-6">
          <div>
            <Label htmlFor="status" className="text-xs text-zinc-500">Estado</Label>
            <Select value={String(statusFilter)} onValueChange={(v) => onStatusFilterChange(v as OnlineOrderStatus | "all")}> 
              <SelectTrigger id="status">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="new">Nuevo</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="preparing">Preparando</SelectItem>
                <SelectItem value="ready">Listo</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="delivery" className="text-xs text-zinc-500">Entrega</Label>
            <Select value={String(deliveryTypeFilter)} onValueChange={(v) => onDeliveryTypeFilterChange(v as DeliveryType | "all")}>
              <SelectTrigger id="delivery">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="delivery">Entrega a domicilio</SelectItem>
                <SelectItem value="pickup">Recoger en sucursal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="payment" className="text-xs text-zinc-500">Pago</Label>
            <Select value={String(paymentStatusFilter)} onValueChange={(v) => onPaymentStatusFilterChange(v as OnlineOrder["paymentStatus"] | "all")}>
              <SelectTrigger id="payment">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="paid">Pagado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="failed">Fallido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="dateRange" className="text-xs text-zinc-500">Fecha</Label>
            <Select value={dateRangeFilter} onValueChange={(v) => onDateRangeFilterChange(v as DateRangeFilter)}>
              <SelectTrigger id="dateRange">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Últimos 7 días</SelectItem>
                <SelectItem value="month">Últimos 30 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-zinc-500">Desde</Label>
            <DateTimeField value={fromDate} onChange={(v)=>onFromDateChange && onFromDateChange(v)} />
          </div>
          <div>
            <Label className="text-xs text-zinc-500">Hasta</Label>
            <DateTimeField value={toDate} onChange={(v)=>onToDateChange && onToDateChange(v)} />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          </div>
        </div>
      )}
    />
  );
}
