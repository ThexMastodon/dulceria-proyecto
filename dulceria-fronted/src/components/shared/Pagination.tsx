"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  displayedItems: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  displayedItems,
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  // No mostrar paginación si no hay items
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between bg-white">
      <p className="text-sm text-zinc-500">
        Mostrando <span className="font-medium text-zinc-900">{displayedItems}</span> de <span className="font-medium text-zinc-900">{totalItems}</span> resultados
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500 mr-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
