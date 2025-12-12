"use client";

import React from "react";
import { RouteCustomer } from "@/types/routeOrder";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface CustomersTableProps {
  customers: RouteCustomer[];
  onEdit?: (customer: RouteCustomer) => void;
  onDelete?: (customer: RouteCustomer) => void;
}

export function CustomersTable({ customers, onEdit, onDelete }: CustomersTableProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500 text-sm">No hay clientes para mostrar</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-zinc-200 bg-zinc-50/50">
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Nombre</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Negocio</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Teléfono</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Dirección</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Colonia</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Ciudad</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">CP</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Ruta</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200">
        {customers.map((c) => (
          <tr key={c.id} className="hover:bg-zinc-50/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-zinc-900">{c.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.businessName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.phone}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.address}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.neighborhood}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.city}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.zipCode}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-zinc-900">{c.routeName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <div className="flex items-center justify-end gap-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                    onClick={() => onEdit(c)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(c)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
