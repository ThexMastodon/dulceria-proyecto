import { useState, useEffect } from 'react';
import { InventoryItem, InventoryMovement, InventoryAlert } from '@/types/inventory';
import { inventoryRepository } from '@/repositories/InventoryRepository';

export function useInventory(warehouseId?: string) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [itemsData, movementsData, alertsData] = await Promise.all([
        inventoryRepository.getInventoryItems(warehouseId),
        inventoryRepository.getMovements(warehouseId),
        inventoryRepository.getAlerts(warehouseId),
      ]);
      setItems(itemsData);
      setMovements(movementsData);
      setAlerts(alertsData);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [warehouseId]);

  const updateItem = async (id: string, data: Partial<InventoryItem>) => {
    try {
      await inventoryRepository.updateInventoryItem(id, data);
      await loadData();
    } catch (error) {
      console.error('Error updating inventory item:', error);
      throw error;
    }
  };

  const createMovement = async (movement: Omit<InventoryMovement, 'id'>) => {
    try {
      await inventoryRepository.createMovement(movement);
      await loadData();
    } catch (error) {
      console.error('Error creating movement:', error);
      throw error;
    }
  };

  const acknowledgeAlert = async (id: string) => {
    try {
      await inventoryRepository.acknowledgeAlert(id);
      await loadData();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      throw error;
    }
  };

  return {
    items,
    movements,
    alerts,
    loading,
    updateItem,
    createMovement,
    acknowledgeAlert,
    reload: loadData,
  };
}
