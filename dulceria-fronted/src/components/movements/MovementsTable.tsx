"use client";

import React from 'react';
import { Movement } from '@/types/movement';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface MovementsTableProps {
  movements: Movement[];
  onEdit: (m: Movement) => void;
  onDelete: (m: Movement) => void;
}

export function MovementsTable({ movements, onEdit, onDelete }: MovementsTableProps) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-zinc-50 text-zinc-600">
          <th className="px-4 py-2 text-left">Fecha</th>
          <th className="px-4 py-2 text-left">Tipo</th>
          <th className="px-4 py-2 text-left">Producto</th>
          <th className="px-4 py-2 text-left">Almacén</th>
          <th className="px-4 py-2 text-right">Cantidad</th>
          <th className="px-4 py-2 text-left">Unidad</th>
          <th className="px-4 py-2 text-left">Referencia</th>
          <th className="px-4 py-2 text-left">Notas</th>
          <th className="px-4 py-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {movements.map(m => (
          <tr key={m.id} className="border-t">
            <td className="px-4 py-2">{new Date(m.date).toLocaleString()}</td>
            <td className="px-4 py-2">
              <span className={m.type === 'Entrada' ? 'text-emerald-700' : 'text-red-700'}>{m.type}</span>
            </td>
            <td className="px-4 py-2">{m.productName}</td>
            <td className="px-4 py-2">{m.warehouseName}</td>
            <td className="px-4 py-2 text-right">{m.quantity}</td>
            <td className="px-4 py-2">{m.unit}</td>
            <td className="px-4 py-2">{m.reference ?? ''}</td>
            <td className="px-4 py-2">{m.notes ?? ''}</td>
            <td className="px-4 py-2 text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  aria-label="Ver"
                  onClick={() => onEdit(m)}
                  title="Ver detalles"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                  aria-label="Editar"
                  onClick={() => onEdit(m)}
                  title="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  aria-label="Eliminar"
                  onClick={() => onDelete(m)}
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
        {movements.length === 0 && (
          <tr>
            <td className="px-4 py-8 text-center text-zinc-500" colSpan={9}>Sin movimientos</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
