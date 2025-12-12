import { useEffect, useState } from 'react';
import { Movement } from '@/types/movement';

export function useMovements(repo: { getAll: () => Promise<Movement[]>; create: (d: Omit<Movement,'id'>) => Promise<Movement>; update: (id:string,d:Partial<Movement>)=>Promise<Movement|null>; remove: (id:string)=>Promise<boolean>; }) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    repo.getAll().then(setMovements).catch(e=>setError(String(e))).finally(()=>setLoading(false));
  }, [repo]);

  const createMovement = async (data: Omit<Movement,'id'>) => {
    const created = await repo.create(data);
    setMovements(prev => [created, ...prev]);
  };

  const updateMovement = async (id: string, data: Partial<Movement>) => {
    const updated = await repo.update(id, data);
    if (updated) setMovements(prev => prev.map(m => m.id === id ? updated : m));
  };

  const deleteMovement = async (id: string) => {
    const ok = await repo.remove(id);
    if (ok) setMovements(prev => prev.filter(m => m.id !== id));
  };

  return { movements, loading, error, createMovement, updateMovement, deleteMovement };
}
