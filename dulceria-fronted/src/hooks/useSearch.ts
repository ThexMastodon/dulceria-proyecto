import { useState, useMemo } from 'react';

interface UseSearchProps<T> {
  items: T[];
  searchFields: (keyof T)[];
}

export function useSearch<T>({ items, searchFields }: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    return items.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [items, searchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}
