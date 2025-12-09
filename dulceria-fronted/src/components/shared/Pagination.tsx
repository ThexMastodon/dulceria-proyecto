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
  return (
    <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
      <p className="text-sm text-zinc-500">
        Mostrando <span className="font-medium">{displayedItems}</span> de <span className="font-medium">{totalItems}</span> resultados
      </p>
      <div className="flex gap-2">
        <button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
